<script lang="ts">
  import type { ScaleLinear } from "d3-scale";
  import { css } from "@story/theme/css";

  interface Props {
    yScale: ScaleLinear<number, number>;
    yLabels: number[];
    yTicks: number[];
    margin: { top: number; bottom: number; left: number; right: number };
  }
  let { yScale, yLabels, yTicks, margin }: Props = $props();
  const TICK_MARGIN_LEFT = 9;
</script>

<g transform={`translate(${TICK_MARGIN_LEFT}, 0)`}
   class={css({ fontSize: "14px", fontFamily: "gtAmericaStandard", fill: "text" })}>
  {#each yLabels as tick (tick)}
    <g transform={`translate(0, ${yScale(tick)})`}>
      <text text-anchor="start">
        <tspan dy="5" dx={-TICK_MARGIN_LEFT}>{tick}</tspan>
      </text>
    </g>
  {/each}
  {#each yTicks as tick, idx (tick)}
    {@const major = idx === 0 || idx % 5 === 0}
    <g transform={`translate(${major ? margin.left - 10 : margin.left - 6}, ${yScale(tick)})`}>
      <line
        x1={major ? margin.left - 32 : margin.left - 36}
        x2={0}
        stroke="var(--color-text, #000)"
        stroke-width="1"
        opacity="0.5"
        shape-rendering="crispEdges" />
    </g>
  {/each}
</g>
