<script lang="ts">
  import { css } from "@story/theme/css";
  import type { Page, Voice } from "./types.d.ts";

  interface Props {
    page: Page;
    voices: Voice[];
  }

  let { page, voices }: Props = $props();

  let speaker = $derived(voices.find((v: Voice) => v.key === page.speaker));
</script>

<div
  class={css({
    px: "15px",
    py: "8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  })}
  style:background={speaker?.backgroundColor || '#ffffff'}
>
  <h3 class={css({ fontWeight: 700, mb: 4 })}>
    {speaker?.name}
  </h3>
  {@html page.text}
</div>
