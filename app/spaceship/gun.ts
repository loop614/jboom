import {Rectangle} from "../core/rectangle.js";

export class Gun extends Rectangle {
    velocityHorizontal: number;
    velocityVertical: number;

    constructor(
        x: number,
        y: number,
        width: number = 200,
        height: number = 20,
        color: string = "green",
        velocityHorizontal: number = 700,
        velocityVertical: number = 500,
    ) {
        super(x, y, width, height, color);
        this.velocityHorizontal = velocityHorizontal;
        this.velocityVertical = velocityVertical;
    }

    public goUp(dt: number): void {
        let up: number = this.velocityVertical * dt;
        super.setPosition(this.tl.x, this.tl.y - up);
    }

    public goLeft(dt: number): void {
        let left: number = this.velocityHorizontal * dt;
        super.setPosition(this.tl.x - left, this.tl.y);
    }

    public goRight(dt: number): void {
        let right: number = this.velocityHorizontal * dt;
        super.setPosition(this.tl.x + right, this.tl.y);
    }

    public goDown(dt: number): void {
        let down: number = this.velocityVertical * dt;
        super.setPosition(this.tl.x, this.tl.y + down);
    }
}
