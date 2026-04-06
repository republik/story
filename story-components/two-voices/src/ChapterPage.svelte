<script lang="ts">
  import { css } from "@story/theme/css";
  import type { Page, Voice } from "./types.d.ts";
  import ChapterPages from "./ChapterPages.svelte";

  interface Props {
    page: Page;
    voices: Voice[];
    nextPages?: Page[];
  }

  let { page, voices, nextPages }: Props = $props();

  let speaker = $derived(voices.find((v: Voice) => v.key === page.speaker));

</script>


<div
  class={css({
      px: "15px",
      py: "8",
      bottom: "0",
      position: "sticky",
  })}
  style:zindex={nextPages?.length || 0}
  style:background={speaker?.backgroundColor || '#ffffff'}
>
  <h3 class={css({ fontWeight: 700, mb: 4})}>
    {speaker?.name}
  </h3>
  {@html page.text}

  {#if nextPages && nextPages.length > 0 }
    <ChapterPages pages={nextPages} voices={voices} />
  {/if}
</div>
