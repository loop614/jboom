import { createGame, updateGame, initKeydownEvents } from "./spaceship/game.js";
(() => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let dt = 0;
    let gameStopped = false;
    let game = createGame(canvas, ctx, dt);
    initKeydownEvents(game);
    let previousTimestamp = undefined;
    function step(nowTimestamp) {
        if (previousTimestamp === undefined) {
            previousTimestamp = nowTimestamp;
        }
        dt = (nowTimestamp - previousTimestamp) * 0.001;
        previousTimestamp = nowTimestamp;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gameStopped = updateGame(game, dt, gameStopped);
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
})();
