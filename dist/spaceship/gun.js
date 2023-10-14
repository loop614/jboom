import { Rectangle } from "../core/rectangle.js";
export class Gun extends Rectangle {
    velocityHorizontal;
    velocityVertical;
    constructor(x, y, width = 200, height = 20, color = "green", velocityHorizontal = 700, velocityVertical = 500) {
        super(x, y, width, height, color);
        this.velocityHorizontal = velocityHorizontal;
        this.velocityVertical = velocityVertical;
    }
    goUp(dt) {
        let up = this.velocityVertical * dt;
        super.setPosition(this.tl.x, this.tl.y - up);
    }
    goLeft(dt) {
        let left = this.velocityHorizontal * dt;
        super.setPosition(this.tl.x - left, this.tl.y);
    }
    goRight(dt) {
        let right = this.velocityHorizontal * dt;
        super.setPosition(this.tl.x + right, this.tl.y);
    }
    goDown(dt) {
        let down = this.velocityVertical * dt;
        super.setPosition(this.tl.x, this.tl.y + down);
    }
}
