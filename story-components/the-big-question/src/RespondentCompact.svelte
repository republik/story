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


<div
  class={css({
    scrollSnapAlign: 'start',
    scrollSnapMarginLeft: '15px',
    '&:first-child': { ml: 'auto' },
    '&:last-child': { mr: 'auto' },
  })}
>
  <div class={css({
      cursor: 'pointer',
      p: 4,
      m: 2,
      width: '320px',
      minHeight: '440px',
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column',
      justifyContent: 'space-between',
    })}
       onclick={onClick}
       onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
       role="button"
       tabindex="0"
       style:background={category.color}
  >
    <p
      class={css({ fontFamily: 'gtAmericaStandard', fontWeight: 'medium', fontSize: '24px', lineHeight: '120%', letterSpacing: '-2%'})}>
      "{quote}"</p>
    <div>
      <div class={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4 })}>
        <div>
          <h2
            class={css({ textStyle: 'sansSerifBold', fontSize: '18px', lineHeight: '120%', letterSpacing: '-2%'})}>{respondent.name}</h2>
          <p
            class={css({ textStyle: 'sansSerifRegular', fontSize: '14px', lineHeight: '120%', letterSpacing: '-2%'})}>
            {respondent.title}
          </p>
        </div>
        <img class={css({ borderRadius: '84px', mx: 2})}
             src={respondent.avatarUrl}
             alt={respondent.name}
             height="84"
             width="84"
             loading="lazy" />
      </div>
      <p
        class={css({ textStyle: 'sansSerifRegular', fontSize: '14px', lineHeight: '120%', letterSpacing: '-2%', textDecoration: 'underline', opacity: 0.6 })}>
        Mehr lesen
      </p>
    </div>
  </div>
</div>
