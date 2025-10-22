<script lang="ts">
  import type { Respondent as RespondentType } from "./types.d.ts";
  import { css } from "@story/theme/css";

  interface Props {
    respondent: RespondentType;
    onClick: () => void;
  }

  let { respondent, onClick }: Props = $props();
</script>


<div class={css({ cursor: 'pointer', display: 'block'})}
     onclick={onClick}
     onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
     role="button"
     tabindex="0">
  <img class={css({ mb: 2, maxWidth: '200px', margin: 'auto'})}
       src={respondent.avatarUrl}
       alt={respondent.name}
       height="100"
       loading="lazy" />
  <div class={css({ textAlign: 'left', mt: 4, mb: 12 })}>
    <h2 class={css({ textStyle: 'sansSerifBold', fontSize: 'xl'})}>{respondent.name}</h2>
    <p
      class={css({ textStyle: 'airy'})}>{@html (respondent.descriptionShort || respondent.description)}</p>
  </div>
</div>
