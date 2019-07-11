<template>
  <div class="app-container">
    <SidePanel
      :images="images"
      @clicked-upload-image="uploadFile"
      @clicked-add-text="addTextToCanvas"
    />
    <Canvas :children="children"/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

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
      children: [],
    };
  },
  created() {
    this.getImages();
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
    addTextToCanvas(text) {
      const newChild = {
        type: 'text',
        position: '',
        content: text,
      };
      this.children = [...this.children, newChild];
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
