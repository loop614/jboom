import {Rectangle, renderRectangle} from "./rectangle.js"

export type RectangleCollection = {
    rects: Rectangle[]
}

export function renderRects(
    rectangleCollection: RectangleCollection,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
): void {
    rectangleCollection.rects = rectangleCollection.rects.filter((_: Rectangle, i: number): boolean => {
        return renderRectangle(rectangleCollection.rects[i], ctx, canvasWidth, canvasHeight)
    });
}
