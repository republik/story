<script lang="ts">
  import type { Answer, AnswersByCategory, InputData, Respondent as RespondentType } from "./types.d.ts";
  import { css } from "@story/theme/css";
  import RespondentCompact from "./RespondentCompact.svelte";
  import AnswersOverlay from "./AnswersOverlay.svelte";

  interface Props {
    componentData?: InputData;
  }

  let { componentData }: Props = $props();
  let selected: AnswersByCategory | undefined = $state();

  function bringFocusFirst(focus: RespondentType, answers: Answer[]): Answer[] {
    const index = answers.findIndex(answer => answer.respondent.name === focus.name);
    const beforeFocus = answers.slice(0, index);
    const focusAndAfter = answers.slice(index);
    return [...focusAndAfter, ...beforeFocus];
  };
</script>

<div class={css({ background: 'hover', color: '#000000', my: '80px'})}>
  {#each (componentData?.answers || []) as { category, answers }}
    <h2
      class={css({ textStyle: 'serifTitle', fontSize: '2xl', letterSpacing: '-2%', lineHeight: 1.5, textAlign: 'center', p: '8-16', textTransform: 'capitalize'})}>
      {category.name}
    </h2>

    <div
      class={css({ display: 'flex', flexDirection: 'column', gap: '4-8', px: '8', pb: '12'})}>
      {#each answers as { respondent }}
        <RespondentCompact respondent={respondent}
                           onClick={() => selected = { category, answers: bringFocusFirst(respondent, answers) }} />
      {/each}
    </div>
  {/each}
  {#if selected}
    <AnswersOverlay answersByCategory={selected} onClose={() => selected = undefined } />
  {/if}
</div>

