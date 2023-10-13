import {Rectangle, TDirection, rectangleGo, setPosition, createRectangle} from "../core/rectangle.js";
import {renderRects} from "../core/rectangleCollection.js";

export type Gun = {
    velocityHorizontal: number;
    velocityVertical: number;
} & Rectangle;

function createGun(
    x: number,
    y: number,
    width: number = 200,
    height: number = 20,
    color: string = "green",
    velocityHorizontal: number = 700,
    velocityVertical: number = 500,
): Gun {
    let gun: Gun = createRectangle(x, y, width, height, color) as Gun;
    gun.velocityHorizontal = velocityHorizontal;
    gun.velocityVertical = velocityVertical;

    return gun;
}

export type GunCollection = {
    rects: Gun[];
};

export function createGunCollection(canvasWidth: number, canvasHeight: number): GunCollection {
    let exampleGun: Gun = createGun(0, 0);
    setPosition(exampleGun, canvasWidth / 2 - exampleGun.width / 2, canvasHeight - exampleGun.height - 50);

    return {rects: [exampleGun]};
}

export function renderGunCollection(
    guns: GunCollection,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
): void {
    renderRects(guns, ctx, canvasWidth, canvasHeight);
}

export function gunsGo(guns: GunCollection, dt: number, direction: TDirection): GunCollection {
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

function gunsGoUp(guns: GunCollection, dt: number): GunCollection {
    guns.rects.forEach((gun: Gun): void => {
        rectangleGo(gun, gun.velocityVertical * dt, "up");
    });

    return guns;
}

function gunsGoLeft(guns: GunCollection, dt: number): GunCollection {
    guns.rects.forEach((gun: Gun): void => {
        rectangleGo(gun, gun.velocityHorizontal * dt, "left");
    });

    return guns;
}

function gunsGoRight(guns: GunCollection, dt: number): GunCollection {
    guns.rects.forEach((gun: Gun): void => {
        rectangleGo(gun, gun.velocityHorizontal * dt, "right");
    });

    return guns;
}

function gunsGoDown(guns: GunCollection, dt: number): GunCollection {
    guns.rects.forEach((gun: Gun): void => {
        rectangleGo(gun, gun.velocityVertical * dt, "down");
    });

    return guns;
}
