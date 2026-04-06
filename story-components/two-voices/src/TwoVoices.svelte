<script lang="ts">
  import type {InputData} from "./types.d.ts";
  import {css} from "@story/theme/css";
  import ChapterPage from "./ChapterPage.svelte";
  import ChapterHeader from "./ChapterHeader.svelte";
  import {onMount} from "svelte";

  interface Props {
    componentData?: InputData;
  }

  let {componentData}: Props = $props();
  let voices = $derived(componentData ? componentData.voices : []);
  let container: HTMLElement | undefined = $state();

  onMount(() => {
    if (!container) return;

    function onScroll() {
      const vh = window.innerHeight;
      const chapters = container!.querySelectorAll<HTMLElement>('[data-chapter]');

      // ── Phase 1: read all measurements (no writes) ──
      const items: Array<{
        wrapper: HTMLElement;
        content: HTMLElement;
        contentHeight: number;
        wrapperBottom: number;
        wrapperLeft: number;
        wrapperWidth: number;
        chapterBottom: number;
      }> = [];

      chapters.forEach((chapterEl) => {
        const chapterRect = chapterEl.getBoundingClientRect();
        const wrappers = chapterEl.querySelectorAll<HTMLElement>('[data-page-wrapper]');

        wrappers.forEach((wrapper) => {
          const content = wrapper.querySelector<HTMLElement>('[data-page-content]');
          if (!content) return;

          // Cache height while content is still in flow
          if (content.style.position !== 'fixed') {
            content.dataset.naturalHeight = String(content.offsetHeight);
          }

          const wrapperRect = wrapper.getBoundingClientRect();

          items.push({
            wrapper,
            content,
            contentHeight: Number(content.dataset.naturalHeight) || 0,
            wrapperBottom: wrapperRect.bottom,
            wrapperLeft: wrapperRect.left,
            wrapperWidth: wrapperRect.width,
            chapterBottom: chapterRect.bottom,
          });
        });
      });

      // ── Phase 2: write all styles (no reads) ──
      for (const m of items) {
        if (m.wrapperBottom < vh && m.contentHeight > 0) {
          m.wrapper.style.minHeight = `${m.contentHeight}px`;
          const bottomOffset = Math.max(0, vh - m.chapterBottom);
          m.content.style.position = 'fixed';
          m.content.style.bottom = `${bottomOffset}px`;
          m.content.style.left = `${m.wrapperLeft}px`;
          m.content.style.width = `${m.wrapperWidth}px`;
        } else {
          m.content.style.position = '';
          m.content.style.bottom = '';
          m.content.style.left = '';
          m.content.style.width = '';
          m.wrapper.style.minHeight = '';
        }
      }
    }

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll, {passive: true});
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  });
</script>

<div bind:this={container} class={css({ textStyle: "reading" })}>
    {#if componentData}
        {#each componentData.chapters as chapter}
            <div data-chapter>
                {#each chapter.pages as page, i}
                    {@const speaker = voices.find((v) => v.key === page.speaker)}
                    <div
                            data-page-wrapper
                            class={css({ position: "relative" })}
                            style:z-index={i + 1}
                    >
                        <div data-page-content>
                            {#if i === 0}
                                <ChapterHeader
                                        title={chapter.title}
                                        time={chapter.time}
                                        coverUrl={chapter.coverUrl}
                                        speaker={speaker}
                                />
                            {:else}
                                <ChapterPage page={page} speaker={speaker}/>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        {/each}
    {/if}
</div>
