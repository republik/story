<script lang="ts">
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { css } from "@story/theme/css";
  import type { Annotation, Group, PopulationPoint } from "./types.d.ts";

  interface Props {
    population: PopulationPoint[];
    groups: Group[];
    groupColors: Record<Group, string>;
    highlight: Group[];
    xDomain: [number, number];
    yDomain: [number, number];
    title: string;
    description: string;
    annotations?: Annotation[];
  }

  let {
    population,
    groups,
    groupColors,
    highlight,
    xDomain,
    yDomain,
    title,
    description,
    annotations = []
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

  let x = $derived(d3.scaleLinear().domain(xDomain).range([0, innerW]));
  let y = $derived(d3.scaleLinear().domain(yDomain).nice().range([innerH, 0]));

  let line = $derived(
    d3.line<{ year: number; v: number }>()
      .x((d) => x(d.year))
      .y((d) => y(d.v))
      .curve(d3.curveMonotoneX)
  );

  function pathFor(group: Group): string {
    const pts = population
      .filter((p) => p.year >= xDomain[0] && p.year <= xDomain[1])
      .map((p) => ({ year: p.year, v: p[group] }));
    return line(pts) || "";
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
    {title}
  </h3>
  <p class={css({ textStyle: "chartDescription", mb: "15px"})}>{description}</p>
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

        {#each annotations as a (a.label)}
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

        {#each groups as g}
          <path
            d={pathFor(g)}
            fill="none"
            stroke={groupColors[g]}
            stroke-width={highlight.includes(g) ? 3 : 1.5}
            opacity={highlight.includes(g) ? 1 : 0.15}
            style="transition: opacity 600ms ease, stroke-width 600ms ease;" />
        {/each}
      </g>
    </svg>
  </div>
</div>
