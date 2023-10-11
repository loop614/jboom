import {Rectangle} from "./rectangle.js"

export class RectangleCollection {
    rects: Rectangle[]

    constructor() {
        this.rects = [];
    }

    public render(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        this.rects = this.rects.filter((_: Rectangle, i: number): boolean => {
            return this.rects[i].render(ctx, canvasWidth, canvasHeight);
        });
    }

    public addToCollection(newOne: Rectangle): void {
        this.rects.push(newOne);
    }
}
