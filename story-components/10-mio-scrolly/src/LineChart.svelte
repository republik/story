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


  const margin = { top: 10, right: 5, bottom: 60, left: 48 };

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
  let yTicks = $derived(y.ticks(6).filter((t) => t % 1_000_000 === 0));
  const tenMillionMark = 10_000_000;

  function fmtYear(v: number): string {
    return String(v);
  }
</script>

<div class={css({ width: "100%", height: "100%", display: "flex", flexDirection: "column" })}>
  <h3 class={css({textStyle: "chartTitle", mb: "15px", "& + p": { mt: "-15px"}})}>
    {chartConfig.title}
  </h3>
  <p class={css({ textStyle: "chartDescription", mb: "15px"})}>{currentState.chartDescription}</p>
  <div bind:this={container} class={css({ flex: "1", minHeight: "0" })}>
    <svg {width} {height} class={css({ display: "block" })}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {#each yTicks as t}
          <line x1="0" x2={innerW} y1={y(t)} y2={y(t)} stroke={t === tenMillionMark ? "#000" : "#E5E5E5"}
                stroke-dasharray={t === tenMillionMark ? "5 2" : "0"} />
          <text x={-8} y={y(t)} dy="0.32em" text-anchor="end"
                class={css({ fontSize: "12px", fill: "text", fontFamily: "gtAmericaStandard"})}
                font-weight={t === tenMillionMark ? "bold" : "normal"}>
            {t / 1_000_000} Mio.
          </text>
        {/each}

        <line x1="0" x2={innerW} y1={innerH} y2={innerH} stroke="#000" />

        {#each xTicks as t}
          <g transform={`translate(${x(t)},${innerH})`}>
            <line y2="5" stroke="#000" />
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
            <circle cx={ax} cy={ay} r="4" fill="#fff" />
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
            <line x1={ax} x2={ax} y1={ay + 4} y2={innerH + 30} stroke="#000" stroke-width="1" />
            <circle cx={ax} cy={ay} r="4" fill="none" stroke="#000" />
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
