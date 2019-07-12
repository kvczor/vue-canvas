<template>
  <div class="app-container">
    <SidePanel
      :images="images"
      @clicked-upload-image="uploadFile"
      @clicked-add-text="addAssetToCanvas"
    />
    <Canvas
      :children="canvasChildren"
      @move-child="handleUpdateCanvasChild"
      @clear-canvas="handleEmptyCanvasChildren"
      @remove-canvas-child="handleRemoveCanvassChild"
    />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import uniqid from 'uniqid';

import SidePanel from './components/SidePanel.vue';
import Canvas from './components/Canvas.vue';

export default {
  name: 'app',
  components: {
    SidePanel,
    Canvas,
  },
  data() {
    return {
      images: [],
      canvasChildren: [],
    };
  },
  created() {
    this.getImages();
  },
  mounted() {
    this.rehydrateCanvasChildren();
  },
  watch: {
    canvasChildren(newVal) {
      localStorage.setItem('canvasChildren', JSON.stringify(newVal));
    },
  },
  methods: {
    async getImages() {
      try {
        const { data: images } = await axios.get('http://localhost:8000/images/');
        this.images = images;
      } catch (e) {
        console.error(e);
      }
    },
    async uploadFile(file) {
      const formData = new FormData();
      formData.append('upload', file);
      try {
        await axios.post('http://localhost:8000/uploads',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        this.getImages();
      } catch (e) {
        console.error(e);
      }
    },
    rehydrateCanvasChildren() {
      const rehydratedCanvasChildren = JSON.parse(localStorage.getItem('canvasChildren'));
      if (rehydratedCanvasChildren) {
        this.canvasChildren = rehydratedCanvasChildren;
      }
    },
    addAssetToCanvas(canvasAsset) {
      const newCanvasChild = {
        ...canvasAsset,
        id: uniqid(),
        position: {
          x: 0,
          y: 0,
        },
      };
      this.canvasChildren = [...this.canvasChildren, newCanvasChild];
    },
    handleUpdateCanvasChild(childId, updatedProperties) {
      this.canvasChildren = this.canvasChildren.map(item => (
        item.id === childId
          ? { ...item, ...updatedProperties }
          : item));
    },
    handleEmptyCanvasChildren() {
      this.canvasChildren = [];
    },
    handleRemoveCanvassChild(assetId) {
      this.canvasChildren = this.canvasChildren.filter(({ id }) => id !== assetId);
    },
  },
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  .app-container {
    height: 100%;
  }
</style>
