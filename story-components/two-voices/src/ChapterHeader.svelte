<script lang="ts">
  import { css } from "@story/theme/css";
  import type { TitleProps } from "./types.d.ts";

  let { time, title, coverUrl }: TitleProps = $props();

</script>


<div
  class={css({
            textAlign: "center",
            pt: "8",
            pb: "16",
            px: "4",
            position: "sticky",
            top: "0",
            md: {
              position: "initial",
            }
          })}
>
  <h3
    class={css({
              textStyle: "h3Sans",
              fontWeight: "normal",
              mb: "3",
            })}
  >
    {time}
  </h3>

  <h2
    class={css({ textStyle: "h1Serif", mb: "6",})}
  >
    {title}
  </h2>

  {#if coverUrl}
    <img
      src={coverUrl}
      alt={title}
      class={css({
                mx: "auto",
                height: "360px",
                width: "240px",
                objectFit: "cover",
                backgroundColor: "#D8E4D6"
              })}
    />
  {/if}
</div>

