import { renderRectangle } from "./rectangle.js";
export function renderRects(rectangleCollection, ctx, canvasWidth, canvasHeight) {
    rectangleCollection.rects = rectangleCollection.rects.filter((_, i) => {
        return renderRectangle(rectangleCollection.rects[i], ctx, canvasWidth, canvasHeight);
    });
}
