import {Gun} from "./gun.js";
import {TargetCollection} from "./targetCollection.js";
import {BulletCollection} from "./bulletCollection.js";
import {Bullet} from "./bullet.js";
import {Target} from "./target.js";

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    targets: TargetCollection;
    bullets: BulletCollection;
    gun: Gun;
    gameStopped: boolean;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.targets = new TargetCollection();
        this.bullets = new BulletCollection();
        this.gun = new Gun(0, 0);
        this.gun.setPosition(canvas.width / 2 - this.gun.width / 2, canvas.height - this.gun.height - 50);
        this.gameStopped = false;
        this.initEvents();
        this.targets.initTargets(canvas.width);
    }

    update(dt: number) {
        if (this.gameStopped) {
            this.stopGame();
            return;
        }
        this.render(dt);
        this.detectCollision();
        if (this.targets.rects.length === 0) {
            this.gameStopped = true;
        }
    }

    private render(dt: number): void {
        this.gun.render(this.ctx, this.canvas.width, this.canvas.height);
        this.targets.render(this.ctx, this.canvas.width, this.canvas.height);
        this.bullets.render(this.ctx, this.canvas.width, this.canvas.height);
    }

    private initEvents() {
        window.document.addEventListener('keydown', (event: KeyboardEvent): void => {
            switch (event.key) {
                case ' ':
                    this.bullets.createBullet(this.gun);
                    break;
                case 'w':
                case 'ArrowUp':
                    this.gun.goUp();
                    break;
                case 'a':
                case 'ArrowLeft':
                    this.gun.goLeft();
                    break;
                case 's':
                case 'ArrowDown':
                    this.gun.goDown();
                    break;
                case 'd':
                case 'ArrowRight':
                    this.gun.goRight();
                    break;
                case 'Escape':
                    this.gameStopped = true;
                    break;
            }
        }, false);
    }

    private stopGame() {
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
