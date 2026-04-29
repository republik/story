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


  const margin = { top: 10, right: 0, bottom: 50, left: 40 };

  let innerW = $derived(Math.max(0, width - margin.left - margin.right));
  let innerH = $derived(Math.max(0, height - margin.top - margin.bottom));

  let x = $derived(d3.scaleLinear().domain(chartConfig.xDomain).range([0, innerW]));
  let y = $derived(d3.scaleLinear().domain(chartConfig.yDomain).nice().range([innerH, 0]));

  function segmentsFor(line: LineData): { x1: number; y1: number; x2: number; y2: number }[] {
    const segs = [];
    for (let i = 1; i < line.dataPoints.length; i++) {
      const a = line.dataPoints[i - 1];
      const b = line.dataPoints[i];
      segs.push({ x1: x(a.year), y1: y(a[group]), x2: x(b.year), y2: y(b[group]) });
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
        <rect x="0" y="0" width={innerW} height={Math.max(0, y(tenMillionMark))}
              fill="#8B6F47" opacity="0.08" />

        {#each yTicks as t}
          <line x1="0" x2={innerW} y1={y(t)} y2={y(t)} stroke="#E5E5E5" />
          <text x={-8} y={y(t)} dy="0.32em" text-anchor="end"
                class={css({ fontSize: "12px", fill: "text", fontFamily: "gtAmericaStandard"})}>
            {d3.format("~s")(t)}
          </text>
        {/each}

        <line x1="0" x2={innerW} y1={innerH} y2={innerH} stroke="#000" />

        {#each currentState.annotations as a (a.label)}
          {@const ax = x(a.x)}
          {@const ay = y(a.y)}
          {@const color = a.color ?? "#444"}
          {#if ax >= 0 && ax <= innerW}
            <line x1={ax} x2={ax} y1={ay} y2={innerH + 22}
                  stroke={color} stroke-dasharray="3 3" stroke-width="1" />
            <circle cx={ax} cy={ay} r="3" fill={color} />
            <text x={ax} y={innerH + 36} text-anchor="middle"
                  class={css({ fontSize: "11px", fontWeight: "medium", fontFamily: "gtAmericaStandard" })}
                  fill={color}>
              {a.label}
            </text>
          {/if}
        {/each}
        {#each xTicks as t}
          <g transform={`translate(${x(t)},${innerH})`}>
            <line y2="5" stroke="#000" />
            <text y="18" text-anchor="middle"
                  class={css({ fontSize: "12px", fill: "text", fontFamily: "gtAmericaStandard"})}>
              {fmtYear(t)}
            </text>
          </g>
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
      </g>
    </svg>
  </div>
</div>
