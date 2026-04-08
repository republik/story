<script lang="ts">
  import { css } from "@story/theme/css";
  import type { Page, Voice } from "./types.d.ts";

  interface Props {
    page: Page;
    speaker: Voice | undefined;
  }

  let { page, speaker }: Props = $props();
</script>

<div
  class={css({
    minHeight: "100vh",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    color: 'text',
  })}
  style:--tv-speaker-bg={speaker?.backgroundColor}
  style:--tv-speaker-bg-dark={speaker?.backgroundColorDark}
>
  <div class={css({
    px: '15px',
    pt: '16',
    pb: '12',
    background: 'var(--tv-speaker-bg)',
    '& p': { mb: 4 },
    _dark: {
      background: 'var(--tv-speaker-bg-dark)',
    }
  })}
  >
    <h4 class={css({ fontWeight: 700, mb: 4 })}>
      {speaker?.name}
    </h4>
    {@html page.text}
  </div>
</div>
