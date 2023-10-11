import { Game } from "./spaceship/game.js"

((): void => {
    let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let game: Game = new Game(canvas, ctx);
    let previousTimestamp: number | undefined = undefined;

    function step(nowTimestamp: number): void {
        if (previousTimestamp === undefined) {
            previousTimestamp = nowTimestamp;
        }
        const dt: number = (nowTimestamp - previousTimestamp) * 0.001;
        previousTimestamp = nowTimestamp;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game.update(dt);
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
})();
