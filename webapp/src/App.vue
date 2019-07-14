<template>
  <div class="app-container">
    <SidePanel
      :images="images"
      @clicked-upload-image="uploadFile"
      @clicked-add-asset="handleAddChildToCanvas"
    />
    <Canvas
      :children="canvasChildren"
      @move-child="handleUpdateCanvasChild"
      @clear-canvas="handleClearCanvasChildren"
      @remove-canvas-child="handleRemoveCanvasChild"
    />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import uniqid from 'uniqid';

import SidePanel from './components/SidePanel.vue';
import Canvas from './components/Canvas.vue';

import { value, watch, onMounted, onCreated } from 'vue-function-api';

export default {
  name: 'app',
  components: {
    SidePanel,
    Canvas,
  },
  setup() {
    const images = value([]);
    const canvasChildren = value([]);

    const getImages = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/images/');
        images.value = data;
      } catch (e) {
        console.error(e);
      }
    };

    const uploadFile = async (file) => {
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
        getImages();
      } catch (e) {
        console.error(e);
      }
    };

    const rehydrateCanvasChildren = () => {
      const rehydratedCanvasChildren = JSON.parse(localStorage.getItem('canvasChildren'));
      if (rehydratedCanvasChildren) {
        canvasChildren.value = rehydratedCanvasChildren;
      }
    };

    const handleAddChildToCanvas = (canvasChild) => {
      const newCanvasChild = {
        ...canvasChild,
        id: uniqid(),
        position: {
          x: 0,
          y: 0,
        },
      };
      canvasChildren.value = [...canvasChildren.value, newCanvasChild];
    };

    const handleUpdateCanvasChild = (childId, updatedProperties) => {
      canvasChildren.value = canvasChildren.value.map(item => (
        item.id === childId
          ? { ...item, ...updatedProperties }
          : item));
    };

    const handleClearCanvasChildren = () => {
      canvasChildren.value = [];
    };

    const handleRemoveCanvasChild = (assetId) => {
      canvasChildren.value = canvasChildren.value.filter(({ id }) => id !== assetId);
    };

    onCreated(() => {
      getImages();
    });

    onMounted(() => {
      rehydrateCanvasChildren();
    });

    watch(
      () => canvasChildren.value,
      (newVal) => {
        console.log(newVal);
        console.log(newVal.value);
        localStorage.setItem('canvasChildren', JSON.stringify(newVal));
      },
    );

    return {
      images,
      canvasChildren,
      getImages,
      uploadFile,
      handleAddChildToCanvas,
      handleUpdateCanvasChild,
      handleClearCanvasChildren,
      handleRemoveCanvasChild,
    };
  },
  // watch: {
  //   canvasChildren(newVal) {
  //     localStorage.setItem('canvasChildren', JSON.stringify(newVal));
  //   },
  // },
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
