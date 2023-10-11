import {RectangleCollection} from "../core/rectangleCollection.js";
import {Bullet} from "./bullet.js";
import {Gun} from "./gun.js";

export class BulletCollection extends RectangleCollection {
    rects: Bullet[]

    constructor() {
        super();
        this.rects = [];
    }

    public render(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
        this.move();
        super.render(ctx, canvasWidth, canvasHeight);
    }

    public createBullet(gun: Gun): void {
        let bullet: Bullet = new Bullet(0, 0);
        let bulletX: number = gun.tl.x + gun.width / 2 - bullet.width / 2;
        let bulletY: number = gun.tl.y - bullet.height;
        bullet.tl.x = bulletX;
        bullet.tl.y = bulletY;
        this.addToCollection(bullet);
    }

    public move(): void {
        for(let i: number = 0; i < this.rects.length; i++) {
            this.rects[i].moveUp(10);
        }
    }
}
