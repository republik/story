<script lang="ts">
  import type { Answer, AnswersByCategory, InputData, Respondent as RespondentType } from "./types.d.ts";
  import { css } from "@story/theme/css";
  import Respondent from "./Respondent.svelte";
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

<h1 class={css({ textStyle: 'h1Serif', mb: 4, mt: 12})}>{componentData?.question || 'No data :-('}</h1>
{#each (componentData?.answers || []) as { category, answers }}
  <div style:background={category.background} class={css({ mb: '4-8'})}>
    <h2
      class={css({ textStyle: 'h1Sans', p: '4-8', textTransform: 'capitalize', borderBottom: '1px solid rgba(0,0,0,0.1)'})}
      style:color={category.color}
      style:background={category.background}>
      {category.name}
    </h2>

    <div
      class={css({ p: '4-8', display: 'flex', flexDirection: 'column', gap: '4-8'})}>
      {#each answers as { respondent }}
        <Respondent respondent={respondent}
                    onClick={() => selected = { category, answers: bringFocusFirst(respondent, answers) }} />
      {/each}
    </div>
  </div>
{/each}
{#if selected}
  <AnswersOverlay answersByCategory={selected} onClose={() => selected = undefined } />
{/if}
