import {RectangleCollection} from "../core/rectangleCollection.js";
import {Gun} from "./gun.js";
import {Rectangle} from "../core/rectangle.js";

export class Bullet extends Rectangle {
    velocity: number;

    constructor(
        x: number,
        y: number,
        width: number = 20,
        height: number = 20,
        color: string = "blue",
        velocity: number = 700,
    ) {
        super(x, y, width, height, color);
        this.velocity = velocity;
    }
}

export class BulletCollection extends RectangleCollection {
    rects: Bullet[]

    constructor() {
        super();
        this.rects = [];
    }

    public render(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, dt: number): void {
        this.move(dt);
        super.renderRects(ctx, canvasWidth, canvasHeight);
    }

    public createBullet(gun: Gun): void {
        let bullet: Bullet = new Bullet(0, 0);
        let bulletX: number = gun.tl.x + gun.width / 2 - bullet.width / 2;
        let bulletY: number = gun.tl.y - bullet.height;
        bullet.tl.x = bulletX;
        bullet.tl.y = bulletY;
        this.addToCollection(bullet);
    }

    public move(dt: number): void {
        let pixelsToMove: number = 0;
        for(let i: number = 0; i < this.rects.length; i++) {
            pixelsToMove = dt * this.rects[i].velocity;
            this.rects[i].goUp(pixelsToMove);
        }
    }
}
