<script>
  import Layers from "./lib/Layers.svelte";
</script>

<main>
  <div class="content">
    <h1>Rsbuild with Svelte</h1>
    <p>Start building amazing things with Rsbuild.</p>
    <Layers />
  </div>
</main>

<style lang="scss">
  .content {
    display: flex;
    min-height: 100vh;
    line-height: 1.1;
    text-align: center;
    flex-direction: column;
    justify-content: start;
    background-color: red;
  }

  .content h1 {
    font-size: 3.6rem;
    font-weight: 700;
  }

  .content p {
    font-size: 1.2rem;
    font-weight: 400;
    opacity: 0.5;
  }
</style>
