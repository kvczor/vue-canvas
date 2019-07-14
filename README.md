Vue Canvas by Zbigniew Kubiński

This app also exists with Vue's new function API plugin on branch "function-api-tests".

## Features:
- ability to upload an image to the server
- ability to add a custom text to the canvas
- ability to add an image to the canvas
- ability to remove canvas children (one by one or all at once)
- ability to move around children within the canvas
- app works on both Chrome and Firefox
- app rehydrates canvas children from the localstorage

## Noteworthy decisions:
- app built with Vue.js
- moved bootstrap dependency to package.json
- changed styling from css into scss and moved it into their respective components
- separated the app into server and webapp, removed html serving functionality from server.js, there is no reason
to tie the backend and the frontend.
- canvas children dragging is build using native javascript methods, no external libraries
- made sure that function and variable naming is as self-descriptive as possible
- separated the app into 3 components: App, SidePanel and Canvas:

    App.vue is responsible for data fetching, data rehydration and data updates (adding, removing and updating assets).
    Loaded images and canvasChildren can be passed down to any place within the application whenever needed.
    App.vue is the singe source of truth about the their state.

    SidePanel.vue is responsible only for displaying any image list that we pass down to it and reacting to user input
    (uploading a new image, adding a new asset to the canvas) by executing functions passed down from any parent.

    Canvas.vue is only responsible for displaying any canvas children that we pass down to it and reacting to user input
    (moving and removing canvas children) by executing functions passed down from any parent.

Potential future improvements:
- executing the drag function in Canvas.vue on mouse down on the canvas instead of the particular canvas child to prevent
dragging to suddenly stop when performing it too fast that the mouse is not over our canvas child anymore
- creating a component for canvas children that would render the appropriate element instead of using v-if inside of Canvas
as it is now.
- updating bootstrap version to 4.x.x


## Installation:

# Server

```
cd server

npm install

npm run start

```

# Web App

```
cd webapp

npm install
```

### Development build
```
npm run serve

open http://localhost:8080/ in the browser to view the application in development mode

```

### Production build
```
npm install -g serve

npm run build

cd dist

serve
```
