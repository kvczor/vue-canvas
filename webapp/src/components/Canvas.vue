<template>
  <div class="canvas col-sm-8 col-md-8 col-lg-8">
    <div class="block">
      <!--TODO: Dont use index for key-->
      <div v-for="(child, index) in children" :key="index" class="item">
        <span v-if="child.type === 'text'" class="assetText">{{child.content}}</span>
        <img v-if="child.type === 'image'" :src="child.content" class="img-rounded" />
      </div>
      <!-- Add images and texts to here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'canvas',
  props: ['children'],
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
    cursor: move;
    position: absolute;
    user-select: none;

    &.selected {
      border-color: blue;
    }
  }

  .assetText {
    font-size: 24px;
  }
</style>
