import {V2} from "./2dvector.js";

export class Gun {
    pos: V2;
    width: number;
    height: number;
    color: string;

    GUN_WIDTH_DEFAULT = 200;
    GUN_HEIGHT_DEFAULT = 20;
    GUN_COLOR_DEFAULT = 'green';

    constructor(x: number, y: number) {
        this.pos = new V2(x, y);
        this.width = this.GUN_WIDTH_DEFAULT;
        this.height = this.GUN_HEIGHT_DEFAULT;
        this.color = this.GUN_COLOR_DEFAULT;
    }

    setPosition(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;
    }

    goLeft() {
        this.pos.x -= 20;
    }

    goRight() {
        this.pos.x += 20;
    }

    goUp() {
        this.pos.y -= 20;
    }

    goDown() {
        this.pos.y += 20;
    }
}
