<script lang="ts">
  import { css } from "@story/theme/css";
  import type { TitleProps } from "./types.d.ts";

  let { time, title, coverUrl }: TitleProps = $props();

</script>


<div
  class={css({
            textAlign: "center",
            py: { base: "16", md: "24" },
            px: "6",
            position: "relative",
            zIndex: 10,
            background: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          })}
>
  <div
    class={css({
              fontFamily: "gtAmericaStandard",
              fontSize: 'l',
              fontWeight: 500,
              letterSpacing: -0.02,
              mb: "2",
            })}
  >
    {time}
  </div>

  <h2
    class={css({ textStyle: "h1Serif", mb: "2",})}
  >
    {title}
  </h2>

  {#if coverUrl}
    <img
      src={coverUrl}
      alt={title}
      class={css({
                maxWidth: "100%",
                maxHeight: { base: "280px", md: "480px" },
                width: "100%",
                objectFit: "cover",
                mt: "4",
              })}
    />
  {/if}
</div>

