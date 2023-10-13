import {Gun} from "./gun.js";
import {Target, TargetCollection} from "./target.js";
import {Bullet, BulletCollection} from "./bullet.js";

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    targets: TargetCollection;
    bullets: BulletCollection;
    gun: Gun;
    dt: number;
    gameStopped: boolean;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.targets = new TargetCollection();
        this.bullets = new BulletCollection();
        this.gun = new Gun(0, 0);
        this.gun.setPosition(canvas.width / 2 - this.gun.width / 2, canvas.height - this.gun.height - 50);
        this.gameStopped = false;
        this.initKeydownEvents();
        this.dt = 0;
        this.targets.initTargets(canvas.width);
    }

    public update(dt: number): void {
        this.dt = dt;
        if (this.gameStopped) {
            this.stopGame();
            return;
        }
        this.render();
        this.detectCollision();
        if (this.targets.rects.length === 0) {
            this.gameStopped = true;
        }
    }

    private render(): void {
        this.gun.render(this.ctx, this.canvas.width, this.canvas.height);
        this.targets.render(this.ctx, this.canvas.width, this.canvas.height);
        this.bullets.render(this.ctx, this.canvas.width, this.canvas.height, this.dt);
    }

    private initKeydownEvents(): void {
        window.document.addEventListener('keydown', (event: KeyboardEvent): void => {
            switch (event.key) {
                case ' ':
                    this.bullets.createBullet(this.gun);
                    break;
                case 'w':
                case 'ArrowUp':
                    this.gun.goUp(this.dt);
                    break;
                case 'a':
                case 'ArrowLeft':
                    this.gun.goLeft(this.dt);
                    break;
                case 's':
                case 'ArrowDown':
                    this.gun.goDown(this.dt);
                    break;
                case 'd':
                case 'ArrowRight':
                    this.gun.goRight(this.dt);
                    break;
                case 'Escape':
                    this.gameStopped = true;
                    break;
            }
        }, false);
    }

    private stopGame(): void {
        this.ctx.font = "34px serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "#E7E7E7";
        this.ctx.fillText("Done", this.canvas.width / 2, this.canvas.height / 2);
    }

    private detectCollision(): void {
        this.bullets.rects = this.bullets.rects.filter((_: Bullet, i: number): boolean => {
            let targetLen: number = this.targets.rects.length;
            this.targets.rects = this.targets.rects.filter((_: Target, j: number): boolean => {
                return !this.targets.rects[j].isOver(this.bullets.rects[i]);
            });

            return (targetLen - this.targets.rects.length) === 0;
        });
    }
}
