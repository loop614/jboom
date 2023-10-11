import {Rectangle} from "../core/rectangle.js";

export class Bullet extends Rectangle {
    constructor(
        x: number,
        y: number,
        width: number = 20,
        height: number = 20,
        color: string = "blue"
    ) {
        super(x, y, width, height, color);
    }
}
