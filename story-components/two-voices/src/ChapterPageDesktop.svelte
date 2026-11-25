<script lang="ts">
  import { css } from "@story/theme/css";
  import type { Page, Voice } from "./types.d.ts";
  import { onMount } from "svelte";

  interface Props {
    page: Page;
    speaker: Voice | undefined;
    showFullName?: boolean;
    side?: "left" | "right";
  }

  let { page, speaker, showFullName, side = "left" }: Props = $props();
  let visible = $state(false);
  let el: HTMLElement | undefined = $state();

  onMount(() => {
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0, rootMargin: "-25% 0px -25% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={el}
  class={css({
    width: '100%',
    pb: '16',
    opacity: '0.4',
    transition: 'opacity 1s ease',
  })}
  style:opacity={visible ? '1' : '0.4'}
>
  <div
    style:--col-mr={side === 'left' ? 'auto' : '0'}
    style:--col-ml={side === 'left' ? '0' : 'auto'}
    class={css({
    '& > :not(figure)': {
      maxWidth: '434px',
      marginLeft: 'var(--col-ml)',
      marginRight: 'var(--col-mr)',
    },
    '& p': { mb: 4 },
    '& figure': {
      position: 'relative',
      maxWidth: 'calc(100vw - 30px)',
      width: '868px',
      mx: 'auto',
      my: '16',
    },
    '& figure img': {
      display: 'block',
      height: 'auto',
      width: '100%',
      objectFit: 'cover',
    },
    '& figcaption': {
      width: '100%',
      mt: '1',
      fontFamily: 'gtAmericaStandard',
      fontSize: 's',
      lineHeight: '1.2',
      color: 'text',
      textAlign: 'left',
    },
    '& figcaption p': { mb: '0' },
  })}>
    {#if speaker?.portraitUrl}
      <div>
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
      </div>
    {/if}
    <h4 class={css({ fontWeight: 700, mb: 4 })}>
      {showFullName ? speaker?.name : speaker?.key}
    </h4>
    {@html page.text}
  </div>

</div>
