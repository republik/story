<script lang="ts">
  import type { AnswersByCategory, CategoryName } from "./types.d.ts";
  import { onMount } from "svelte";
  import AnswersList from "./AnswersList.svelte";
  import { ChevronLeft } from "@lucide/svelte";
  import { css, cx } from "@story/theme/css";
  import { button } from "@story/theme/recipes";

  interface Props {
    answersByCategory: AnswersByCategory;
    categoryNames: CategoryName[];
    onClose: () => void;
    onNext: () => void;
    onSelect: (e?: HTMLSelectElement) => void;
  }

  let { answersByCategory, categoryNames, onClose, onNext, onSelect }: Props = $props();
  let { category } = $derived(answersByCategory);

  let dialog: HTMLDialogElement | undefined = $state(); // HTMLDialogElement

  onMount(() => {
    const mainDocument = dialog?.ownerDocument || document;
    const body = mainDocument.body;

    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    scrollUp();

    return () => {
      body.style.overflow = originalOverflow;
    };
  });

  function scrollUp() {
    dialog?.scrollTo({ top: 0 });
  }

  function handleClose() {
    const mainDocument = dialog?.ownerDocument || document;
    mainDocument.body.style.overflow = "";
    onClose();
  }
</script>

<dialog
  open
  bind:this={dialog}
  onclose={handleClose}
  onclick={(e) => { if (e.target === dialog) dialog.close(); }}
  class={css({ color: '#000000', transition: 'background 1s ease' })}
  id='answers-overlay'
  style:background={category?.color}
>

  <div
    class={css({ pt: 4, pb: 8, px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 3, transition: 'background 1s ease' })}
    style:background={category?.color}>
    <button title='close modal' onclick={() => dialog?.close()} class={css({ cursor: 'pointer' })}>
      <ChevronLeft size="24" class={css({ display: 'inline' })} />
      <span>Übersicht</span>
    </button>
    <select
      class={css({ fontWeight: 500 })}
      value={category?.name}
      onchange={(e) => {
          if (e.target instanceof HTMLSelectElement) {
            onSelect(e.target);
            scrollUp();
          }
      }}
    >
      {#each categoryNames as c}
        <option value={c}>
          {c}
        </option>
      {/each}
    </select>
  </div>

  <AnswersList answersByCategory={answersByCategory} />

  <div class={css({ p: 4, textAlign: 'center', pb: 12 })}>
    <button class={ cx(
        button({ variant: 'outline'})
      )} onclick={() => { onNext(); scrollUp();}}>Nächste Kategorie
    </button>
  </div>
</dialog>


<svelte:window on:keydown|preventDefault={(e) => {
    if (e.key === 'Escape') {
        dialog?.close();
    }
}} />

<style>
  dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    z-index: 100;
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  button {
    display: block;
  }
</style>