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
  maxW: "1100px",
  mx: "auto",
  px: "4",
  color: "var(--color-text)",
  position: "relative",
})}>
  <div class={css({
      position: "sticky",
      top: "0",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
    })}>
    <div class={css({ width: "100%", maxW: "900px", px: "4" })}>
      <LineChart
        highlight={lineState.highlight}
        xDomain={lineState.xDomain}
        population={lineScenario.population}
        scenarioLabel={lineScenario.label}
        groups={componentData.groups}
        groupColors={componentData.groupColors} />
    </div>
  </div>

  <div class={css({
      position: "relative",
      marginTop: "-100vh",
      pointerEvents: "none",
    })}>
    {#each componentData.lineSteps as step, i}
      <div
        data-step
        data-section="line"
        data-idx={i}
        class={css({
            minH: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: { base: "center", lg: "flex-end" },
            px: "4",
          })}>
        <p class={css({
            background: "background",
            p: "5",
            maxW: "360px",
            textStyle: "editorial",
            opacity: currentLine === i ? 1 : 0.45,
            transition: "opacity 400ms ease",
          })}>
          {step.text}
        </p>
      </div>
    {/each}
  </div>
</div>