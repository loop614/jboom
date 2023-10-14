import { RectangleCollection } from "../core/rectangleCollection.js";
import { Rectangle } from "../core/rectangle.js";
export class Bullet extends Rectangle {
    velocity;
    constructor(x, y, width = 20, height = 20, color = "blue", velocity = 700) {
        super(x, y, width, height, color);
        this.velocity = velocity;
    }
}
export class BulletCollection extends RectangleCollection {
    rects;
    constructor() {
        super();
        this.rects = [];
    }
    render(ctx, canvasWidth, canvasHeight, dt) {
        this.move(dt);
        super.renderRects(ctx, canvasWidth, canvasHeight);
    }
    createBullet(gun) {
        let bullet = new Bullet(0, 0);
        let bulletX = gun.tl.x + gun.width / 2 - bullet.width / 2;
        let bulletY = gun.tl.y - bullet.height;
        bullet.tl.x = bulletX;
        bullet.tl.y = bulletY;
        this.addToCollection(bullet);
    }
    move(dt) {
        let pixelsToMove = 0;
        for (let i = 0; i < this.rects.length; i++) {
            pixelsToMove = dt * this.rects[i].velocity;
            this.rects[i].goUp(pixelsToMove);
        }
    }
}
