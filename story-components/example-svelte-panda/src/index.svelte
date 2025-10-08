<svelte:options customElement={{
		tag: 'example-svelte-panda',
		shadow: 'open'}}/>

<script lang="ts">

  import {css} from '@story/theme/css'
  import {onMount} from 'svelte'

  onMount(async () => {
    const shadowRoot = $host()?.shadowRoot


    console.log('shadowRoot', shadowRoot)

    if (shadowRoot && !shadowRoot.querySelector('#story-theme-styles')) {
      const fonts = await import('@story/theme/fonts.css?inline')
      const styles = await import('@story/theme/styles.css?inline')

      const font = document.createElement('style')
      font.id = 'story-theme-fonts'
      font.textContent = fonts.default
      shadowRoot.appendChild(font)

      const style = document.createElement('style')
      style.id = 'story-theme-styles'
      console.log(styles.default)
      //style.textContent = styles.default.replace(/:not\(#\\#\):not\(#\\#\)/g, ':not(#\\#)')
      style.textContent = styles.default
      shadowRoot.appendChild(style)

      // todo: remove on unmount
    }
  })

  const TRAFFIC_LIGHTS: string[] = ['red', 'orange', 'green']
  let lightIndex: number = $state(0)

  const light: string = $derived(TRAFFIC_LIGHTS[lightIndex])

  function nextLight(): void {
    lightIndex = (lightIndex + 1) % TRAFFIC_LIGHTS.length
  }
</script>

<div id="custom-element-container">
    <button onclick={nextLight}>Next light</button>
    <p class={css({ fontSize : '2xl'})}>Light is: {light}</p>
    <p class={css({ textStyle: 'airy'})}>
        You must
        {#if light === "red"}
            <span>STOP</span>
        {:else if light === "orange"}
            <span>SLOW DOWN</span>
        {:else if light === "green"}
            <span>GO</span>
        {/if}
    </p>
</div>
