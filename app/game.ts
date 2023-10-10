import {Bullet} from "./bullet.js";
import {Gun} from "./gun.js";
import {Target} from "./target.js"

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D
    targets: Target[]
    bullets: Bullet[];
    gun: Gun;
    gameStopped: boolean

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.targets = [];
        this.bullets = [];
        this.gun = new Gun(0, 0);
        this.gun.setPosition(canvas.width / 2 - this.gun.width / 2, canvas.height - this.gun.height - 50);
        this.gameStopped = false;
        this.initEvents();
        this.initTargets();
    }

    update(dt: number) {
        if (this.gameStopped) {
            this.stopGame();
            return;
        }
        this.render(dt);
    }

    private render(dt: number) {
        this.renderGun();
        this.renderBullets();
        this.renderTargets();
    }

    private renderGun() {
        this.ctx.fillStyle = this.gun.color;
        this.ctx.fillRect(this.gun.pos.x, this.gun.pos.y, this.gun.width, this.gun.height);
    }

    private renderBullets() {
        for (let i: number = 0; i < this.bullets.length; i++) {
            this.ctx.fillStyle = this.bullets[i].color;
            this.ctx.fillRect(this.bullets[i].pos.x, this.bullets[i].pos.y, this.bullets[i].width, this.bullets[i].height);
            this.bullets[i].moveUp();
        }
    }

    private renderTargets() {
        for (let i: number = 0; i < this.targets.length; i++) {
            this.ctx.fillStyle = this.targets[i].color;
            this.ctx.fillRect(this.targets[i].pos.x, this.targets[i].pos.y, this.targets[i].width, this.targets[i].height);
        }
    }

    private initEvents() {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            if (keyName === ' ') {
                this.createBullet();
            }
            if (keyName === 'w' || keyName === 'ArrowUp') {
                this.gun.goUp();
            }
            if (keyName === 'a' || keyName === 'ArrowLeft') {
                this.gun.goLeft();
            }
            if (keyName === 's' || keyName === 'ArrowDown') {
                this.gun.goDown();
            }
            if (keyName === 'd' || keyName === 'ArrowRight') {
                this.gun.goRight();
            }
            if (keyName === 'Escape') {
                this.gameStopped = true;
            }
        }, false);
    }

    private initTargets() {
        // TODO: create some random stuff here
        let keys = 0;
        for(let i = 10; i + 20 < this.canvas.width;  i = i + 30 ) {
            this.targets[keys++] = new Target(i, 5);
        }
    }

    private createBullet() {
        let bullet: Bullet = new Bullet(0, 0);
        let bulletX: number = this.gun.pos.x + this.gun.width / 2 - bullet.width / 2;
        let bulletY: number = this.gun.pos.y
        bullet.setPosition(bulletX, bulletY);
        this.bullets.push(bullet);
    }

    private stopGame() {
        this.ctx.font = "34px serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "#E7E7E7";
        this.ctx.fillText("Done", this.canvas.width / 2, this.canvas.height / 2);
    }
}
