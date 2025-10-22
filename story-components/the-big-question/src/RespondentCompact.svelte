<script lang="ts">
  import type { Category, Respondent as RespondentType } from "./types.d.ts";
  import { css } from "@story/theme/css";

  interface Props {
    respondent: RespondentType;
    category: Category;
    quote: string;
    onClick: () => void;
  }

  let { respondent, category, quote, onClick }: Props = $props();
</script>


<div class={css({ cursor: 'pointer', display: 'block', p: 4})}
     onclick={onClick}
     onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
     role="button"
     tabindex="0"
     style:background={category.color}>
  <p
    class={css({ textStyle: 'sansSerifBold', fontSize: '2xl'})}>"{quote}"</p>
  <img class={css({ mb: 2, borderRadius: '84px', margin: 'auto'})}
       src={respondent.avatarUrl}
       alt={respondent.name}
       height="84"
       width="84"
       loading="lazy" />
  <div class={css({ textAlign: 'left', mt: 4, mb: 12 })}>
    <h2 class={css({ textStyle: 'sansSerifBold', fontSize: 'xl'})}>{respondent.name}</h2>
    <p
      class={css({ textStyle: 'airy'})}>{@html (respondent.descriptionShort || respondent.description)}</p>
  </div>
</div>
