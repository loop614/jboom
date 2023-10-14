export function createRectangle(x, y, width, height, color) {
    let br = { x: x + width, y: y + height };
    return {
        tl: { x: x, y: y },
        br: br,
        width: width,
        height: height,
        color: color,
    };
}
export function renderRectangle(rect, ctx, canvasWidth, canvasHeight) {
    let canvasRect = { "tl": { x: 0, y: 0 }, "br": { x: canvasWidth, y: canvasHeight }, "width": canvasWidth, "height": canvasHeight, "color": '' };
    if (!isRectOver(rect, canvasRect)) {
        return false;
    }
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.tl.x, rect.tl.y, rect.width, rect.height);
    return true;
}
export function setPosition(rect, x, y) {
    rect.tl = { x: x, y: y };
    rect.br = { x: x + rect.width, y: y + rect.height };
    return rect;
}
export function isRectOver(rect1, rect2) {
    let rect2NotLeft = rect1.tl.x < rect2.br.x;
    let rect2NotRight = rect1.br.x > rect2.tl.x;
    let rect2NotOver = rect1.tl.y < rect2.br.y;
    let rect2NotUnder = rect1.br.y > rect2.tl.y;
    return rect2NotLeft && rect2NotRight && rect2NotOver && rect2NotUnder;
}
export function rectangleGo(rect, value, direction) {
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
function goUp(rect, up) {
    return setPosition(rect, rect.tl.x, rect.tl.y - up);
}
function goLeft(rect, left) {
    return setPosition(rect, rect.tl.x - left, rect.tl.y);
}
function goRight(rect, right) {
    return setPosition(rect, rect.tl.x + right, rect.tl.y);
}
function goDown(rect, down) {
    return setPosition(rect, rect.tl.x, rect.tl.y + down);
}
