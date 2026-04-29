<script lang="ts">
  import type { ScaleLinear } from "d3-scale";
  import { css } from "@story/theme/css";
  import { format } from "./utils";

  interface Props {
    xScale: ScaleLinear<number, number>;
  }

  let { xScale }: Props = $props();

  const TICK_MARGIN_LEFT = 9;
  const xTicks = [
    0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000,
    110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000
  ];
  const xLabels = [0, 60000, 120000, 180000];
</script>

<div
  class={css({
    position: "sticky",
    top: "0",
    py: "20px",
    px: "2",
    zIndex: "2",
    height: "20px",
    mb: "10px",
    fontSize: "14px",
    fontFamily: "gtAmericaStandard",
    color: "text",
    background: "background",
  })}
  style:margin-left="{TICK_MARGIN_LEFT}px">
  {#each xLabels as tick, idx}
    <span
      class={css({ position: "absolute" })}
      style:left="{idx === 0 ? xScale(tick) - 2.5 : idx === 1 ? xScale(tick) - 20 : xScale(tick) - 25}px"
      style:margin-top="-10px">
      {format(tick)}
    </span>
  {/each}
  {#each xTicks as tick, idx}
    {@const tall = idx === 0 || idx % 6 === 0}
    <span
      class={css({ position: "absolute", background: "text", opacity: "0.5" })}
      style:left="{xScale(tick)}px"
      style:height={tall ? "8px" : "4px"}
      style:width="1px"
      style:margin-top={tall ? "10px" : "14px"}>
    </span>
  {/each}
</div>
