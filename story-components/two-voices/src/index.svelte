<svelte:options customElement={{
    tag: 'two-voices',
    shadow: 'none',
    props: {
      componentData: { type: 'Object', attribute: 'componentdata' }
    }
  }}/>

<script lang="ts">
  import TwoVoices from "./TwoVoices.svelte";
  import type {InputData} from "./types.d.ts";

  import fontsCSS from "@story/theme/fonts.css?inline";
  import stylesCSS from "@story/theme/styles.css?inline";
  import {onMount} from "svelte";

  interface Props {
    componentData?: InputData;
  }

  let {componentData}: Props = $props();

  onMount(() => {
    const ID = "story-components-theme";

    if (!document.getElementById(ID)) {
      const node = document.createElement("style");
      node.id = ID;
      node.textContent = fontsCSS + stylesCSS;
      document.head.appendChild(node);
    }
  });
</script>

<div id="story-component">
    <TwoVoices componentData={componentData}/>
</div>




