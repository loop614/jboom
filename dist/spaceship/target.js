import { RectangleCollection } from "../core/rectangleCollection.js";
import { Rectangle } from "../core/rectangle.js";
export class Target extends Rectangle {
    constructor(x, y, width = 20, height = 20, color = 'red') {
        super(x, y, width, height, color);
    }
}
export class TargetCollection extends RectangleCollection {
    rects;
    constructor() {
        super();
        this.rects = [];
    }
    render(ctx, canvasWidth, canvasHeight) {
        super.renderRects(ctx, canvasWidth, canvasHeight);
    }
    initTargets(canvasWidth) {
        for (let i = 10; i + 20 < canvasWidth; i = i + 30) {
            this.addToCollection(new Target(i, 5));
        }
    }
}
