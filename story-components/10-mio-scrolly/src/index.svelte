<svelte:options customElement={{
    tag: 'ten-mio-scrolly',
    shadow: 'open',
    props: {
      componentData: { type: 'Object', attribute: 'componentdata' }
    }
  }} />

<script lang="ts">
  import { onMount } from "svelte";
  import Scrolly from "./Scrolly.svelte";
  import type { InputData } from "./types.d.ts";
  import fontsCSS from "@story/theme/fonts.css?inline";
  import stylesCSS from "@story/theme/styles.css?inline";

  interface Props {
    componentData?: InputData;
  }

  let { componentData }: Props = $props();
  let shadowRoot = $host()?.shadowRoot;
  let theme = $state<string | null>(null);

  onMount(async () => {
    const ID = "story-components-theme";
    if (shadowRoot && !shadowRoot.getElementById(ID)) {
      const node = document.createElement("style");
      node.id = ID;
      // Panda's :host specificity hack (:host:not(#\#):not(#\#)) doesn't match
      // the host in Chrome's shadow DOM, so its preflight `:host { antialiased }`
      // wins and makes text render lighter than the surrounding document. Append
      // a plain :host override so the shadow tree inherits the browser default.
      const hostOverride = ":host{-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;}";
      node.textContent = fontsCSS + stylesCSS + hostOverride;
      shadowRoot.appendChild(node);
    }

    // Mirror data-theme from the closest ancestor into the shadow DOM so the
    // panda dark/light conditions ('[data-theme="dark"] &') resolve inside the
    // shadow root.
    const themeSource = document.querySelector("[data-theme]");
    if (themeSource) {
      theme = themeSource.getAttribute("data-theme");
      const observer = new MutationObserver(() => {
        theme = themeSource.getAttribute("data-theme");
      });
      observer.observe(themeSource, { attributes: true, attributeFilter: ["data-theme"] });
      return () => observer.disconnect();
    }
  });
</script>

<div class="story-component" data-theme={theme}>
  {#if componentData}
    <Scrolly componentData={componentData} />
  {/if}
</div>
