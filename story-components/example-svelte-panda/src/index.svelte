<svelte:options customElement="example-svelte-panda"/>

<script lang="ts">
  const TRAFFIC_LIGHTS: string[] = ['red', 'orange', 'green']
  let lightIndex: number = $state(0)

  const light: string = $derived(TRAFFIC_LIGHTS[lightIndex])

  function nextLight(): void {
    lightIndex = (lightIndex + 1) % TRAFFIC_LIGHTS.length
  }
</script>

<button onclick={nextLight}>Next light</button>
<p>Light is: {light}</p>
<p>
    You must
    {#if light === "red"}
        <span>STOP</span>
    {:else if light === "orange"}
        <span>SLOW DOWN</span>
    {:else if light === "green"}
        <span>GO</span>
    {/if}
</p>