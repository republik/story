<script lang="ts">
  import type { Page, Voice } from "./types.d.ts";
  import ChapterPage from "./ChapterPage.svelte";
  import { css } from "@story/theme/css";

  interface Props {
    pages: Page[];
    voices: Voice[];
  }

  let { pages, voices }: Props = $props();
</script>

{#each pages as page, i}
  {#if i === 0}
  {/if}
  <div
    class={css({
      position: "sticky",
      bottom: "0",
      /* minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",*/
    })}
    style:z-index={pages.length - i}
  >
    <ChapterPage page={page} voices={voices} />
  </div>
{/each}
