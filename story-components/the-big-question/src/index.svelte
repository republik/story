<svelte:options customElement={{
		tag: 'the-big-question',
		shadow: 'open', // should we disabled it?
		props: {
         componentData: { type: 'Object', attribute: 'componentdata'}
		}}}/>

<script lang="ts">
  import {onMount} from "svelte";
  import TheBigQuestion from "./TheBigQuestion.svelte";
  import type {InputData} from "./types.d.ts";
  import fontsCSS from '@story/theme/fonts.css?inline';
  import stylesCSS from '@story/theme/styles.css?inline';

  interface Props {
    componentData?: InputData;
  }

  let {componentData}: Props = $props();
  let shadowRoot = $host()?.shadowRoot;

  // ADD STYLES TO COMPONENT'S SHADOW ROOT
  // (instead of the head of the main document)
  // there might be a better way to add the styles to the shadowroot, but i couldn't find it...
  onMount(async () => {
    const ID = "story-components-theme";

    if (shadowRoot && !shadowRoot.getElementById(ID)) {
      const node = document.createElement("style");
      node.id = ID;
      node.textContent = fontsCSS + stylesCSS;
      shadowRoot.appendChild(node);
    }
  });
</script>

<TheBigQuestion componentData={componentData}/>
