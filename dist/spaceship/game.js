import { renderGunCollection, createGunCollection, gunsGo } from "./gun.js";
import { renderTargetCollection, createTargetCollection } from "./target.js";
import { renderBulletCollection, createBulletCollection, addBullet } from "./bullet.js";
import { isRectOver } from "../core/rectangle.js";
export function createGame(canvas, ctx, dt) {
    return {
        canvas: canvas,
        ctx: ctx,
        targetCollection: createTargetCollection(canvas.width),
        bulletCollection: createBulletCollection(),
        gunCollection: createGunCollection(canvas.width, canvas.height),
        gameStopped: false,
        dt: dt,
    };
}
export function updateGame(game, dt, gameStopped) {
    game.dt = dt;
    if (gameStopped) {
        stopGame(game.ctx, game.canvas);
        return true;
    }
    render(game);
    if (game.bulletCollection.rects.length > 0) {
        game = detectCollision(game);
    }
    if (game.targetCollection.rects.length === 0) {
        gameStopped = true;
    }
    return gameStopped;
}
function render(game) {
    renderGunCollection(game.gunCollection, game.ctx, game.canvas.width, game.canvas.height);
    renderTargetCollection(game.targetCollection, game.ctx, game.canvas.width, game.canvas.height);
    renderBulletCollection(game.bulletCollection, game.ctx, game.canvas.width, game.canvas.height, game.dt);
}
export function initKeydownEvents(game) {
    window.document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case ' ':
                game.bulletCollection = addBullet(game.bulletCollection, game.gunCollection);
                break;
            case 'w':
            case 'ArrowUp':
                game.gunCollection = gunsGo(game.gunCollection, game.dt, "up");
                break;
            case 'a':
            case 'ArrowLeft':
                game.gunCollection = gunsGo(game.gunCollection, game.dt, "left");
                break;
            case 's':
            case 'ArrowDown':
                game.gunCollection = gunsGo(game.gunCollection, game.dt, "down");
                break;
            case 'd':
            case 'ArrowRight':
                game.gunCollection = gunsGo(game.gunCollection, game.dt, "right");
                break;
        }
    }, false);
}
function stopGame(ctx, canvas) {
    ctx.font = "34px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#E7E7E7";
    ctx.fillText("Done", canvas.width / 2, canvas.height / 2);
}
function detectCollision(game) {
    game.bulletCollection.rects = game.bulletCollection.rects.filter((_, i) => {
        let targetLen = game.targetCollection.rects.length;
        game.targetCollection.rects = game.targetCollection.rects.filter((_, j) => {
            return !isRectOver(game.targetCollection.rects[j], game.bulletCollection.rects[i]);
        });
        return (targetLen - game.targetCollection.rects.length) === 0;
    });
    return game;
}
