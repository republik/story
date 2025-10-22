<script lang="ts">
  import type { AnswersByCategory } from "./types.d.ts";
  import { onMount } from "svelte";
  import AnswersList from "./AnswersList.svelte";
  import { ChevronLeft } from "@lucide/svelte";
  import { css } from "@story/theme/css";

  interface Props {
    answersByCategory: AnswersByCategory;
    onClose: () => void;
  }

  let { answersByCategory, onClose }: Props = $props();
  let { category } = answersByCategory;

  let dialog: HTMLDialogElement | undefined = $state(); // HTMLDialogElement

  onMount(() => {
    const mainDocument = dialog?.ownerDocument || document;
    const body = mainDocument.body;

    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = originalOverflow;
    };
  });

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
  class={css({ background: 'hover', color: '#000000'})}
>

  <div
    class={css({ pt: 4, pb: 8, px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 3, background: 'hover' })}>
    <button title='close modal' onclick={() => dialog?.close()} class={css({ cursor: 'pointer' })}>
      <ChevronLeft size="24" class={css({ display: 'inline' })} />
      <span>Übersicht</span>
    </button>
    <h2
      class={css({ fontFamily: 'gtAmericaStandard', fontWeight: 700, textTransform: 'capitalize', fontSize: '3xl' })}>{category.name}</h2>
  </div>

  <AnswersList answersByCategory={answersByCategory} />
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