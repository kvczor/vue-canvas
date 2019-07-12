<!--suppress ALL -->
<template>
  <div class="sidepanel col-sm-2 col-md-2 col-lg-2">
    <div class="form">
      <h3>Form</h3>
      <input
        ref="imageUploadField"
        @change="handleFileToUploadUpdate"
        type="file"
        class="form-control"
        placeholder="Upload Your Images"
        name="upload"
      >
      <button @click="onUploadFileClick" id="submit" class="btn btn-default">upload</button>
    </div>
    <hr />
    <div class="assets">
      <h3>Assets</h3>
      <div class="text">
        <h4>Text</h4>
        <input
          @keydown.enter="handleAddToCanvas('text', textToBeAdded)"
          type="text"
          v-model="textToBeAdded"
        >
        <button
          @click="handleAddToCanvas('text', textToBeAdded)"
          id="addText"
          class="btn btn-default">
            Add Text
        </button>
      </div>
      <div class="image">
        <h4>Images</h4>
        <ul class="list-unstyled">
           <li v-for="imageUrl in images" :key="imageUrl">
             <img @click="handleAddToCanvas('image', imageUrl)" :src="imageUrl" />
           </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'side-panel',
  props: ['images'],
  data() {
    return {
      imageToUpload: '',
      textToBeAdded: 'default text',
    };
  },
  methods: {
    handleFileToUploadUpdate() {
      // eslint-disable-next-line prefer-destructuring
      this.imageToUpload = this.$refs.imageUploadField.files[0];
    },
    onUploadFileClick() {
      this.$emit('clicked-upload-image', this.imageToUpload);
    },
    handleAddToCanvas(type, content) {
      this.$emit('clicked-add-text', { type, content });
    },
  },
};
</script>

<style lang="scss">
  .sidepanel {
    height: 100%;
    background: #E8E8EA;

    .form {
      height: 80px;
      margin: 10px 0;
    }

    .assets {
      width: 100%;
    }
  }

  .assets {
    .text, .image {
      margin: 10px 0;
    }

    .image ul li {
      width: 50px;
      height: 50px;
      margin-right: 5px;
      float: left;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
        &:hover {
          border: 2px solid blue;
        }
      }
    }
  }


  /*.assets .image ul li {*/
    /*width: 50px;*/
    /*height: 50px;*/
    /*margin-right: 5px;*/
    /*float: left;*/
    /*overflow: hidden;*/
  /*}*/
  /*.assets .image ul li img {*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/

</style>
