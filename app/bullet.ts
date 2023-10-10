import { V2 } from "./2dvector.js"

export class Bullet {
    pos: V2;
    height: number;
    width: number;
    color: string;

    BULLET_COLOR_DEFAULT: string = 'blue';
    BULLET_WIDTH_DEFAULT: number = 20;
    BULLET_HEIGHT_DEFAULT: number = 20;

    constructor(x: number, y: number) {
        this.pos = new V2(x, y);
        this.height = this.BULLET_HEIGHT_DEFAULT;
        this.width = this.BULLET_WIDTH_DEFAULT;
        this.color = this.BULLET_COLOR_DEFAULT;
    }

    moveUp() {
        this.pos.y -= 5;
    }

    setPosition(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;
    }
}
