<script lang="ts">
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { css } from "@story/theme/css";
  import type { ChartConfig, LineData, StepState } from "./types.d.ts";

  interface Props {
    currentState: StepState;
    chartConfig: ChartConfig;
    lines: LineData[];
  }

  let {
    currentState,
    chartConfig,
    lines
  }: Props = $props();

  let currentLine = $derived(lines.find(l => currentState.highlight.includes(l.name)) as LineData);

  let container: HTMLDivElement;
  let width = $state(600);
  let height = $state(420);

  onMount(() => {
    const measure = () => {
      width = container.clientWidth;
      height = container.clientHeight;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  });


  const margin = { top: 5, right: 0, bottom: 60, left: 42 };

  let innerW = $derived(Math.max(0, width - margin.left - margin.right));
  let innerH = $derived(Math.max(0, height - margin.top - margin.bottom));

  let x = $derived(d3.scaleLinear().domain(chartConfig.xDomain).range([0, innerW]));
  let y = $derived(d3.scaleLinear().domain(chartConfig.yDomain).nice().range([innerH, 0]));

  function segmentsFor(line: LineData): { x1: number; y1: number; x2: number; y2: number }[] {
    const startYear = chartConfig.xDomain[0];
    const segs = [];
    for (let i = 1; i < line.dataPoints.length; i++) {
      const a = line.dataPoints[i - 1];
      const b = line.dataPoints[i];
      segs.push({
        x1: x(startYear + i - 1),
        y1: y(a),
        x2: x(startYear + i),
        y2: y(b)
      });
    }
    return segs;
  }

  let xTicks = $derived(x.ticks(6));
  let yTicks = $derived(y.ticks(6).filter((t) => t % 500_000 === 0));
  const tenMillionMark = 10_000_000;

  function fmtYear(v: number): string {
    return String(v);
  }
</script>

<div class={css({ width: "100%", height: "100%", display: "flex", flexDirection: "column" })}>
  <h3 class={css({textStyle: "chartTitle", mb: "20px" })}>
    {chartConfig.title}
  </h3>
  <div bind:this={container} class={css({ flex: "1", minHeight: "0" })}>
    <svg {width} {height} class={css({ display: "block" })}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {#each yTicks as t}
          {#if t % 1_000_000 === 0}
            <line x1="0" x2="8" y1={y(t)} y2={y(t)} class={css({ stroke: 'text'})} />
            <text x={-3} y={y(t)} dy="0.32em"
                  font-weight={t === tenMillionMark && currentState.annotations[0]?.show10M ? "bold" : "normal"}
                  class={css({ textAnchor: 'end', fontSize: "12px", fill: "text", fontFamily: "gtAmericaStandard", transition: "font-weight 300ms ease" })}>
              {t / 1_000_000} Mio.
            </text>
          {:else}
            <line x1="5" x2="8" y1={y(t)} y2={y(t)} class={css({ stroke: 'text'})} />
          {/if}
        {/each}

        <line x1="0" x2={innerW} y1={innerH} y2={innerH} class={css({ stroke: 'text' })} />

        {#each xTicks as t}
          <g transform={`translate(${x(t)},${innerH})`}>
            <line y2="5" class={css({ stroke: 'text'})} />
            <text y="18" text-anchor="middle"
                  class={css({ fontSize: "12px", fill: "text", fontFamily: "gtAmericaStandard"})}>
              {fmtYear(t)}
            </text>
          </g>
        {/each}

        {#each currentState.annotations as a (a.label)}
          {@const ax = x(a.x)}
          {@const ay = y(a.y)}
          {#if ax >= 0 && ax <= innerW}
            <circle cx={ax} cy={ay} r="4" class={css({ fill: 'background'})} />
          {/if}
        {/each}

        {#each lines as line}
          {#each segmentsFor(line) as s}
            <line
              x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
              stroke={line.color}
              stroke-width={currentState.highlight.includes(line.name) ? 2.5 : 1.5}
              opacity={currentState.highlight.includes(line.name) ? 1 : 0.15}
              style="transition: opacity 600ms ease, stroke-width 600ms ease;" />
          {/each}
        {/each}

        {#each currentState.annotations as a (a.label)}
          {@const ax = x(a.x)}
          {@const ay = y(a.y)}
          {#if ax >= 0 && ax <= innerW}
            <line x1={ax} x2={ax} y1={ay + 4} y2={innerH + 30} class={css({ stroke: 'text', strokeWidth: '1'})} />
            <circle cx={ax} cy={ay} r="4" class={css({ fill: 'none', stroke: 'text'})} />
            <text x={ax} y={innerH + 43} text-anchor="middle" fill={currentLine.color}
                  class={css({ fontSize: "14px", fontFamily: "gtAmericaStandard", fontFeatureSettings: "'tnum', 'kern'" })}>
              {a.label}
            </text>
          {/if}
        {/each}
      </g>
    </svg>
  </div>
</div>
