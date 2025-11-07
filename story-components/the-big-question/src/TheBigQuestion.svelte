<script lang="ts">
  import type { Answer, AnswersByCategory, CategoryName, InputData, Respondent as RespondentType } from "./types.d.ts";
  import { css } from "@story/theme/css";
  import RespondentCompact from "./RespondentCompact.svelte";
  import AnswersOverlay from "./AnswersOverlay.svelte";

  interface Props {
    componentData?: InputData;
  }

  let { componentData }: Props = $props();
  let selected: AnswersByCategory | undefined = $state();
  let lastCategoryName: CategoryName | undefined = $state();
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

  function findPreviousCategoryName(currentCategoryName: CategoryName): CategoryName | undefined {
    if (!selected || !categoryNames) return;

    const currentIndex = categoryNames.indexOf(currentCategoryName);
    return categoryNames.at(currentIndex - 1);
  }

</script>

<div class={css({
    color: '#000000',
    mb: 16,
    margin: 'auto',
  })}>
  {#each (componentData?.answers || []) as { category, answers }}
    <h2
      id={category.name}
      class={css({
          textStyle: 'sansSerifBold',
          fontSize: '24px',
          letterSpacing: '-2%',
          lineHeight: 1.5,
          textAlign: 'center',
          pt: '16',
          pb: '8',
          color: 'var(--color-text)',
        })}>
      {category.name}
    </h2>

    <div
      class={css({
      display: 'flex',
      overflowX: 'scroll',
      scrollSnapType: 'x mandatory',
      pb: 4,
    })}>
      {#each answers as { respondent, quote }}
        <RespondentCompact respondent={respondent}
                           quote={quote}
                           category={category}
                           onClick={() => {
                             selected = { category, answers: bringFocusFirst(respondent, answers)};
                             lastCategoryName = findPreviousCategoryName(category.name);
                           }} />
      {/each}
    </div>
  {/each}
  {#if selected}
    <AnswersOverlay
      categoryNames={categoryNames}
      answersByCategory={selected}
      onClose={() => selected = undefined }
      onNext={loadNextCategory}
      onSelect={selectCategory}
      isLast={selected.category.name === lastCategoryName } />
  {/if}
</div>

