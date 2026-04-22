<script lang="ts">
  import * as d3 from "d3";
  import { onMount, untrack } from "svelte";
  import { css } from "@story/theme/css";
  import type { Group, PopulationPoint } from "./types.d.ts";

  interface Props {
    population: PopulationPoint[];
    groups: Group[];
    groupColors: Record<Group, string>;
    highlight: Group[];
    xDomain: [number, number];
    scenarioLabel?: string;
  }

  let { population, groups, groupColors, highlight, xDomain, scenarioLabel }: Props = $props();

  let container: HTMLDivElement;
  let width = $state(600);
  let height = $state(420);

  onMount(() => {
    const ro = new ResizeObserver(() => {
      width = container.clientWidth;
      height = Math.min(480, Math.max(300, container.clientWidth * 0.66));
    });
    ro.observe(container);
    return () => ro.disconnect();
  });

  // --- Smooth tween between scenario datasets ---
  // Displayed population interpolates from the previous dataset to the new one
  // whenever the `population` prop reference changes.
  let displayPop = $state<PopulationPoint[]>(population.map((p) => ({ ...p })));
  let rafId: number | null = null;

  $effect(() => {
    const target = population;
    const from = untrack(() => displayPop.map((p) => ({ ...p })));
    const t0 = performance.now();
    const duration = 700;
    if (rafId) cancelAnimationFrame(rafId);

    function step(now: number) {
      const t = Math.min(1, (now - t0) / duration);
      // easeInOutCubic
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      displayPop = from.map((d, i) => {
        const tp = target[i];
        const out: PopulationPoint = { year: tp.year } as PopulationPoint;
        for (const g of groups) out[g] = d[g] + (tp[g] - d[g]) * e;
        return out;
      });
      if (t < 1) rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
  });

  const margin = { top: 10, right: 60, bottom: 20, left: 35 };

  let innerW = $derived(Math.max(0, width - margin.left - margin.right));
  let innerH = $derived(Math.max(0, height - margin.top - margin.bottom));

  let x = $derived(d3.scaleLinear().domain(xDomain).range([0, innerW]));

  let yMax = $derived(
    d3.max(displayPop.filter((p) => p.year >= xDomain[0] && p.year <= xDomain[1]),
      (p) => Math.max(...groups.map((g) => p[g]))) || 1
  );
  // Snap the top of the scale to the next power of ten so the log ticks
  // (10, 100, 1 000, 10 000, 100 000 …) sit at perfectly even visual intervals.
  let yTop = $derived(Math.pow(10, Math.ceil(Math.log10(yMax))));
  let y = $derived(d3.scaleLog().domain([10, yTop]).range([innerH, 0]).clamp(true));

  let line = $derived(
    d3.line<{ year: number; v: number }>()
      .x((d) => x(d.year))
      .y((d) => y(d.v))
      .curve(d3.curveMonotoneX)
  );

  function pathFor(group: Group): string {
    const pts = displayPop
      .filter((p) => p.year >= xDomain[0] && p.year <= xDomain[1])
      .map((p) => ({ year: p.year, v: p[group] }));
    return line(pts) || "";
  }

  let xTicks = $derived(x.ticks(6));
  // Explicit powers-of-ten ticks within the current domain, evenly spaced on the log axis.
  let yTicks = $derived(
    (() => {
      const ticks: number[] = [];
      for (let t = 10; t <= yTop; t *= 10) ticks.push(t);
      return ticks;
    })()
  );

  function fmtYear(v: number): string {
    if (v === 0) return "0";
    return `${v / 1000}k`;
  }

  let lastPoint = $derived(
    displayPop.filter((p) => p.year >= xDomain[0] && p.year <= xDomain[1]).slice(-1)[0]
  );
</script>

<div bind:this={container} class={css({ width: "100%" })}>
  {#if scenarioLabel}
    <h3 class={css({textStyle: "chartTitle", mb: "15px", "& + p": { mt: "-15px"}})}>
      Scenario: {scenarioLabel}
    </h3>
    <p class={css({ textStyle: "chartDescription", mb: "15px"})}>Description</p>
  {/if}
  <svg {width} {height} class={css({ display: "block" })}>
    <g transform={`translate(${margin.left},${margin.top})`}>
      {#each yTicks as t}
        <line x1="0" x2={innerW} y1={y(t)} y2={y(t)}
              stroke="#E5E5E5" />
        <text x={-8} y={y(t)} dy="0.32em" text-anchor="end"
              class={css({ fontSize: "12px", fill: "text", fontFamily: "gtAmericaStandard"})}>
          {d3.format("~s")(t)}
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

      {#each groups as g}
        <path
          d={pathFor(g)}
          fill="none"
          stroke={groupColors[g]}
          stroke-width={highlight.includes(g) ? 2.5 : 1.5}
          opacity={highlight.includes(g) ? 1 : 0.15}
          style="transition: opacity 600ms ease, stroke-width 600ms ease;" />
      {/each}

      {#each groups as g}
        <text
          x={innerW + 4}
          y={y(lastPoint[g])}
          dy="0.32em"
          class={css({ fontSize: "12px", fontFamily: "gtAmericaStandard"})}
          fill={groupColors[g]}
          opacity={highlight.includes(g) ? 1 : 0.15}
          style="transition: opacity 600ms ease;">
          {g}
        </text>
      {/each}
    </g>
  </svg>
</div>
