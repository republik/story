<script lang="ts">
  import { css } from "@story/theme/css";
  import type { Page, Voice } from "./types.d.ts";

  interface Props {
    page: Page;
    speaker: Voice | undefined;
    showFullName?: boolean;
  }

  let { page, speaker, showFullName }: Props = $props();
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
    pt: '12',
    pb: '24',
    background: 'var(--speaker-bg)',
    _dark: {
      background: 'var(--speaker-bg-dark)',
    },
    '& p': { mb: 4 },
    '& figure': { my: '6', mx: '0' },
    '& figure img': {
      display: 'block',
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
    },
    '& figcaption': {
      mt: '1',
      fontFamily: 'gtAmericaStandard',
      fontSize: 's',
      lineHeight: '1.2',
      color: 'text',
      textAlign: 'left',
    },
    '& figcaption p': { mb: '0' },
  })}
  >
    {#if speaker?.portraitUrl}
      <img
        src={speaker.portraitUrl}
        alt=''
        class={css({
                mb: "2",
                height: "64px",
                width: "64px",
                borderRadius: "100%",
              })}
      />
    {/if}
    <h4 class={css({ fontWeight: 700, mb: 4 })}>
      {showFullName ? speaker?.name : speaker?.key}
    </h4>
    {@html page.text}
  </div>
</div>
