<script lang="ts">
  import {css, cx} from '@story/theme/css'
  import {button} from '@story/theme/recipes'

  const TRAFFIC_LIGHTS: string[] = ['red', 'orange', 'green']
  let lightIndex: number = $state(0)

  const light: string = $derived(TRAFFIC_LIGHTS[lightIndex])

  function nextLight(): void {
    lightIndex = (lightIndex + 1) % TRAFFIC_LIGHTS.length
  }
</script>

<div class={css({ padding: 4})}>
    <button class={cx(
        button()
      )} onclick={nextLight}>Next light
    </button>
    <p class={css({ textStyle: 'h3Serif', pt: 4})}>Light is: {light}</p>
    <p class={css({ textStyle: 'airy', pt: 2})}>
        You must
        {#if light === "red"}
            <span style="color: red;">STOP</span>
        {:else if light === "orange"}
            <span style="color: orange;">SLOW DOWN</span>
        {:else if light === "green"}
            <span style="color: green;">GO</span>
        {/if}
    </p>
</div>