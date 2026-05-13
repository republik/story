<script lang="ts">
  import {onMount} from "svelte";
  import {css} from "@story/theme/css";
  import LineChart from "./LineChart.svelte";
  import type {InputData, Step} from "./types.d.ts";

  interface Props {
    componentData: InputData;
  }

  let {componentData}: Props = $props();

  let stepIdx = $state(0);
  let currentStep = $derived(componentData.steps[stepIdx] as Step);

  let stepsEl: HTMLDivElement;
  let chartEl: HTMLDivElement;

  onMount(() => {
    const steps = Array.from(stepsEl.querySelectorAll<HTMLElement>("[data-step]"));

    const onScroll = () => {
      const vh = window.innerHeight;
      const chartRect = chartEl.getBoundingClientRect();
      const containerRect = stepsEl.getBoundingClientRect();
      const visibleTop = Math.max(chartRect.bottom, containerRect.top);
      const visibleBottom = Math.min(vh, containerRect.bottom);
      const target = (visibleTop + visibleBottom) / 2;
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
    window.addEventListener("scroll", onScroll, {passive: true});
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
      boxShadow: "inset 0 -5px 5px -5px rgba(0,0,0,0.2)",
      width: "100vw",
      mx: "calc(50% - 50vw)",
      lg: {
        width: "60%",
        mx: "0",
        height: "100vh",
        alignItems: "center",
        pb: "6",
        boxShadow: "none",
      }
    })}>
        <div class={css({
      maxW: "center",
      width: "min(100%, calc(66vh * 3 / 4))",
      aspectRatio: "3 / 4",
      mx: "auto",
      py: "6",
      md: {
        width: "min(100%, 66vh)",
        aspectRatio: "1 / 1",
      },
      lg: {
        width: "100%",
        aspectRatio: "4 / 3",
        height: "auto",
      }
    })}>
            <LineChart
                    currentState={currentStep.state}
                    chartConfig={componentData.chartConfig}
                    lines={componentData.lines}/>
        </div>
    </div>

    <div bind:this={stepsEl} class={css({ py: "40vh"})}>
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
              mb: "80px",
              lg: {
                ml: "auto",
                maxW: "30%",
              },
              _last: { mb: "80px" },
              '& p': {
                maxW: "center",
                background: "background",
                textStyle: "chartDescription",
                padding: "20px",
                opacity: stepIdx === i ? 1 : 0.2,
                transition: "opacity 400ms ease",
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
</div>
