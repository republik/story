<script lang="ts">
  import {css} from "@story/theme/css";
  import type {Page, Voice} from "./types.d.ts";

  interface Props {
    page: Page;
    speaker: Voice | undefined;
    showFullName?: boolean;
  }

  let {page, speaker, showFullName}: Props = $props();
</script>

<div
        class={css({
    minHeight: "100vh",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    background: 'background',
  })}
        style:--speaker-bg={speaker?.backgroundColor}
        style:--speaker-bg-dark={speaker?.backgroundColorDark}
>
    <div class={css({
    px: '15px',
    pt: '16',
    pb: '24',
    color: 'text',
    background: 'var(--speaker-bg)',
    _dark: {
      background: 'var(--speaker-bg-dark)',
    },
    '& p': { mb: 4 },
  })}
    >
        <h4 class={css({ fontWeight: 700, mb: 4 })}>
            {showFullName ? speaker?.name : speaker?.key}
        </h4>
        {@html page.text}
    </div>
</div>
