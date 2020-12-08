<script>
  import debounce from 'lodash/debounce';
  import Box from './Box.svelte';
  import {updateFile} from './data.js';

  const id = () =>
    Math.random()
      .toString(36)
      .substr(2, 12);

  const randomNumberInRange = (min, max) =>
    Math.ceil(Math.random() * (max - min) + min);

  const newItem = url => ({
    url: 'about:blank',
    x: randomNumberInRange(0, 500),
    y: randomNumberInRange(0, 500),
    w: 200,
    h: 200,
    id: id(),
  });

  let items = [];

  function add(props) {
    const item = {
      ...newItem(),
      ...(props || {}),
    };

    items = [...items, item];
  }

  const update = (id, updates) => {
    items = items.map(item => (item.id === id ? {...item, ...updates} : item));
  };

  const remove = item => {
    items = items.filter(value => value.id !== item.id);
  };

  const moveStart = (event, item) => {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData(
      'text/xy',
      parseInt(style.getPropertyValue('left'), 10) -
        event.clientX +
        ',' +
        (parseInt(style.getPropertyValue('top'), 10) - event.clientY) +
        ',' +
        item.id
    );
  };

  const allowDrop = ev => {
    ev.preventDefault();
  };

  const drop = ev => {
    ev.preventDefault();

    var url = ev.dataTransfer.getData('text/uri-list');
    if (url) {
      return add({url, x: ev.clientX, y: ev.clientY});
    }
    const xyid = ev.dataTransfer.getData('text/xy');
    if (xyid) {
      const [x, y, id] = xyid.split(',');
      update(id, {
        x: parseInt(x, 10) + ev.clientX,
        y: parseInt(y, 10) + ev.clientY,
      });
    }
  };

  const resize = debounce((ev, item) => {
    update(item.id, {
      w: ev.target.clientWidth,
      h: ev.target.clientHeight,
    });
  }, 100);

  $: updateFile('/items.json', JSON.stringify(items));
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
  {#each items as item, i (item.id)}
    <Box
      bind:item
      handleResize={e => resize(e, item)}
      handleDelete={() => remove(item)}
      handleMove={e => moveStart(e, item)} />
  {/each}
</div>
