import {V2} from "./2dvector.js";

export class Target {
    pos: V2;
    TARGET_WIDTH_DEFAULT: number = 20;
    TARGET_HEIGHT_DEFAULT: number = 20;
    TARGET_COLOR_DEFAULT: string = 'red';
    width: number;
    height: number;
    color: string;

    constructor(x: number, y: number) {
        this.pos = new V2(x, y);
        this.width = this.TARGET_WIDTH_DEFAULT;
        this.height = this.TARGET_HEIGHT_DEFAULT;
        this.color = this.TARGET_COLOR_DEFAULT;
    }
}
