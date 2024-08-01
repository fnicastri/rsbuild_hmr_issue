<script lang="ts">
  import { layerStore, layers } from "@/store";

  const counter = 0;

  function addLayer() {
    layerStore.add({
      id: self.crypto.randomUUID(),
      loaded: true,
    });
  }
  $: console.log($layerStore);
</script>

<div style="display: flex; flex-direction: column">
  <div>
    <button on:click={addLayer}>Add Layer</button>
  </div>
  <div>
    Layers: {$layerStore.length}!
  </div>
  <div
    style="display: flex; flex-direction: column; align-items: start;margin: 1rem auto;"
  >
    {#each $layerStore as layer}
      <div>===========&gt; {layer.id}</div>
    {/each}
  </div>
</div>

<style>
  button {
    background-color: white;
  }
</style>
