import { Gun } from "./gun.js";
import { TargetCollection } from "./target.js";
import { BulletCollection } from "./bullet.js";
export class Game {
    canvas;
    ctx;
    targets;
    bullets;
    gun;
    dt;
    gameStopped;
    constructor(canvas, ctx) {
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
    update(dt) {
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
    render() {
        this.gun.render(this.ctx, this.canvas.width, this.canvas.height);
        this.targets.render(this.ctx, this.canvas.width, this.canvas.height);
        this.bullets.render(this.ctx, this.canvas.width, this.canvas.height, this.dt);
    }
    initKeydownEvents() {
        window.document.addEventListener('keydown', (event) => {
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
    stopGame() {
        this.ctx.font = "34px serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "#E7E7E7";
        this.ctx.fillText("Done", this.canvas.width / 2, this.canvas.height / 2);
    }
    detectCollision() {
        this.bullets.rects = this.bullets.rects.filter((_, i) => {
            let targetLen = this.targets.rects.length;
            this.targets.rects = this.targets.rects.filter((_, j) => {
                return !this.targets.rects[j].isOver(this.bullets.rects[i]);
            });
            return (targetLen - this.targets.rects.length) === 0;
        });
    }
}
