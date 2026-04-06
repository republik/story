<script lang="ts">
  import type {InputData, Chapter, Page, Voice} from "./types.d.ts";
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

  // ── Pre-compute sections → sheets → parts ──────────────────────────

  type SheetPart =
    | { kind: 'header'; title: string; time: string; coverUrl?: string; speaker?: Voice }
    | { kind: 'page'; page: Page; speaker?: Voice };

  type Sheet = SheetPart[];
  type Section = Sheet[];

  function findVoice(key: string): Voice | undefined {
    return voices.find((v: Voice) => v.key === key);
  }

  function buildChapterSheets(chapter: Chapter): Sheet[] {
    const sheets: Sheet[] = [];

    for (let i = 0; i < chapter.pages.length; i++) {
      const page = chapter.pages[i];

      if (i === 0 || page.speaker === 'Daniel') {
        const sheet: Sheet = [];

        // First page of chapter gets its header
        if (i === 0) {
          sheet.push({
            kind: 'header',
            title: chapter.title,
            time: chapter.time,
            coverUrl: chapter.coverUrl,
            speaker: findVoice(page.speaker),
          });
        }

        sheet.push({ kind: 'page', page, speaker: findVoice(page.speaker) });

        // Daniel absorbs the following page as second voice
        if (page.speaker === 'Daniel' && chapter.pages[i + 1]) {
          const next = chapter.pages[i + 1];
          sheet.push({ kind: 'page', page: next, speaker: findVoice(next.speaker) });
        }

        sheets.push(sheet);
      }
    }

    return sheets;
  }

  let sections = $derived.by((): Section[] => {
    if (!componentData) return [];

    const chapters = componentData.chapters;
    const result: Section[] = [];
    let targetIdx = -1;

    for (let c = 0; c < chapters.length; c++) {
      const chapter = chapters[c];
      if (chapter.pages.length === 0) continue;

      const sheets = buildChapterSheets(chapter);
      if (sheets.length === 0) continue;

      const prevChapter = c > 0 ? chapters[c - 1] : null;
      const shouldMerge =
        prevChapter &&
        prevChapter.pages.length > 0 &&
        prevChapter.pages[prevChapter.pages.length - 1].speaker === chapter.pages[0].speaker &&
        targetIdx >= 0 &&
        result[targetIdx].length > 0;

      if (shouldMerge) {
        // Append first sheet of this chapter onto last sheet of current section
        const lastSheet = result[targetIdx][result[targetIdx].length - 1];
        const firstSheet = sheets.shift()!;
        lastSheet.push(...firstSheet);
        // Remaining sheets stay in the same section
        result[targetIdx].push(...sheets);
      } else {
        // Start a new section
        result.push(sheets);
        targetIdx = result.length - 1;
      }
    }

    return result;
  });

  // ── Scroll-driven pinning ──────────────────────────────────────────

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

          if (content.style.position !== 'fixed') {
            content.dataset.naturalHeight = String(content.offsetHeight);
          }
          const contentHeight = Number(content.dataset.naturalHeight) || 0;

          const wrapperRect = wrapper.getBoundingClientRect();

          if (wrapperRect.bottom < vh && contentHeight > 0) {
            wrapper.style.minHeight = `${contentHeight}px`;

            const bottomOffset = Math.max(0, vh - chapterRect.bottom);
            content.style.position = 'fixed';
            content.style.bottom = `${bottomOffset}px`;
            content.style.left = `${wrapperRect.left}px`;
            content.style.width = `${wrapperRect.width}px`;
          } else {
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
  {#each sections as section}
    <div data-chapter>
      {#each section as sheet, sheetIdx}
        <div
          data-page-wrapper
          class={css({ position: "relative" })}
          style:z-index={sheetIdx + 1}
        >
          <div data-page-content>
            {#each sheet as part}
              {#if part.kind === 'header'}
                <ChapterHeader
                  title={part.title}
                  time={part.time}
                  coverUrl={part.coverUrl}
                  speaker={part.speaker}
                />
              {:else}
                <ChapterPage page={part.page} speaker={part.speaker}/>
              {/if}
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>
