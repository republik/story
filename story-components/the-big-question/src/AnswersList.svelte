<script lang="ts">
  import type { AnswersByCategory } from "./types.d.ts";
  import { css } from "@story/theme/css";

  interface Props {
    answersByCategory: AnswersByCategory;
  }

  let { answersByCategory }: Props = $props();

</script>

<div
  id="answers-list"
  class={css({ maxWidth: 'content.text', p: '4' })}>
  {#each answersByCategory.answers as { respondent, text }}
    <h2
      class={css({
          background: 'hover',
          fontFamily: 'gtAmericaStandard',
          fontWeight: 700,
          fontSize: '3xl',
          position: 'sticky',
          top: '55px',
          zIndex: 4,
          pt: 2,
          pb: 1,
          mb: 1,
        })}>
      {respondent.name}</h2>
    <p
      class={css({ textStyle: 'airy', pb: 12 })}>{@html respondent.description}</p>
    <img src={respondent.avatarUrl}
         alt={respondent.name}
         loading="lazy" />
    <div class={css({ textStyle: 'reading', pt: 6, pb: 12, '& p': { mb: 4 } })}>{@html text}</div>
  {/each}
</div>
