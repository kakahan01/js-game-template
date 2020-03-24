# JS Game Template

### How to use it

#### Initialization

First of all we need to set up our settings. Which is pretty easy.

Scroll all the way down. You see the settings function.
```js
settings(FPS, LOGS, LOG_CONTROLS, LOG_COUNT);
```
FPS is basicly fps as a number.
LOGS is a bool value of if it should show the debug screen.
LOG_CONTROLS is a bool value of if it should show the controls you pressed on the debug screen.
LOG_COUNT is how many lines the debug log should be.

Now that we are done with the settings, we need to initialize our images so they load before the drawing starts.

Add `initializeImage(path)` under the settings function to load images.

And you are done with the initialization... For now!

#### Drawing

Scroll to the `initialize()` function. You will see this.

```js
function initialize() {
    toDraw.push({
        type: "rectangle",
        x: 50,
        y: 100,
        width: 100,
        height: 150,
        stroke: true,
        fill: true,
        style: "green"
    });

    // FPS COUNTER

    toDraw.push({
        type:"text",
        x: 750,
        y: 10,
        fill: true,
        stroke: true,
        style: "black",
        content: FPS + " FPS"
    })
}
```

There are types for the draw function to draw them.
There are 3 types:
- Rectangle
- Text
- Image

You need to use toDraw.push() function to draw. The later you add the function the lower it will be while drawing. (Layerwise.)
The object you need to insert is pretty simple. Here's one with everything you can put.
```js
{
  type: "text",
  x: 100,
  y: 150,
  fill: true,
  stroke: true,
  style: "green",
  content: "Hello haha",
  width: 100,
  height: 200,
  imageIndex: 0
}
```

Content only works for text.
Width and height doesn't affect the text.
Image index only affects images.

##### Drawing Images

All you have to do is add the `imageIndex` to the object. Image index is basicly the order you initialized your image - 1.

#### Control system

To know what keys the user is touching, we use the control system. It is pretty basic.
You need to use the `controls` array. It includes every "KeyCode" the user is touching now as a string.

Ex.
```
// Only show fps if the user is touching RightArrow.
function initialize() {
    if (controls.includes("RightArrow))) {
      toDraw.push({
          type:"text",
          x: 750,
          y: 10,
          fill: true,
          stroke: true,
          style: "black",
          content: FPS + " FPS"
      })
    }
}
```

It automatically handles everything and makes sure the controls get deleted after the user stopped touching them.
