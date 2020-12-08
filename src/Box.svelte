<script>
  export let item;
  export let handleDelete;
  export let handleMove;
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
  }
  .box {
    position: absolute;
    background: #ccc;
  }
  .controls {
    background: #888;
  }
</style>

<div
  class="box"
  style="width: {item.width}px; height: {item.height}px; top: {item.y}px; left: {item.x}px"
  draggable={true}
  on:dragstart={handleMove}>
  <div class="controls">
    move ...
    <span id="close" on:click={(e) => handleDelete(e)}>[x]</span>
  </div>
  <iframe src={item.src} />
</div>
