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
    color: 'text',
    background: 'background',
    fontSize: 'l',
  })}
>
  <div class={css({
    px: '15px',
    pt: '16',
    pb: '12',
    transition: 'background-color 2s ease 0.2s',
    '& p': { mb: 4 },
    _dark: {
      display: 'none'
    }
  })}
       style:background-color={visible? speaker?.backgroundColor : 'inherit'}>
    <h4 class={css({ fontWeight: 700, mb: 4 })}>
      {speaker?.name}
    </h4>
    {@html page.text}
  </div>


  <div class={css({
    px: '15px',
    pt: '16',
    pb: '12',
    transition: 'background-color 2s ease 0.2s',
    '& p': { mb: 4 },
     display: 'none',
    _dark: {
      display: 'block'
    }
  })}
       style:background-color={visible? speaker?.backgroundColorDark : 'inherit'}>
    <h4 class={css({ fontWeight: 700, mb: 4 })}>
      {speaker?.name}
    </h4>
    {@html page.text}
  </div>
</div>
