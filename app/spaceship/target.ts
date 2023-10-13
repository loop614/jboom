import {RectangleCollection, renderRects} from "../core/rectangleCollection.js";
import {Bullet} from "./bullet.js";
import {createRectangle, Rectangle} from "../core/rectangle.js";
import {Gun} from "./gun";

export type Target = {
} & Rectangle;

function createTarget(
    x: number,
    y: number,
    width: number = 20,
    height: number = 20,
    color: string = "red"
): Target {
    return createRectangle(x, y, width, height, color) as Target;
}

export type TargetCollection = {
    rects: Bullet[]
} & RectangleCollection;

export function createTargetCollection(canvasWidth: number): TargetCollection {
    let targets: TargetCollection = {rects: []};
    for (let i: number = canvasWidth / 2 - 250; i < canvasWidth / 2 + 250; i = i + 30) {
        targets.rects.push(createTarget(i, 5));
    }

    return targets;
}

export function renderTargetCollection(
    rects: TargetCollection,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
): void {
    renderRects(rects, ctx, canvasWidth, canvasHeight);
}
