<script lang="ts">
  import type {InputData} from "./types.d.ts";
  import TwoVoicesMobile from "./TwoVoicesMobile.svelte";
  import TwoVoicesDesktop from "./TwoVoicesDesktop.svelte";
  import {css} from "@story/theme/css";

  interface Props {
    componentData?: InputData;
  }

  let {componentData}: Props = $props();
</script>

<div class={css({ textStyle: 'editorial'})}>
    {#if componentData}
        <div class={css({ display: "block", md: { display: "none"}})}>
            <TwoVoicesMobile componentData={componentData}/>
        </div>

        <div class={css({ display: "none", md: { display: "block"}})}>
            <TwoVoicesDesktop componentData={componentData}/>
        </div>
    {/if}
</div>
