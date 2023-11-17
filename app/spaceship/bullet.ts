import {RectangleCollection} from "../core/rectangleCollection.js";
import {Gun, GunCollection} from "./gun.js";
import {Rectangle, createRectangle, rectangleGo} from "../core/rectangle.js";
import {renderRects} from "../core/rectangleCollection.js";

export type Bullet = {
    velocity: number
} & Rectangle;

export function createBullet(
    x: number,
    y: number,
    width: number = 20,
    height: number = 20,
    color: string = "blue",
    velocity: number = 700,
): Bullet {
    let bullet: Bullet = createRectangle(x, y, width, height, color) as Bullet;
    bullet.velocity = velocity;

    return bullet;
}

export type BulletCollection = {
    rects: Bullet[]
} & RectangleCollection;

export function createBulletCollection(): BulletCollection {
    return {rects: []};
}

export function addBullet(bullets: BulletCollection, guns: GunCollection): BulletCollection {
    guns.rects.forEach((gun: Gun): void => {
        let bullet: Bullet = createBullet(gun.tl.x, gun.tl.y);
        let bulletX: number = gun.tl.x + gun.width / 2 - bullet.width / 2;
        let bulletY: number = gun.tl.y - bullet.height;
        bullet.tl.x = bulletX;
        bullet.tl.y = bulletY;
        bullets.rects.push(bullet);
    });

    return bullets;
}

export function renderBulletCollection(
    rects: BulletCollection,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    dt: number
): void {
    move(rects, dt);
    renderRects(rects, ctx, canvasWidth, canvasHeight);
}

export function move(bullets: BulletCollection, dt: number): void {
    let pixelsToMove: number = 0;
    bullets.rects.forEach((bullet: Bullet): void => {
        pixelsToMove = dt * bullet.velocity;
        rectangleGo(bullet, pixelsToMove, "up");
    });
}
