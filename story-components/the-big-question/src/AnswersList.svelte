<script lang="ts">
  import type { AnswersByCategory } from "./types.d.ts";
  import { css } from "@story/theme/css";

  interface Props {
    answersByCategory: AnswersByCategory;
  }

  let { answersByCategory }: Props = $props();

</script>

<div
  class={css({ maxWidth: 'content.text', p: '4-8', display: 'flex', flexDirection: 'column', gap: '4-8' })}>
  {#each answersByCategory.answers as { respondent, text }}
    <div>
      <img class={css({ borderRadius: 100, mb: 2})}
           src={respondent.avatarUrl} alt={respondent.name}
           width="100"
           height="100"
           loading="lazy" />
      <h2 class={css({ py: 2, textStyle: 'h3Sans', position: 'sticky', top: '105px', zIndex: 1 })}
          style:background={answersByCategory.category.background}>{respondent.name}</h2>
      <p
        class={css({ textStyle: 'sans', opacity: 0.5, maxWidth: '350px', pb: 4, '& a': { textDecoration: 'underline'}})}>{@html respondent.description}</p>
      <div class={css({ textStyle: 'serif', '& p': {pb: 4 }, '& a': { textDecoration: 'underline'}})}>{@html text}</div>
    </div>
  {/each}
</div>
