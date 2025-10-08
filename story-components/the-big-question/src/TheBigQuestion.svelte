<script module lang="ts">
  export type BigQuestionDataType = {
    question: string;
    answers: {
      respondent: {
        name: string;
        description: string;
        avatarUrl: string;
      };
      text: string;
    }[];
  };
</script>

<script lang="ts">
  import {css} from '@story/theme/css'

  let {data}: { data: BigQuestionDataType } = $props();
</script>

<div class={css({ padding: 4, maxWidth: 'content.text' })}>
    <h1 class={css({ textStyle: 'h1Serif'})}>{data?.question || 'No data :-('}</h1>
    {#each data?.answers as { respondent, text }}
        <div class={css({ mt: 12})}>
            <img src={respondent.avatarUrl} alt={respondent.name} width="100" height="100" loading="lazy"/>
            <h2 class={css({ textStyle: 'h2Serif'})}>{respondent.name}</h2>
            <p class={css({ textStyle: 'serifRegular'})}>{@html respondent.description}</p>
            <h3 class={css({ textStyle: 'h3Sans', mt: 4})}>ANSWER:</h3>
            <div>{@html text}</div>
        </div>
    {/each}
</div>