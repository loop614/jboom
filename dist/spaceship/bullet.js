import { createRectangle, rectangleGo } from "../core/rectangle.js";
import { renderRects } from "../core/rectangleCollection.js";
export function createBullet(x, y, width = 20, height = 20, color = "blue", velocity = 40) {
    let bullet = createRectangle(x, y, width, height, color);
    bullet.velocity = velocity;
    return bullet;
}
export function createBulletCollection() {
    return { rects: [] };
}
export function addBullet(bullets, guns) {
    guns.rects.forEach((gun) => {
        let bullet = createBullet(gun.tl.x, gun.tl.y);
        let bulletX = gun.tl.x + gun.width / 2 - bullet.width / 2;
        let bulletY = gun.tl.y - bullet.height;
        bullet.tl.x = bulletX;
        bullet.tl.y = bulletY;
        bullets.rects.push(bullet);
    });
    return bullets;
}
export function renderBulletCollection(rects, ctx, canvasWidth, canvasHeight, dt) {
    move(rects, dt);
    renderRects(rects, ctx, canvasWidth, canvasHeight);
}
export function move(bullets, dt) {
    let pixelsToMove = 0;
    bullets.rects.forEach((bullet) => {
        pixelsToMove = dt * bullet.velocity;
        rectangleGo(bullet, pixelsToMove, "up");
    });
}
