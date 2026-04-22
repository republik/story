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

  // Resolve label collisions at the right edge of the chart: for each group
  // compute its ideal y (on the line), then push labels apart so none overlap.
  // When a label has been moved from its ideal position, a dotted connector
  // links the label back to the line's actual end point.
  const labelMinSpacing = 14;

  type LabelPos = { group: Group; idealY: number; y: number };
  let labelPositions = $derived.by<LabelPos[]>(() => {
    const raw = groups.map((g) => ({ group: g, idealY: y(lastPoint[g]), y: y(lastPoint[g]) }));
    // top-down pass: push each label below the previous by at least minSpacing
    const sorted = [...raw].sort((a, b) => a.y - b.y);
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      if (sorted[i].y < prev.y + labelMinSpacing) {
        sorted[i].y = prev.y + labelMinSpacing;
      }
    }
    // bottom-up pass: if last label overflows, pull labels upward
    for (let i = sorted.length - 2; i >= 0; i--) {
      const next = sorted[i + 1];
      if (next.y - sorted[i].y < labelMinSpacing) {
        sorted[i].y = next.y - labelMinSpacing;
      }
    }
    return sorted;
  });
</script>

<div class={css({ width: "100%", height: "100%", display: "flex", flexDirection: "column" })}>
  {#if scenarioLabel}
    <h3 class={css({textStyle: "chartTitle", mb: "15px", "& + p": { mt: "-15px"}})}>
      Scenario: {scenarioLabel}
    </h3>
    <p class={css({ textStyle: "chartDescription", mb: "15px"})}>Description</p>
  {/if}
  <div bind:this={container} class={css({ flex: "1", minHeight: "0" })}>
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

      {#each labelPositions as lp}
        {@const shifted = Math.abs(lp.y - lp.idealY) > 1}
        {#if shifted}
          <line
            x1={innerW}
            y1={lp.idealY}
            x2={innerW + 4}
            y2={lp.y}
            stroke={groupColors[lp.group]}
            stroke-width="1"
            stroke-dasharray="1 2"
            opacity={highlight.includes(lp.group) ? 0.6 : 0.1}
            style="transition: opacity 600ms ease;" />
        {/if}
        <text
          x={innerW + 6}
          y={lp.y}
          dy="0.32em"
          class={css({ fontSize: "12px", fontFamily: "gtAmericaStandard"})}
          fill={groupColors[lp.group]}
          opacity={highlight.includes(lp.group) ? 1 : 0.15}
          style="transition: opacity 600ms ease;">
          {lp.group}
        </text>
      {/each}
    </g>
  </svg>
  </div>
</div>
