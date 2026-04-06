<script lang="ts">
  import type { Page, Voice } from "./types.d.ts";
  import ChapterPage from "./ChapterPage.svelte";

  interface Props {
    pages: Page[];
    voices: Voice[];
  }

  let { pages, voices }: Props = $props();
</script>

<ChapterPage page={pages[0]} nextPages={pages.slice(1)} voices={voices} />

