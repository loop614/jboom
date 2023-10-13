import {V2} from "./2dvector.js"

export type Rectangle = {
    tl: V2;
    br: V2;
    width: number;
    height: number;
    color: string;
}

export type TDirection = "left" | "right" | "up" | "down";

export function createRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
): Rectangle {
    let br: V2 = {x: x + width, y: y + height };
    return {
        tl: {x: x, y: y},
        br: br,
        width: width,
        height: height,
        color: color,
    };
}

export function renderRectangle(
    rect: Rectangle,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
): boolean {
    let canvasRect: Rectangle = {"tl": {x: 0, y: 0}, "br": {x: canvasWidth, y: canvasHeight}, "width": canvasWidth, "height": canvasHeight, "color": ''};
    if (!isRectOver(rect, canvasRect)) {
        return false;
    }

    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.tl.x, rect.tl.y, rect.width, rect.height);

    return true;
}

export function setPosition(rect: Rectangle, x: number, y: number): Rectangle {
    rect.tl = {x: x, y: y};
    rect.br = {x: x + rect.width, y: y + rect.height};

    return rect;
}


export function isRectOver(rect1: Rectangle, rect2: Rectangle): boolean {
    let rect2NotLeft: boolean = rect1.tl.x < rect2.br.x;
    let rect2NotRight: boolean = rect1.br.x > rect2.tl.x;
    let rect2NotOver: boolean = rect1.tl.y < rect2.br.y;
    let rect2NotUnder: boolean = rect1.br.y > rect2.tl.y;

    return rect2NotLeft && rect2NotRight && rect2NotOver && rect2NotUnder;
}

export function rectangleGo(rect: Rectangle, value: number, direction: TDirection): Rectangle {
    switch (direction) {
        case "left":
            return goLeft(rect, value);
        case "right":
            return goRight(rect, value);
        case "up":
            return goUp(rect, value);
        case "down":
            return goDown(rect, value);
    }
}

function goUp(rect: Rectangle, up: number): Rectangle {
    return setPosition(rect, rect.tl.x, rect.tl.y - up);
}

function goLeft(rect: Rectangle, left: number): Rectangle {
    return setPosition(rect, rect.tl.x - left, rect.tl.y);
}

function goRight(rect: Rectangle, right: number): Rectangle {
    return setPosition(rect, rect.tl.x + right, rect.tl.y);
}

function goDown(rect: Rectangle, down: number): Rectangle {
    return setPosition(rect, rect.tl.x, rect.tl.y + down);
}
