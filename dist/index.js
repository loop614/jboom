import { Game } from "./spaceship/game.js";
(() => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let game = new Game(canvas, ctx);
    let previousTimestamp = undefined;
    function step(nowTimestamp) {
        if (previousTimestamp === undefined) {
            previousTimestamp = nowTimestamp;
        }
        const dt = (nowTimestamp - previousTimestamp) * 0.001;
        previousTimestamp = nowTimestamp;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game.update(dt);
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
})();
