import { rectangleGo, setPosition, createRectangle } from "../core/rectangle.js";
import { renderRects } from "../core/rectangleCollection.js";
function createGun(x, y, width = 200, height = 20, color = "green", velocityHorizontal = 700, velocityVertical = 500) {
    let gun = createRectangle(x, y, width, height, color);
    gun.velocityHorizontal = velocityHorizontal;
    gun.velocityVertical = velocityVertical;
    return gun;
}
export function createGunCollection(canvasWidth, canvasHeight) {
    let exampleGun = createGun(0, 0);
    setPosition(exampleGun, canvasWidth / 2 - exampleGun.width / 2, canvasHeight - exampleGun.height - 50);
    return { rects: [exampleGun] };
}
export function renderGunCollection(guns, ctx, canvasWidth, canvasHeight) {
    renderRects(guns, ctx, canvasWidth, canvasHeight);
}
export function gunsGo(guns, dt, direction) {
    switch (direction) {
        case "left":
            return gunsGoLeft(guns, dt);
        case "right":
            return gunsGoRight(guns, dt);
        case "up":
            return gunsGoUp(guns, dt);
        case "down":
            return gunsGoDown(guns, dt);
    }
}
function gunsGoUp(guns, dt) {
    guns.rects.forEach((gun) => {
        rectangleGo(gun, gun.velocityVertical * dt, "up");
    });
    return guns;
}
function gunsGoLeft(guns, dt) {
    guns.rects.forEach((gun) => {
        rectangleGo(gun, gun.velocityHorizontal * dt, "left");
    });
    return guns;
}
function gunsGoRight(guns, dt) {
    guns.rects.forEach((gun) => {
        rectangleGo(gun, gun.velocityHorizontal * dt, "right");
    });
    return guns;
}
function gunsGoDown(guns, dt) {
    guns.rects.forEach((gun) => {
        rectangleGo(gun, gun.velocityVertical * dt, "down");
    });
    return guns;
}
