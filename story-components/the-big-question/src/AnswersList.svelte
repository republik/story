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
  class={css({ maxWidth: '480px', mx: 'auto', p: '4', lg: { maxWidth: '960px' } })}>
  {#each answersByCategory.answers as { respondent, text }}
    <div class={css({
      lg: {
         display: 'flex',
         flexDir: 'row',
         alignItems: 'start',
         gap: 16,
         py: 16,
        }
      })}>
      <div class={css({
      lg: {
         display: 'flex',
         flexDirection: 'column-reverse',
         position: 'sticky',
         top: '200px',
        }
      })}>
        <div>
          <h2
            style:background={answersByCategory.category.color}
            class={css({
          fontFamily: 'gtAmericaStandard',
          fontWeight: 700,
          fontSize: '3xl',
          zIndex: 4,
          pt: 2,
          pb: 1,
          mb: 1,
          transition: 'background 1s ease',
        })}>
            {respondent.name}
          </h2>
          <p
            class={css({ textStyle: 'airy', pb: 12 })}>{@html respondent.description}</p>
        </div>
        <img src={respondent.avatarUrl}
             alt={respondent.name}
             loading="lazy" />
      </div>
      <div
        class={css({
          textStyle: 'reading',
          pt: 6,
          pb: 12,
          '& p': {
            mb: 4
          },
          lg: {
            width: '570px',
            flexShrink: 0,
            mt: 2,
          }
        })}>{@html text}</div>
    </div>
  {/each}
</div>
