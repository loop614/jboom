import {RectangleCollection} from "../core/rectangleCollection.js";
import {Target} from "./target.js";
import {Bullet} from "./bullet.js";

export class TargetCollection extends RectangleCollection {
    rects: Bullet[]

    constructor() {
        super();
        this.rects = [];
    }

    public render(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
        super.render(ctx, canvasWidth, canvasHeight);
    }

    public initTargets(canvasWidth: number) {
        for (let i = 10; i + 20 < canvasWidth; i = i + 30) {
            this.addToCollection(new Target(i, 5));
        }
    }
}
