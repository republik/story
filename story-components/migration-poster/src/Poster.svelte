<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { css } from "@story/theme/css";
  import XAxis from "./XAxis.svelte";
  import YAxis from "./YAxis.svelte";
  import type { InputData } from "./types.d.ts";
  import { format } from "./utils";

  interface Props {
    componentData: InputData;
  }

  let { componentData }: Props = $props();

  const HEIGHT = 2000;
  const WIDTH = 420;
  const margin = { top: 20, bottom: 20, left: 40, right: 20 };
  const colors = {
    immigration: "#3AC296",
    emmigration: "#000000"
  };
  const mobileBreakpoint = 850;

  let chartContainer: HTMLDivElement;
  let scrollProgress = $state(0);
  let viewportWidth = $state(typeof window === "undefined" ? 1200 : window.innerWidth);

  let isMobile = $derived(viewportWidth <= mobileBreakpoint);
  let width = $derived(
    isMobile ? Math.min(400, viewportWidth - margin.right - margin.left) : WIDTH
  );

  onMount(() => {
    const onResize = () => (viewportWidth = window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);

    const onScroll = () => {
      if (!chartContainer) return;
      const rect = chartContainer.getBoundingClientRect();
      const vh = window.innerHeight;
      // Mirrors framer-motion useScroll offset ['start center', 'end 80vh'].
      const start = rect.top - vh * 0.5;
      const end = rect.bottom - vh * 0.8;
      const total = end - start;
      const p = total > 0 ? -start / total : 0;
      scrollProgress = Math.max(0, Math.min(1, p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  });

  // Piecewise-linear interpolation matching framer-motion useTransform.
  function interp(p: number, input: number[], output: number[]): number {
    if (p <= input[0]) return output[0];
    if (p >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 1; i < input.length; i++) {
      if (p <= input[i]) {
        const t = (p - input[i - 1]) / (input[i] - input[i - 1]);
        return output[i - 1] + t * (output[i] - output[i - 1]);
      }
    }
    return output[output.length - 1];
  }

  function fadeOpacity(p: number, threshold: number[]): number {
    if (threshold.length === 4) {
      return interp(p, threshold, [0, 1, 1, 0]);
    }
    // 2-stop threshold: fade in only.
    return interp(p, threshold, [0, 1]);
  }

  let rows = $derived(componentData.data);
  let xDomain = $derived<[number, number]>([0, d3.max(rows, (d) => Math.max(d.immigration, d.emmigration)) ?? 0]);
  // Extend the y-domain one year past the last data point so we can render
  // a tick for the upcoming year without any data attached to it.
  const trailingTickYear = 2025;
  let yDomain = $derived<[number, number]>([
    d3.min(rows, (d) => d.year) ?? 1995,
    trailingTickYear
  ]);

  let xScale = $derived(
    d3.scaleLinear().domain(xDomain).range([margin.left, width - margin.right])
  );
  let yScale = $derived(
    d3.scaleLinear().domain(yDomain).range([margin.top, HEIGHT - margin.bottom])
  );

  let immigrationLine = $derived(
    d3
      .line<{ year: number; v: number }>()
      .x((d) => xScale(d.v))
      .y((d) => yScale(d.year))
      .curve(d3.curveNatural)(rows.map((d) => ({ year: d.year, v: d.immigration }))) ?? ""
  );
  let emmigrationLine = $derived(
    d3
      .line<{ year: number; v: number }>()
      .x((d) => xScale(d.v))
      .y((d) => yScale(d.year))
      .curve(d3.curveNatural)(rows.map((d) => ({ year: d.year, v: d.emmigration }))) ?? ""
  );

  // Two areas, each clipped against the other line, so the bigger flow shades
  // outward only in the years it dominates.
  let clipPathEmmigration = $derived(
    d3
      .area<typeof rows[number]>()
      .y((d) => yScale(d.year))
      .x0(0)
      .x1((d) => xScale(d.emmigration))
      .curve(d3.curveNatural)(rows) ?? ""
  );
  let clipPathImmigration = $derived(
    d3
      .area<typeof rows[number]>()
      .y((d) => yScale(d.year))
      .x0(width)
      .x1((d) => xScale(d.emmigration))
      .curve(d3.curveNatural)(rows) ?? ""
  );
  let emmigrationArea = $derived(
    d3
      .area<typeof rows[number]>()
      .y((d) => yScale(d.year))
      .x0(width)
      .x1((d) => xScale(d.immigration))
      .curve(d3.curveNatural)(rows) ?? ""
  );
  let immigrationArea = $derived(
    d3
      .area<typeof rows[number]>()
      .y((d) => yScale(d.year))
      .x0(0)
      .x1((d) => xScale(d.immigration))
      .curve(d3.curveNatural)(rows) ?? ""
  );

  // Reveal mask: rect covers the chart and slides down as you scroll.
  // Complete the reveal slightly before scroll ends so the final year (bottom
  // of the chart) is uncovered even when the page doesn't have enough runway
  // for scrollProgress to reach exactly 1.
  let revealY = $derived(interp(scrollProgress, [0, 0.9], [0, HEIGHT + 4]));
  // Mobile drawer height grows in a small window early in the scroll.
  let drawerHeight = $derived(interp(scrollProgress, [0.04, 0.05], [0, 275]));

  const yLabels = $derived(
    [...rows.map((d) => d.year), trailingTickYear].filter((_, i) => i % 5 === 0)
  );
  const yTicks = $derived([...rows.map((d) => d.year), trailingTickYear]);

  function clipId(suffix: string) {
    // Unique id so multiple instances on a page don't collide.
    return `mp-clip-${suffix}-${componentData.chartTitle.replace(/\W+/g, "-")}`;
  }
</script>

<div class={css({ width: "100%", overflowX: "clip" })}>
  <div class={css({ maxW: "center", mx: "auto", px: "15px" })}>
    <h3 class={css({ textStyle: "chartTitle", mb: "5px" })}>
      {componentData.chartTitle}
    </h3>
    <p class={css({ textStyle: "chartDescription", mb: "15px" })}>
      {componentData.chartSubTitle}
    </p>
  </div>

  <div
    bind:this={chartContainer}
    class={css({
      position: "relative",
      mx: "auto",
      width: "100%",
      maxWidth: "900px",
      px: "15px",
      pb: "15px",
    })}>
    <XAxis {xScale} />

    {#if !isMobile}
      {#each componentData.steps as step (step.step)}
        <div
          class={css({
            position: "absolute",
            textAlign: "left",
            width: "420px",
            padding: "20px",
            color: "text",
            pointerEvents: "none",
          })}
          style:top="{yScale(Number(step.positionY))}px"
          style:left="{step.positionX}px"
          style:opacity={fadeOpacity(scrollProgress, step.threshold)}>
          <p class={css({ textStyle: "chartDescription", mt: "5px" })}>
            {componentData.translations[step.step + "/text"]}
          </p>
        </div>
      {/each}
    {/if}

    {#each componentData.annotations as a (a.title)}
      <div
        class={css({
          position: "absolute",
          fontSize: "14px",
          fontFamily: "gtAmericaStandard",
          pointerEvents: "none",
        })}
        style:top="{yScale(Number(a.positionY))}px"
        style:left="{xScale(isMobile ? a.mobilePositionX : a.positionX)}px"
        style:color={colors[a.color]}
        style:opacity={fadeOpacity(scrollProgress, isMobile ? a.mobileThreshold : a.threshold)}>
        {a.title}
      </div>
    {/each}

    <svg width={width} height={HEIGHT} class={css({ display: "block" })}>
      <clipPath id={clipId("emm")}>
        <path d={clipPathEmmigration}></path>
      </clipPath>
      <clipPath id={clipId("imm")}>
        <path d={clipPathImmigration}></path>
      </clipPath>

      <path
        fill={colors.immigration}
        fill-opacity="0.1"
        d={immigrationArea}
        clip-path="url(#{clipId('imm')})" />
      <path
        class={css({ fill: "#000", _dark: { fill: "#fff"}})}
        fill-opacity="0.1"
        d={emmigrationArea}
        clip-path="url(#{clipId('emm')})" />

      <path fill="none" stroke-width="2" class={css({ stroke: "#000", _dark: { stroke: "#fff"}})} d={emmigrationLine} />
      <path fill="none" stroke-width="2" stroke={colors.immigration} d={immigrationLine} />

      {#if !isMobile}
        <rect
          width={width - margin.right}
          height={HEIGHT}
          class={css({ fill: "background" })}
          y={revealY}
          x={margin.left} />
      {/if}

      <YAxis {yScale} {yLabels} {yTicks} {margin} />

      {#each componentData.peaks as peak (peak.year)}
        {@const threshold = isMobile ? peak.mobileThreshold : peak.threshold}
        {@const t = interp(scrollProgress, threshold, [0, 1])}
        {@const x1 = xScale(peak.emmigration)}
        {@const x2 = xScale(peak.immigration)}
        {@const yp = yScale(Number(peak.year))}
        <g>
          <line
            x1={x1} x2={x2} y1={yp} y2={yp}
            class={css({ stroke: "text", shapeRendering: "crispEdges" })}
            stroke-width={t} />
          <circle cx={x1} cy={yp} r={t * 4} class={css({ stroke: "text", fill: "transparent", strokeWidth: "1" })} />
          <circle cx={x2} cy={yp} r={t * 4} class={css({ stroke: "text", fill: "transparent", strokeWidth: "1" })} />
          <text
            x={xScale(peak.numberPositionX)} y={yp}
            dy="22" dx={isMobile ? -10 : 0}
            opacity={t}
            class={css({ fontSize: "14px", fontFamily: "gtAmericaStandard", fill: "text" })}>
            {format(peak.immigration - peak.emmigration)}
          </text>
        </g>
      {/each}
    </svg>

    {#if isMobile}
      <div
        class={css({
          position: "sticky",
          bottom: "0",
          background: "background",
          zIndex: "100",
          mx: "-15px",
          overflow: "hidden",
          boxShadow: "0 -5px 5px -5px rgba(0,0,0,0.1)",
        })}
        style:height="{drawerHeight}px">
        {#each componentData.steps as step (step.step)}
          {@const threshold = step.mobileThreshold ?? step.threshold}
          <div
            class={css({
              position: "absolute",
              inset: "0",
              padding: "20px",
              color: "text",
              pointerEvents: "none",
            })}
            style:opacity={fadeOpacity(scrollProgress, threshold)}>
            <p class={css({ textStyle: "chartDescription", mt: "5px" })}>
              {componentData.translations[step.step + "/text"]}
            </p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
