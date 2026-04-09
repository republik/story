<script lang="ts">
  import { css } from "@story/theme/css";
  import type { Page, Voice } from "./types.d.ts";
  import { onMount } from "svelte";

  interface Props {
    page: Page;
    speaker: Voice | undefined;
  }

  let { page, speaker }: Props = $props();
  let visible = $state(false);
  let el: HTMLElement | undefined = $state();

  onMount(() => {
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={el}
  class={css({
    width: '434px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    pb: '16',
    opacity: '0.4',
    transition: 'opacity 1s ease',
  })}
  style:opacity={visible ? '1' : '0.4'}
>
  <div class={css({
    '& p': { mb: 4 },
  })}>
    <h4 class={css({ fontWeight: 700, mb: 4 })}>
      {speaker?.name}
    </h4>
    {@html page.text}
  </div>

</div>
