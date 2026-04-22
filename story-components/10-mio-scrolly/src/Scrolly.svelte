<script lang="ts">
  import { onMount } from "svelte";
  import { css } from "@story/theme/css";
  import LineChart from "./LineChart.svelte";
  import StackedBars from "./StackedBars.svelte";
  import type { BarsStepState, InputData, LineStepState } from "./types.d.ts";

  interface Props {
    componentData: InputData;
  }

  let { componentData }: Props = $props();

  let currentLine = $state(0);
  let currentBars = $state(0);

  let lineState = $derived(componentData.lineSteps[currentLine].state as LineStepState);
  let barsState = $derived(componentData.barsSteps[currentBars].state as BarsStepState);

  let lineScenario = $derived(componentData.scenarios[lineState.scenarioId]);
  let barsScenario = $derived(componentData.scenarios[barsState.scenarioId]);

  let rootEl: HTMLDivElement;

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const section = el.dataset.section;
          const idx = Number(el.dataset.idx);
          if (section === "line") currentLine = idx;
          if (section === "bars") currentBars = idx;
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
})}>
  <!-- Intro -->
  <section class={css({
    maxW: "content.text",
    mx: "auto",
    py: "16",
    textStyle: "editorial",
    fontSize: "l",
  })}>
    <h2 class={css({ textStyle: "teaserTitle", mb: "6" })}>
      {componentData.intro.title}
    </h2>
    {#each componentData.intro.paragraphs as p}
      <p class={css({ mb: "4" })}>{p}</p>
    {/each}
  </section>

  <!-- Section 1: line chart -->
  <section class={css({ position: "relative" })}>
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
  </section>

  <!-- Bridge -->
  <section class={css({
    maxW: "content.text",
    mx: "auto",
    py: "16",
    textStyle: "editorial",
  })}>
    <p>{componentData.bridgeText}</p>
  </section>

  <!-- Section 2: stacked bars -->
  <section class={css({ position: "relative" })}>
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
        <StackedBars
          focusEra={barsState.focusEra}
          shares={barsScenario.shares}
          scenarioLabel={barsScenario.label}
          groups={componentData.groups}
          groupColors={componentData.groupColors} />
      </div>
    </div>

    <div class={css({
      position: "relative",
      marginTop: "-100vh",
      pointerEvents: "none",
    })}>
      {#each componentData.barsSteps as step, i}
        <div
          data-step
          data-section="bars"
          data-idx={i}
          class={css({
            minH: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: { base: "center", lg: "flex-start" },
            px: "4",
          })}>
          <p class={css({
            background: "background",
            p: "5",
            maxW: "360px",
            textStyle: "editorial",
            opacity: currentBars === i ? 1 : 0.45,
            transition: "opacity 400ms ease",
          })}>
            {step.text}
          </p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Outro -->
  <section class={css({
    maxW: "content.text",
    mx: "auto",
    py: "16",
    textStyle: "editorial",
  })}>
    <h3 class={css({ textStyle: "h2Serif", mb: "6" })}>{componentData.outro.title}</h3>
    {#each componentData.outro.paragraphs as p}
      <p class={css({ mb: "4" })}>{p}</p>
    {/each}
  </section>
</div>
