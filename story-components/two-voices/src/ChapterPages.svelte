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
  <div
    class={css({
    position: "sticky",
    top: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    background: "white",
  })}
    style:z-index={i + 2}
  >
    <ChapterPage page={page} voices={voices} />
  </div>
{/each}
