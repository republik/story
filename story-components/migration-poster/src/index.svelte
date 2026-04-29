<svelte:options customElement={{
    tag: 'migration-poster',
    shadow: 'open',
    props: {
      componentData: { type: 'Object', attribute: 'componentdata' }
    }
  }} />

<script lang="ts">
  import { onMount } from "svelte";
  import Poster from "./Poster.svelte";
  import type { InputData } from "./types.d.ts";
  import fontsCSS from "@story/theme/fonts.css?inline";
  import stylesCSS from "@story/theme/styles.css?inline";

  interface Props {
    componentData?: InputData;
  }

  let { componentData }: Props = $props();
  let shadowRoot = $host()?.shadowRoot;

  onMount(async () => {
    const ID = "story-components-theme";
    if (shadowRoot && !shadowRoot.getElementById(ID)) {
      const node = document.createElement("style");
      node.id = ID;
      const hostOverride = ":host{-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;color:#000;}";
      node.textContent = fontsCSS + stylesCSS + hostOverride;
      shadowRoot.appendChild(node);
    }
  });
</script>

<div id="story-component">
  {#if componentData}
    <Poster componentData={componentData} />
  {/if}
</div>
