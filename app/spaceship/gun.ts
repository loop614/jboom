import {Rectangle} from "../core/rectangle.js";

export class Gun extends Rectangle {
    constructor(
        x: number,
        y: number,
        width: number = 200,
        height: number = 20,
        color: string = "green"
    ) {
        super(x, y, width, height, color);
    }

    public setPosition(x: number, y: number) {
        this.tl.x = x;
        this.tl.y = y;
    }

    public goLeft() {
        this.tl.x -= 30;
    }

    public goRight() {
        this.tl.x += 30;
    }

    public goUp() {
        this.tl.y -= 5;
    }

    public goDown() {
        this.tl.y += 5;
    }
}
