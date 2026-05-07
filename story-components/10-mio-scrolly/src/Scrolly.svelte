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

  let rootEl: HTMLDivElement;

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          stepIdx = Number(el.dataset.idx);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    rootEl.querySelectorAll<HTMLElement>("[data-step]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
</script>

<div bind:this={rootEl} class={css({
  maxW: "1200px",
  mx: "auto",
  px: "15px",
  color: "text",
  position: "relative",
})}>
  <div class={css({
      position: "sticky",
      top: "0",
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
      zIndex: "1",
      background: "background",
      lg: {
        width: "60%",
        height: "100vh",
        alignItems: "center",
        pb: "6",
      }
    })}>
    <div class={css({
      maxW: "center",
      width: "100%",
      py: "6",
      aspectRatio: "3 / 4",
      paddingTop: "[120px]",
      md: {
        aspectRatio: "4 / 3"
      },
      lg: {
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

  {#each componentData.steps as step, i}
    {@const stepLine = componentData.lines.find(l => step.state.highlight.includes(l.name))}
    <div
      data-step
      data-section="line"
      data-idx={i}
      style={stepLine ? `--accent: ${stepLine.color}` : undefined}
      class={css({
            minH: "40vh",
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
            lg: {
              ml: "auto",
              maxW: "30%",
              minH: "60vh",
              alignItems: "start",
            },
            _last: { mb: "80px" },
            '& p': {
              maxW: "center",
              background: "background",
              textStyle: "editorial",
              opacity: stepIdx === i ? 1 : 0.45,
              transition: "opacity 400ms ease",
              lg: {
                pl: "8",
              },
            },
            '& .color': {
              color: "var(--accent)",
              fontWeight: 500,
            }
          })}>
      {@html step.text}
    </div>
  {/each}
</div>
