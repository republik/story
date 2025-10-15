<script lang="ts">
  import type { Respondent as RespondentType } from "./types.d.ts";
  import { css } from "@story/theme/css";

  interface Props {
    respondent: RespondentType;
    onClick?: () => void;
  }

  let { respondent, onClick }: Props = $props();
</script>


<button class={css({ textAlign: 'left', cursor: 'pointer', display: 'block'})} onclick={onClick}>
  <img class={css({ borderRadius: 100, mb: 2})} src={respondent.avatarUrl} alt={respondent.name} width="100"
       height="100"
       loading="lazy" />
  <h2 class={css({ textStyle: 'h3Sans'})}>{respondent.name}</h2>
  <p
    class={css({ textStyle: 'sansSerifRegular', opacity: 0.5, maxWidth: '350px'})}>{@html respondent.description}</p>
</button>
