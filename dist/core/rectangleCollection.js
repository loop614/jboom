export class RectangleCollection {
    rects;
    constructor() {
        this.rects = [];
    }
    renderRects(ctx, canvasWidth, canvasHeight) {
        this.rects = this.rects.filter((_, i) => {
            return this.rects[i].render(ctx, canvasWidth, canvasHeight);
        });
    }
    addToCollection(newOne) {
        this.rects.push(newOne);
    }
}
