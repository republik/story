<svelte:options customElement={{
  tag: 'tech-dependencies',
  shadow: 'open',
}} />

<script lang="ts">
  import { onMount } from 'svelte';
  import fontsCSS from '@story/theme/fonts.css?inline';
  import stylesCSS from '@story/theme/styles.css?inline';

  import Quadrant from './Quadrant.svelte';

  import rawData from './data.json';
  import type { Dataset } from './types.d.ts';

  const dataset = rawData as unknown as Dataset;

  let shadowRoot = $host()?.shadowRoot;
  let theme = $state<string | null>(null);

  onMount(() => {
    const ID = 'story-components-theme';
    if (shadowRoot && !shadowRoot.getElementById(ID)) {
      const node = document.createElement('style');
      node.id = ID;
      const hostOverride =
        ':host{display:block;box-sizing:border-box;contain:layout paint;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;}' +
        '.story-component{box-sizing:border-box;width:100%;}*,*::before,*::after{box-sizing:border-box;}';
      node.textContent = fontsCSS + stylesCSS + hostOverride;
      shadowRoot.appendChild(node);
    }

    const themeSource = document.querySelector('[data-theme]');
    if (themeSource) {
      theme = themeSource.getAttribute('data-theme');
      const observer = new MutationObserver(() => {
        theme = themeSource.getAttribute('data-theme');
      });
      observer.observe(themeSource, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    }
  });
</script>

<div class="story-component" data-theme={theme}>
  <Quadrant services={dataset.services} />
</div>
