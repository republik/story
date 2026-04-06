<script lang="ts">
  import type { InputData } from "./types.d.ts";
  import { css } from "@story/theme/css";
  import { onMount, tick } from "svelte";

  interface Props {
    componentData?: InputData;
  }

  let { componentData }: Props = $props();
  let container: HTMLElement | undefined = $state();
  let focusedPageId = $state<string | null>(null);
  let visibleChapters = $state<Set<number>>(new Set());

  function formatTime(time: number): string {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  onMount(() => {
    tick().then(() => {
      if (!container) return;

      // ── Track chapter visibility (for mobile fade-in) ──
      const chapterObserver = new IntersectionObserver(
        (entries) => {
          const next = new Set(visibleChapters);
          for (const entry of entries) {
            const idx = Number(entry.target.getAttribute("data-chapter-idx"));
            if (!isNaN(idx) && entry.isIntersecting) {
              next.add(idx);
            }
          }
          visibleChapters = next;
        },
        { threshold: 0.05 }
      );

      container
        .querySelectorAll("[data-chapter-idx]")
        .forEach((el) => chapterObserver.observe(el));
    });
  });
</script>

<div
  bind:this={container}
  class={css({
    fontFamily: "serif",
    lineHeight: 1.7,
    color: "#1a1a1a",
    maxWidth: "960px",
    mx: "auto",
  })}
>
  {#if componentData}
    {#each componentData.chapters as chapter, chapterIdx}
      <div
        data-chapter-idx={chapterIdx}
        class={css({
          transition: "opacity 0.8s ease-in-out",
          mb: { base: "0", md: "20" },
        })}
        style:opacity={visibleChapters.has(chapterIdx) ? 1 : 0}
      >
        <!-- ── Chapter header ── -->
        <div
          class={css({
            textAlign: "center",
            py: { base: "16", md: "24" },
            px: "6",
          })}
        >
          <div
            class={css({
              fontSize: { base: "13px", md: "15px" },
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#999",
              mb: "3",
              fontFamily: "sans-serif",
            })}
          >
            {formatTime(chapter.time)}
          </div>

          <h2
            class={css({
              fontSize: { base: "30px", md: "44px" },
              fontWeight: "700",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              mb: "6",
            })}
          >
            {chapter.title}
          </h2>

          {#if chapter.coverUrl}
            <img
              src={chapter.coverUrl}
              alt={chapter.title}
              class={css({
                maxWidth: "100%",
                maxHeight: { base: "280px", md: "480px" },
                width: "100%",
                objectFit: "cover",
                borderRadius: "4px",
                mt: "4",
              })}
            />
          {/if}
        </div>

        <!-- ── Pages ── -->
        {#each chapter.pages as page, pageIdx}
          {@const pageId = `${chapterIdx}-${pageIdx}`}
          {@const isFocused = focusedPageId === pageId}
          {@const isDaniel = page.speaker === "Daniel"}

          <div
            data-page-id={pageId}
            data-speaker={page.speaker}
            class="page-sheet"
            class:speaker-daniel={isDaniel}
            class:speaker-ronja={!isDaniel}
            class:is-focused={isFocused}
            class:is-unfocused={!isFocused}
          >
            <!-- Speaker label -->
            <div
              class="speaker-label"
              style:color={isDaniel ? "#2e7d32" : "#666"}
            >
              {page.speaker}
            </div>

            <!-- Text content (rendered as HTML) -->
            <div class="text-content">
              {@html page.text}
            </div>
          </div>
        {/each}
      </div>
    {/each}
  {/if}
</div>

<style>
  /* ── Page sheet base ── */
  .page-sheet {
    padding: 2.5rem 1.5rem;
    transition: opacity 0.5s ease;
  }

  /* ── Speaker label ── */
  .speaker-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 1rem;
    font-family: sans-serif;
  }

  /* ── Text content ── */
  .text-content {
    font-size: 17px;
    line-height: 1.8;
  }

  .text-content :global(p) {
    margin-bottom: 1rem;
  }

  .text-content :global(p:last-child) {
    margin-bottom: 0;
  }

  .text-content :global(a) {
    color: #1a73e8;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .text-content :global(a:hover) {
    color: #1557b0;
  }

  .text-content :global(em) {
    font-style: italic;
  }

  /* ────────────────────────────────────────────────────────────────────
     MOBILE (default)
     Each page is a full-viewport "sheet" with coloured backgrounds.
     ──────────────────────────────────────────────────────────────────── */
  .page-sheet {
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .speaker-daniel {
    background: #e8f5e9;
  }

  .speaker-ronja {
    background: #ffffff;
  }

  /* On mobile, all pages are fully opaque (no focus dimming) */
  .is-unfocused {
    opacity: 1;
  }

  /* ────────────────────────────────────────────────────────────────────
     DESKTOP (min-width: 768px)
     Airy layout, no backgrounds, left/right alignment, focus effect.
     ──────────────────────────────────────────────────────────────────── */
  @media (min-width: 768px) {
    .page-sheet {
      max-width: 520px;
      min-height: auto;
      background: transparent !important;
      padding: 3rem 2rem;
      border-radius: 2px;
    }

    .speaker-ronja {
      margin-right: auto;
      margin-left: 0;
    }

    .speaker-daniel {
      margin-left: auto;
      margin-right: 0;
    }

    .is-unfocused {
      opacity: 0.25;
    }

    .is-focused {
      opacity: 1;
    }

    .text-content {
      font-size: 19px;
    }
  }
</style>
