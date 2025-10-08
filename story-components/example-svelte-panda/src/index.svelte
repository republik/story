<svelte:options customElement={{
		tag: 'example-svelte-panda',
		shadow: 'open'}}/>

<script lang="ts">
  import {onMount} from 'svelte'
  import ActualComponent from './ActualComponent.svelte'

  // ADD STYLES TO COMPONENT'S SHADOW ROOT
  // (instead of the head of the main document)
  // there might be a better way to add the styles to the shadowroot, but i couldn't find it...
  onMount(async () => {
    const shadowRoot = $host()?.shadowRoot
    const ID = 'story-components-theme'

    if (shadowRoot && !shadowRoot.getElementById(ID)) {
      const theme = await import('./style.css?inline')

      const node = document.createElement('style')
      node.id = ID
      node.textContent = theme.default
      shadowRoot.appendChild(node)
    }
  })
</script>

<div id="custom-element-container">
    <ActualComponent/>
</div>
