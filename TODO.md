# Things to Explore

## Web worker / Multi-threading

Moving each model instance (head / hands) into its own web worker could improve performance. This would involve refactoring how the Human library is loaded.

Links:

- [Human web worker example](https://github.com/vladmandic/human/tree/main/demo/multithread)
- [Nextjs docs web worker example (experimental)](https://nextjs.org/docs/pages/building-your-application/optimizing/scripts#offloading-scripts-to-a-web-worker-experimental)
- [Nextjs webworker example](https://medium.com/@ngrato/harnessing-the-power-of-web-workers-with-next-js-350901a99a10)
- [Web worker API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

## Update head bounding box, movement thresholds

1. Find avg bounding box thresholds for left, right, top, bottom of screen.
1. Explore possible delays for text feedback to minimize/eliminate any user frustration.

## Decouple draw logic from `detectAndDraw`

1. Separate the draw logic from detect since the draw logic is only used for debugging. Ideally this would be something we could toggle via [Leva](https://github.com/pmndrs/leva).
