<template>
  <div>
    <!-- side pane -->
    <div class="sidepane col-sm-2 col-md-2 col-lg-2">
      <div class="form">
        <h3>Form</h3>
        <input type="file" class="form-control" placeholder="Upload Your Images" name="upload">
        <button id="submit" class="btn btn-default">upload</button>
        <!-- Upload Form here -->
      </div>
      <hr />
      <div class="assets">
        <h3>Assets</h3>
        <div class="text">
          <h4>Text</h4>
          <button id="addText" class="btn btn-default">Add Text</button>
        </div>
        <div class="image">
          <h4>Images</h4>
          <ul class="list-unstyled">
            <!-- List of images here -->
            <!-- <li><img src="images/sample.jpeg" class="img-rounded" /></li> -->
          </ul>
        </div>
      </div>
    </div>
    <!-- canvas -->
    <div class="canvas col-sm-8 col-md-8 col-lg-8">
      <div class="block">
        <!-- Add images and texts to here -->
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: 'app',
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

  .sidepane {
    height: 100%;
    background: #E8E8EA;
  }

  .sidepane .form {
    height: 80px;
    margin: 10px 0;
  }

  .sidepane .assets {
    width: 100%;
  }

  #assetText {
    font-size: 24px;
  }

  .assets .text, .assets .image {
    margin: 10px 0;
  }
  .assets .image ul li {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    float: left;
    overflow: hidden;
  }
  .assets .image ul li img {
    width: 100%;
    height: 100%;
  }

  .canvas .block {
    position: relative;
    width: 600px; height: 600px;
    margin: 10px;
    border: 1px solid;
    box-shadow: 0px 0px 5px black;
  }

  .item {
    border: 1px solid transparent;
    position: absolute;
  }

  .item.selected {
    border-color: blue;
  }
</style>
