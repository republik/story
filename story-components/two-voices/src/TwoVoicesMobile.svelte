<script lang="ts">
  import { tick } from "svelte";
  import { css } from "@story/theme/css";
  import type { InputData } from "./types.d.ts";
  import ChapterHeader from "./ChapterHeader.svelte";
  import ChapterPageMobile from "./ChapterPageMobile.svelte";

  interface Props {
    componentData: InputData;
  }

  let { componentData }: Props = $props();
  let voices = $derived(componentData ? componentData.voices : []);
  let container: HTMLElement | undefined = $state();

  // Keep --h (used by sticky top) in sync with actual rendered height.
  // ResizeObserver fires on initial observe AND whenever size changes
  // (font load, image load, viewport resize — all covered).
  $effect(() => {
    if (!container || !componentData) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const page = entry.target as HTMLElement;
        page.style.setProperty("--h", page.offsetHeight + "px");
      }
    });

    tick().then(() => {
      container!.querySelectorAll<HTMLElement>("[data-page]").forEach(page => {
        ro.observe(page);
      });
    });

    return () => ro.disconnect();
  });
</script>

<div bind:this={container}>
  {#each componentData.chapters as chapter, chIdx}
    <div data-chapter>
      <ChapterHeader title={chapter.title} time={chapter.time} coverUrl={chapter.coverUrl} />
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
                      top: 0
                    })}
          style="top: calc(100vh - var(--h, 100vh));"
          style:z-index={i + 1}
        >
          <ChapterPageMobile
            page={page}
            speaker={speaker}
            showFullName={chIdx === 0 && i < voices.length}
          />
        </div>
      {/each}
    </div>
  {/each}
</div>
