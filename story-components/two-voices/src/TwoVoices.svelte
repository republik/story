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

    let rafId = 0;

    function update() {
      const vh = window.innerHeight;
      const chapters = container!.querySelectorAll<HTMLElement>('[data-chapter]');

      chapters.forEach((chapterEl) => {
        const chapterRect = chapterEl.getBoundingClientRect();
        const wrappers = chapterEl.querySelectorAll<HTMLElement>('[data-page-wrapper]');

        wrappers.forEach((wrapper) => {
          const content = wrapper.querySelector<HTMLElement>('[data-page-content]');
          if (!content) return;

          // Cache content height while it's still in flow
          if (content.style.position !== 'fixed') {
            content.dataset.naturalHeight = String(content.offsetHeight);
          }
          const contentHeight = Number(content.dataset.naturalHeight) || 0;

          const wrapperRect = wrapper.getBoundingClientRect();

          if (wrapperRect.bottom < vh && contentHeight > 0) {
            // Page has scrolled past viewport bottom → pin it
            wrapper.style.minHeight = `${contentHeight}px`;

            const bottomOffset = Math.max(0, vh - chapterRect.bottom);
            content.style.position = 'fixed';
            content.style.bottom = `${bottomOffset}px`;
            content.style.left = `${wrapperRect.left}px`;
            content.style.width = `${wrapperRect.width}px`;
          } else {
            // Normal flow
            content.style.position = '';
            content.style.bottom = '';
            content.style.left = '';
            content.style.width = '';
            wrapper.style.minHeight = '';
          }
        });
      });
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll, {passive: true});
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  });
</script>

<div bind:this={container} class={css({ textStyle: "reading", fontSize: 'l' })}>
    {#if componentData}
        {#each componentData.chapters as chapter}
            <div data-chapter>
                {#each chapter.pages as page, i}
                    {#if i === 0 || page.speaker === 'Daniel'}
                        {@const speaker = voices.find((v) => v.key === page.speaker)}
                        {@const secondVoicePage = page.speaker === 'Daniel' && chapter.pages[i + 1]}
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
                                {/if}
                                <ChapterPage page={page} speaker={speaker}/>
                                {#if secondVoicePage}
                                    <ChapterPage page={secondVoicePage}
                                                 speaker={voices.find((v) => v.key === secondVoicePage.speaker)}/>
                                {/if}
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        {/each}
    {/if}
</div>
