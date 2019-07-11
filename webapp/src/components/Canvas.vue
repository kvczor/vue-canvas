<template>
  <div class="canvas col-sm-8 col-md-8 col-lg-8">
    <div class="block">
      <!-- Add images and texts to here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'canvas',
};
</script>


<style lang="scss">
  .canvas {
    .block {
      position: relative;
      width: 600px; height: 600px;
      margin: 10px;
      border: 1px solid;
      box-shadow: 0px 0px 5px black;
    }
  }

  .item {
    border: 1px solid transparent;
    position: absolute;

    &.selected {
      border-color: blue;
    }
  }
</style>
