<script lang="ts">
  import type { Answer, AnswersByCategory, CategoryName, InputData, Respondent as RespondentType } from "./types.d.ts";
  import { css, cx } from "@story/theme/css";
  import RespondentCompact from "./RespondentCompact.svelte";
  import AnswersOverlay from "./AnswersOverlay.svelte";
  import { button } from "@story/theme/recipes";

  interface Props {
    componentData?: InputData;
    shadowRoot: ShadowRoot | null;
  }

  let { componentData, shadowRoot }: Props = $props();
  let selected: AnswersByCategory | undefined = $state();
  let categoryNames = $derived(
    componentData ? componentData.answers.map((item) => item.category.name) : []
  );

  function bringFocusFirst(focus: RespondentType, answers: Answer[]): Answer[] {
    const index = answers.findIndex(answer => answer.respondent.name === focus.name);
    const beforeFocus = answers.slice(0, index);
    const focusAndAfter = answers.slice(index);
    return [...focusAndAfter, ...beforeFocus];
  };

  function loadNextCategory(): void {
    if (!selected || !componentData) return;

    const currentIndex = componentData.answers.findIndex(
      (item) => item.category.name === selected?.category.name
    );

    const nextIndex = (currentIndex + 1) % componentData.answers.length;
    selected = componentData.answers[nextIndex];
  }

  function selectCategory(e?: HTMLSelectElement): void {
    if (!componentData || !e) return;

    const categoryName = e.value;
    const selectedCategory = componentData.answers.find(
      (item) => item.category.name === categoryName
    );

    if (selectedCategory) {
      selected = selectedCategory;
    }
  }

  function scrollToCategory(name: CategoryName): void {
    const element = shadowRoot?.getElementById(name);
    console.log(shadowRoot);
    console.log("scrolling to element:", element);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

</script>

<div class={css({
    color: '#000000',
    mb: '80px',
    maxWidth: 'content.text',
    margin: 'auto'
  })}>
  <div class={css({
    my: '40px',
  })}>
    {#each categoryNames as c}
      <button
        class={ cx(
        button({ variant: 'outline', size: 'default' }),
        css({ mr: 4, mb: 4 })
      )}
        onclick={() => scrollToCategory(c)}>{c}
      </button>
    {/each}
  </div>
  <div class={css({
    background: 'hover',
  })}>
    {#each (componentData?.answers || []) as { category, answers }}
      <h2
        id={category.name}
        class={css({
          textStyle: 'serifTitle',
          fontSize: '2xl',
          letterSpacing: '-2%',
          lineHeight: 1.5,
          textAlign: 'center',
          p: '8-16'
        })}>
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
      <AnswersOverlay
        categoryNames={categoryNames}
        answersByCategory={selected}
        onClose={() => selected = undefined }
        onNext={loadNextCategory}
        onSelect={selectCategory} />
    {/if}
  </div>
</div>

