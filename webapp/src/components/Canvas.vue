<template>
  <div class="canvas col-sm-8 col-md-8 col-lg-8">
    <div ref="canvas" class="block">
      <div
        v-for="{ id, position, type, content } in children"
        :ref="id"
        @mousedown="startDrag($event, id)"
        @mousemove="handleMoveChild($event, id)"
        @mouseup="stopDrag"
        :key="id"
        class="item"
        :style="{top: `${position.y}px`, left: `${position.x}px`}"
      >
      <input
        @click="handleRemoveCancasChild(id)"
        class="remove-button"
        type="button"
        value="remove"
      >
      <span v-if="type === 'text'">{{content}}</span>
      <img v-if="type === 'image'" :src="content" draggable="false"/>
      </div>
    </div>
    <input @click="handleClearCanvas" type="button" value="Clear Canvas">
  </div>
</template>

<script>
export default {
  name: 'canvas',
  props: ['children'],
  data() {
    return {
      offset: [0, 0],
      dragging: false,
    };
  },

  methods: {
    startDrag(event, id) {
      event.preventDefault();
      this.dragging = true;
      this.offset = [
        this.$refs[id][0].offsetLeft - event.clientX,
        this.$refs[id][0].offsetTop - event.clientY,
      ];
    },
    handleMoveChild(event, id) {
      event.preventDefault();
      if (this.dragging) {
        this.$emit('move-child', id, {
          position: {
            x: (event.clientX + this.offset[0]),
            y: (event.clientY + this.offset[1]),
          },
        });
      }
    },
    stopDrag() {
      this.dragging = false;
    },
    handleClearCanvas() {
      this.$emit('clear-canvas');
    },
    handleRemoveCancasChild(id) {
      this.$emit('remove-canvas-child', id);
    },
  },
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
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
  }

  .item {
    border: 1px solid transparent;
    cursor: move;
    position: absolute;
    user-select: none;
    max-width: 600px;
    max-height: 600px;
    padding: 15px;
    img {
    }

    & .remove-button {
      position: absolute;
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
      pointer-events: none;
      bottom: -22px;
      left: 0;
      right: 0;
    }

    &:hover {
      border-color: blue;
      .remove-button {
      opacity: 1;
      pointer-events: all;
    }}
  }

  .assetText {
    font-size: 24px;
  }
</style>
