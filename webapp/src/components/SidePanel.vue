<template>
  <div class="sidepanel col-sm-2 col-md-2 col-lg-2">
    <div class="form">
      <h3>Form</h3>
      <div class="input-group">
        <input
          ref="imageUploadField"
          @change="handleFileToUploadUpdate"
          type="file"
          class="form-control"
          placeholder="Upload Your Images"
          name="upload"
        >
        <span class="input-group-btn">
          <button @click="onUploadFileClick" id="submit" class="btn btn-default">
            upload
          </button>
          Add Text
      </span>
      </div>
    </div>
    <hr/>
    <div class="assets">
      <h3>Assets</h3>
      <div class="text">
        <h4>Text</h4>

        <div class="input-group">
          <input
            class="form-control"
            @keydown.enter="handleAddToCanvas('text', textToBeAdded)"
            type="text"
            v-model="textToBeAdded"
            data-cy="asset-text-input"
          >
          <span class="input-group-btn">
                <button
                  @click="handleAddToCanvas('text', textToBeAdded)"
                  id="addText"
                  class="btn btn-default"
                  data-cy="add-asset-text-button"
                >
            Add Text
        </button>
      </span>
        </div>
      </div>
      <div class="image">
        <h4>Images</h4>
        <ul data-cy="image-list" class="list-unstyled">
          <li v-for="imageUrl in images" :key="imageUrl">
            <img @click="handleAddToCanvas('image', imageUrl)" :src="imageUrl"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { value } from 'vue-function-api';

export default {
  name: 'side-panel',
  props: ['images'],
  setup(props, context) {
    const imageToUpload = value('');
    const textToBeAdded = value('default text');


    const handleFileToUploadUpdate = () => {
      imageToUpload.value = context.refs.imageUploadField.files[0];
    };

    const onUploadFileClick = () => {
      context.emit('clicked-upload-image', imageToUpload.value);
    };

    const handleAddToCanvas = (type, content) => {
      context.emit('clicked-add-asset', { type, content });
    };

    return {
      imageToUpload,
      textToBeAdded,
      handleFileToUploadUpdate,
      onUploadFileClick,
      handleAddToCanvas,
    };
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
</style>
