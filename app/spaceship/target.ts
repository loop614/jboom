import {RectangleCollection} from "../core/rectangleCollection.js";
import {Bullet} from "./bullet.js";
import {Rectangle} from "../core/rectangle.js";

export class Target extends Rectangle {
    constructor(
        x: number,
        y: number,
        width: number = 20,
        height: number = 20,
        color: string = 'red'
    ) {
        super(x, y, width, height, color);
    }
}

export class TargetCollection extends RectangleCollection {
    rects: Bullet[]

    constructor() {
        super();
        this.rects = [];
    }

    public render(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
        super.renderRects(ctx, canvasWidth, canvasHeight);
    }

    public initTargets(canvasWidth: number) {
        for (let i: number = 10; i + 20 < canvasWidth; i = i + 30) {
            this.addToCollection(new Target(i, 5));
        }
    }
}
