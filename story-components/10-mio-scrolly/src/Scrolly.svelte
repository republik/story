<script lang="ts">
  import { onMount } from "svelte";
  import { css } from "@story/theme/css";
  import LineChart from "./LineChart.svelte";
  import type { InputData, LineStepState } from "./types.d.ts";

  interface Props {
    componentData: InputData;
  }

  let { componentData }: Props = $props();

  let currentLine = $state(0);

  let lineState = $derived(componentData.lineSteps[currentLine].state as LineStepState);

  let lineScenario = $derived(componentData.scenarios[lineState.scenarioId]);


  let rootEl: HTMLDivElement;

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          currentLine = Number(el.dataset.idx);
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
      aspectRatio: "4 / 3",
      py: "6",
      lg: {
        height: "auto",
      }
    })}>
      <LineChart
        highlight={lineState.highlight}
        xDomain={lineState.xDomain}
        yDomain={lineState.yDomain}
        population={lineScenario.population}
        scenarioLabel={lineScenario.label}
        groups={componentData.groups}
        groupColors={componentData.groupColors}
        annotations={lineState.annotations} />
    </div>
  </div>

  {#each componentData.lineSteps as step, i}
    <div
      data-step
      data-section="line"
      data-idx={i}
      class={css({
            minH: "40vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lg: {
              ml: "auto",
              maxW: "40%",
              minH: "60vh",
              alignItems: "start",
            },
            _last: { mb: "80px" },
          })}>
      <p class={css({
            maxW: "center",
            background: "background",
            textStyle: "editorial",
            opacity: currentLine === i ? 1 : 0.45,
            transition: "opacity 400ms ease",
            lg: {
              pl: "8",
            },
          })}>
        {step.text}
      </p>
    </div>
  {/each}
</div>
