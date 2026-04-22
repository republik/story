<script lang="ts">
  import * as d3 from "d3";
  import { onMount, untrack } from "svelte";
  import { css } from "@story/theme/css";
  import type { Group, ShareRow } from "./types.d.ts";

  interface Props {
    shares: ShareRow[];
    groups: Group[];
    groupColors: Record<Group, string>;
    focusEra?: string;
    scenarioLabel?: string;
  }

  let { shares, groups, groupColors, focusEra, scenarioLabel }: Props = $props();

  let container: HTMLDivElement;
  let width = $state(600);
  let height = $state(420);

  onMount(() => {
    const ro = new ResizeObserver(() => {
      width = container.clientWidth;
      height = Math.min(480, Math.max(320, container.clientWidth * 0.66));
    });
    ro.observe(container);
    return () => ro.disconnect();
  });

  // --- Tween shares between scenarios ---
  let displayShares = $state<ShareRow[]>(shares.map((s) => ({ ...s })));
  let rafId: number | null = null;

  $effect(() => {
    const target = shares;
    const from = untrack(() => displayShares.map((s) => ({ ...s })));
    const t0 = performance.now();
    const duration = 700;
    if (rafId) cancelAnimationFrame(rafId);

    function step(now: number) {
      const t = Math.min(1, (now - t0) / duration);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      displayShares = from.map((d, i) => {
        const tp = target[i];
        const out = { era: tp.era } as ShareRow;
        for (const g of groups) out[g] = (d[g] as number) + ((tp[g] as number) - (d[g] as number)) * e;
        return out;
      });
      if (t < 1) rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
  });

  const margin = { top: 40, right: 80, bottom: 36, left: 48 };
  let innerW = $derived(Math.max(0, width - margin.left - margin.right));
  let innerH = $derived(Math.max(0, height - margin.top - margin.bottom));

  let x = $derived(
    d3.scaleBand<string>().domain(displayShares.map((s) => s.era as string)).range([0, innerW]).padding(0.22)
  );
  let y = $derived(d3.scaleLinear().domain([0, 1]).range([innerH, 0]));

  type Seg = { group: Group; y0: number; y1: number };
  function stackFor(era: string): Seg[] {
    const row = displayShares.find((s) => s.era === era)!;
    let acc = 0;
    return groups.map((g) => {
      const v = row[g] as number;
      const seg = { group: g, y0: acc, y1: acc + v };
      acc += v;
      return seg;
    });
  }
</script>

<div bind:this={container} class={css({ width: "100%" })}>
  <svg {width} {height} class={css({ display: "block" })}>
    {#if scenarioLabel}
      <text
        x={margin.left}
        y={20}
        font-size="12"
        font-weight="700"
        fill="#000"
        font-family="GT-America-Standard, Helvetica-Neue, Arial, sans-serif">
        Scenario: {scenarioLabel}
      </text>
    {/if}
    <g transform={`translate(${margin.left},${margin.top})`}>
      {#each [0, 0.25, 0.5, 0.75, 1] as t}
        <line x1="0" x2={innerW} y1={y(t)} y2={y(t)}
              stroke="#E5E5E5" stroke-dasharray="2 3" />
        <text x={-8} y={y(t)} dy="0.32em" text-anchor="end"
              font-size="11" fill="#757575"
              font-family="GT-America-Standard, Helvetica-Neue, Arial, sans-serif">
          {Math.round(t * 100)}%
        </text>
      {/each}

      {#each displayShares as row}
        {@const isFocus = focusEra === row.era}
        {@const bx = x(row.era as string) ?? 0}
        <g transform={`translate(${bx},0)`}
           style="transition: opacity 500ms ease;"
           opacity={focusEra && !isFocus ? 0.4 : 1}>
          {#each stackFor(row.era as string) as seg}
            <rect
              x="0"
              y={y(seg.y1)}
              width={x.bandwidth()}
              height={y(seg.y0) - y(seg.y1)}
              fill={groupColors[seg.group]} />
          {/each}
          <text
            x={x.bandwidth() / 2}
            y={innerH + 18}
            text-anchor="middle"
            font-size="11"
            fill={isFocus ? "#000" : "#757575"}
            font-weight={isFocus ? 700 : 400}
            font-family="GT-America-Standard, Helvetica-Neue, Arial, sans-serif">
            {row.era}
          </text>
        </g>
      {/each}

      <g transform={`translate(${innerW + 12},0)`}>
        {#each groups as g, i}
          <g transform={`translate(0,${i * 18})`}>
            <rect width="10" height="10" fill={groupColors[g]} />
            <text x="14" y="9" font-size="11" fill="#333"
                  font-family="GT-America-Standard, Helvetica-Neue, Arial, sans-serif">
              {g}
            </text>
          </g>
        {/each}
      </g>
    </g>
  </svg>
</div>
