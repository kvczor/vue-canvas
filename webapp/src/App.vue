<template>
  <div class="app-container">
    <SidePanel :images="images" />
    <Canvas/>
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
