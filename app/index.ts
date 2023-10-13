import {Game, createGame, updateGame, initKeydownEvents} from "./spaceship/game.js"

((): void => {
    let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let dt: number = 0;
    let gameStopped: boolean = false;
    let game: Game = createGame(canvas, ctx, dt);
    initKeydownEvents(game);
    let previousTimestamp: number | undefined = undefined;

    function step(nowTimestamp: number): void {
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
