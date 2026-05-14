<script lang="ts">
  import { onMount } from "svelte";
  import { css } from "@story/theme/css";
  import LineChart from "./LineChart.svelte";
  import type { InputData, Step } from "./types.d.ts";

  interface Props {
    componentData: InputData;
  }

  let { componentData }: Props = $props();

  let stepIdx = $state(0);
  let currentStep = $derived(componentData.steps[stepIdx] as Step);

  let stepsEl: HTMLDivElement;
  let mobileStepsEl: HTMLDivElement;
  let chartEl: HTMLDivElement;

  onMount(() => {
    const steps = Array.from(stepsEl.querySelectorAll<HTMLElement>("[data-step]"));

    const lgQuery = window.matchMedia("(min-width: 1024px)");

    const ro = new ResizeObserver(() => {
      const chartHeight = chartEl.offsetHeight;
      chartEl.style.setProperty("--chart-h", `${chartHeight}px`);
      stepsEl.style.setProperty("--chart-h", `${chartHeight}px`);
      mobileStepsEl.style.setProperty("--chart-h", `${chartHeight}px`);
    });
    ro.observe(chartEl);

    const onScroll = () => {
      const vh = window.innerHeight;
      let target: number;
      if (lgQuery.matches) {
        target = vh / 2;
      } else {
        const chartRect = chartEl.getBoundingClientRect();
        const containerRect = stepsEl.getBoundingClientRect();
        const visibleTop = Math.max(chartRect.bottom, containerRect.top);
        const visibleBottom = Math.min(vh, containerRect.bottom);
        target = (visibleTop + visibleBottom) / 2;
      }
      let bestIdx = 0;
      let bestDist = Infinity;
      for (const el of steps) {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - target);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = Number(el.dataset.idx);
        }
      }
      stepIdx = bestIdx;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
    };
  });
</script>

<div class={css({
  maxW: "1200px",
  mx: "auto",
  px: "15px",
  color: "text",
  position: "relative",
})}>
  <div bind:this={chartEl} class={css({
      position: "sticky",
      top: "0",
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
      zIndex: "1",
      background: "background",
      width: "100vw",
      mx: "calc(50% - 50vw)",
      lg: {
        width: "60%",
        mx: "0",
        top: "calc(50% - var(--chart-h, 600px) / 2)",
        alignItems: "center",
        pb: "6",
      }
    })}>
    <div class={css({
      maxW: "center",
      width: "min(100%, calc(66vh * 3 / 4))",
      aspectRatio: "3 / 4",
      mx: "auto",
      pt: "10",
      px: "15px",
      md: {
        width: "min(100%, 66vh)",
        aspectRatio: "1 / 1",
      },
      lg: {
        px: "0",
        width: "100%",
        aspectRatio: "4 / 3",
        height: "auto",
      }
    })}>
      <LineChart
        currentState={currentStep.state}
        chartConfig={componentData.chartConfig}
        lines={componentData.lines} />
    </div>
  </div>

  <div bind:this={stepsEl} class={css({ lg: { mt: "calc(var(--chart-h, 600px)*-0.9)", pb: "180px" }})}>
    {#each componentData.steps as step, i}
      {@const stepLine = componentData.lines.find(l => step.state.highlight.includes(l.name))}
      <div
        data-step
        data-section="line"
        data-idx={i}
        style={stepLine ? `--accent: ${stepLine.color}` : undefined}
        class={css({
              display: "flex",
              justifyContent: "center",
              height: "max(100vh - var(--chart-h), 200px)",
              '& p': { display: "none" },
              lg: {
                height: "auto",
                minH: "auto",
                mb: "20px",
                _first: { mt: 0 },
                ml: "auto",
                maxW: "30%",
                '& p': {
                  display: "block",
                  width: "100%",
                  maxW: "center",
                  background: "background",
                  textStyle: "chartDescription",
                  padding: "20px",
                  opacity: stepIdx === i ? 1 : 0.2,
                  transition: "opacity 400ms ease",
                },
              },
              '& .color': {
                textDecoration: "underline",
                textDecorationColor: "var(--accent)",
                textDecorationThickness: "2px",
                textUnderlineOffset: "3px",
              }
            })}>
        {@html step.text}
      </div>
    {/each}
  </div>

  <div bind:this={mobileStepsEl} class={css({
    position: "sticky",
    bottom: "0",
    width: "100vw",
    mx: "calc(50% - 50vw)",
    background: "background",
    boxShadow: "0 -5px 5px -5px rgba(0,0,0,0.2)",
    height: "max(100vh - var(--chart-h), 200px)",
    zIndex: "2",
    lg: { display: "none" },
  })}>
    {#each componentData.steps as step, i}
      {@const stepLine = componentData.lines.find(l => step.state.highlight.includes(l.name))}
      <div
        style={stepLine ? `--accent: ${stepLine.color}` : undefined}
        class={css({
          position: "absolute",
          inset: "0",
          padding: "20px",
          opacity: stepIdx === i ? 1 : 0,
          transition: "opacity 400ms ease",
          pointerEvents: "none",
          '& p': {
            textStyle: "chartDescription",
          },
          '& .color': {
            textDecoration: "underline",
            textDecorationColor: "var(--accent)",
            textDecorationThickness: "2px",
            textUnderlineOffset: "3px",
          },
        })}>
        {@html step.text}
      </div>
    {/each}
  </div>
</div>
