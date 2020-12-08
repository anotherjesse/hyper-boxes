<script>
  import observeResize from 'svelte-observe-resize';

  export let item;
  export let handleDelete;
  export let handleMove;
  export let handleResize;
</script>

<style>
  #close {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 3px;
  }

  iframe {
    margin-top: 20px;
    width: 100%;
    height: 100%;
    margin: 10px;
  }
  .box {
    position: absolute;
    background: #ccc;
    resize: both;
    overflow: auto;
  }
</style>

<div
  class="box"
  style="width: {item.w}px; height: {item.h}px; top: {item.y}px; left: {item.x}px"
  draggable={true}
  use:observeResize
  on:resize={handleResize}
  on:dragstart={handleMove}>
  <div class="controls">
    move ...
    <span id="close" on:click={e => handleDelete(e)}>[x]</span>
  </div>
  <iframe src={item.url} />
</div>
