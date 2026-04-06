<script lang="ts">
  import type {InputData} from "./types.d.ts";
  import {css} from "@story/theme/css";
  import ChapterPage from "./ChapterPage.svelte";
  import ChapterHeader from "./ChapterHeader.svelte";
  import {tick} from "svelte";

  interface Props {
    componentData?: InputData;
  }

  let {componentData}: Props = $props();
  let voices = $derived(componentData ? componentData.voices : []);
  let container: HTMLElement | undefined = $state();

  // Measure each page wrapper's rendered height and store it as a CSS
  // custom property. The sticky `top` is then pure CSS:
  //   top: calc(100vh - var(--h))
  // This pins the wrapper's BOTTOM at the viewport bottom when stuck.
  // Re-runs whenever componentData changes (pages re-render).
  $effect(() => {
    // Touch componentData so the effect re-runs when it changes
    if (!container || !componentData) return;

    tick().then(() => {
      container!.querySelectorAll<HTMLElement>('[data-page]').forEach(page => {
        page.style.setProperty('--h', page.offsetHeight + 'px');
      });
    });
  });

  // Also re-measure on resize
  $effect(() => {
    if (!container) return;
    function onResize() {
      container!.querySelectorAll<HTMLElement>('[data-page]').forEach(page => {
        page.style.setProperty('--h', page.offsetHeight + 'px');
      });
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });
</script>

<div bind:this={container} class={css({ textStyle: "reading" })}>
  {#if componentData}
    {#each componentData.chapters as chapter}
      <div data-chapter>
        {#each chapter.pages as page, i}
          {@const speaker = voices.find((v) => v.key === page.speaker)}
          <div
            data-page
            class={css({
              position: "sticky",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
            })}
            style="top: calc(100vh - var(--h, 100vh));"
            style:z-index={i + 1}
          >
            {#if i === 0}
              <ChapterHeader title={chapter.title} time={chapter.time} coverUrl={chapter.coverUrl} />
            {/if}
            <ChapterPage page={page} speaker={speaker} />
          </div>
        {/each}
      </div>
    {/each}
  {/if}
</div>
