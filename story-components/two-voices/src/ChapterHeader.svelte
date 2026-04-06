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
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          })}
>
  <div
    class={css({
              fontSize: { base: "13px", md: "15px" },
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#999",
              mb: "3",
              fontFamily: "sans-serif",
            })}
  >
    {time}
  </div>

  <h2
    class={css({
              fontSize: { base: "30px", md: "44px" },
              fontWeight: "700",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              mb: "6",
            })}
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

