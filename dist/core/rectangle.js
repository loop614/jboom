import { V2 } from "./2dvector.js";
export class Rectangle {
    tl;
    br;
    width;
    height;
    color;
    constructor(x, y, width, height, color) {
        this.tl = new V2(x, y);
        this.height = height;
        this.width = width;
        this.color = color;
        this.br = new V2(x + width, y + height);
    }
    render(ctx, canvasWidth, canvasHeight) {
        if (!this.isOver(new Rectangle(0, 0, canvasWidth, canvasHeight, ''))) {
            return false;
        }
        ctx.fillStyle = this.color;
        ctx.fillRect(this.tl.x, this.tl.y, this.width, this.height);
        return true;
    }
    isOver(that) {
        let thatNotLeft = this.tl.x < that.br.x;
        let thatNotRight = this.br.x > that.tl.x;
        let thatNotOver = this.tl.y < that.br.y;
        let thatNotUnder = this.br.y > that.tl.y;
        return thatNotLeft && thatNotRight && thatNotOver && thatNotUnder;
    }
    goUp(up) {
        this.setPosition(this.tl.x, this.tl.y - up);
    }
    goLeft(left) {
        this.setPosition(this.tl.x - left, this.tl.y);
    }
    goRight(right) {
        this.setPosition(this.tl.x + right, this.tl.y);
    }
    goDown(down) {
        this.setPosition(this.tl.x, this.tl.y + down);
    }
    setPosition(x, y) {
        this.tl = new V2(x, y);
        this.br = new V2(x + this.width, y + this.height);
    }
}
