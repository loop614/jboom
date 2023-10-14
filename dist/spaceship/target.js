import { renderRects } from "../core/rectangleCollection.js";
import { createRectangle } from "../core/rectangle.js";
function createTarget(x, y, width = 20, height = 20, color = "red") {
    return createRectangle(x, y, width, height, color);
}
export function createTargetCollection(canvasWidth) {
    let targets = { rects: [] };
    for (let i = canvasWidth / 2 - 250; i < canvasWidth / 2 + 250; i = i + 30) {
        targets.rects.push(createTarget(i, 5));
    }
    return targets;
}
export function renderTargetCollection(rects, ctx, canvasWidth, canvasHeight) {
    renderRects(rects, ctx, canvasWidth, canvasHeight);
}
