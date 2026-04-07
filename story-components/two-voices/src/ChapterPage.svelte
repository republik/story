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
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={el}
  class={css({
    minHeight: "100vh",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    background: 'white',
  })}

>
  <div class={css({
    px: '15px',
    pt: '6',
    pb: '2',
    transition: 'background-color 2s ease',
    '& p': { mb: 4 },
  })}
       style:background-color={visible ? (speaker?.backgroundColor || '#ffffff') : '#ffffff'}>
    <h3 class={css({ fontWeight: 700, mb: 4 })}>
      {speaker?.name}
    </h3>
    {@html page.text}
  </div>
</div>
