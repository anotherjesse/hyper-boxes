<script>
  import Box from "./Box.svelte";
  const id = () => "_" + Math.random().toString(36).substr(2, 9);

  const randomNumberInRange = (min, max) =>
    Math.ceil(Math.random() * (max - min) + min);

  const newItem = (src) => ({
    src,
    x: randomNumberInRange(0, 500),
    y: randomNumberInRange(0, 500),
    w: 200,
    h: 200,
    id: id(),
  });

  let items = [];

  function add(src, props) {
    const item = {
      ...newItem(src || "http://localhost:8000/0.html"),
      ...(props || {}),
    };

    items = [...items, item];
  }

  const move = (id, x, y) => {
    items = items.map((item) => (item.id === id ? { ...item, x, y } : item));
  };

  const remove = (item) => {
    items = items.filter((value) => value.id !== item.id);
  };

  const moveStart = (event, item) => {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData(
      "text/xy",
      parseInt(style.getPropertyValue("left"), 10) -
        event.clientX +
        "," +
        (parseInt(style.getPropertyValue("top"), 10) - event.clientY) +
        "," +
        item.id
    );
  };

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drop = (ev) => {
    ev.preventDefault();

    var url = ev.dataTransfer.getData("text/uri-list");
    if (url) {
      return add(url, { x: ev.clientX, y: ev.clientY });
    }
    const xyid = ev.dataTransfer.getData("text/xy");
    if (xyid) {
      const [x, y, id] = xyid.split(",");
      move(id, parseInt(x, 10) + ev.clientX, parseInt(y, 10) + ev.clientY);
    }
  };
</script>

<style>
  #page {
    background: #eee;
    position: fixed;
    width: 100%;
    height: 100%;
  }
</style>

<div id="page" on:drop={drop} on:dragover={allowDrop}>
  <button on:click={() => add()}>Add (random size)</button>

  {#each items as item, i (item.id)}
    <Box
      bind:item
      handleDelete={() => remove(item)}
      handleMove={(e) => moveStart(e, item)} />
  {/each}
</div>
