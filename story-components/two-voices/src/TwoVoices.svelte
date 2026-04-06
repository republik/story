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
        effectiveBottom: number;
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
          if (content.dataset.pinned !== '1') {
            content.dataset.naturalHeight = String(content.offsetHeight);
          }
          const contentHeight = Number(content.dataset.naturalHeight) || 0;
          const wrapperRect = wrapper.getBoundingClientRect();

          items.push({
            wrapper,
            content,
            contentHeight,
            // Use top + cached height as a stable threshold that doesn't
            // fluctuate when content toggles between static and fixed
            effectiveBottom: wrapperRect.top + contentHeight,
            wrapperLeft: Math.round(wrapperRect.left),
            wrapperWidth: Math.round(wrapperRect.width),
            chapterBottom: chapterRect.bottom,
          });
        });
      });

      // ── Phase 2: write only on state changes (no reads) ──
      for (const m of items) {
        const shouldPin = m.effectiveBottom < vh && m.contentHeight > 0;
        const isPinned = m.content.dataset.pinned === '1';

        if (shouldPin && !isPinned) {
          // Transition: static → fixed
          m.content.dataset.pinned = '1';
          m.wrapper.style.minHeight = `${m.contentHeight}px`;
          m.content.style.position = 'fixed';
          m.content.style.bottom = '0px';
          m.content.style.left = `${m.wrapperLeft}px`;
          m.content.style.width = `${m.wrapperWidth}px`;
        } else if (shouldPin && isPinned) {
          // Already pinned — only touch bottomOffset (for chapter exit)
          const bottomOffset = `${Math.round(Math.max(0, vh - m.chapterBottom))}px`;
          if (m.content.style.bottom !== bottomOffset) {
            m.content.style.bottom = bottomOffset;
          }
        } else if (!shouldPin && isPinned) {
          // Transition: fixed → static
          m.content.dataset.pinned = '';
          m.content.style.position = '';
          m.content.style.bottom = '';
          m.content.style.left = '';
          m.content.style.width = '';
          m.wrapper.style.minHeight = '';
        }
        // !shouldPin && !isPinned → nothing to do
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
                                />
                            {/if}
                            <ChapterPage page={page} speaker={speaker}/>
                        </div>
                    </div>
                {/each}
            </div>
        {/each}
    {/if}
</div>
