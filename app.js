class V2
{
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    scale(s) {
        return new V2(this.x * s, this.y * s);
    }
}

class Bullet
{
    constructor(v) {
        this.v = v;
    }

    moveUp(s) {
        this.v.b -= 3;
    }
}

class BulletRenderer
{
    BULLET_COLOR = 'blue';
    BULLET_WIDHT = 20;
    BULLET_HEIGHT = 20;

    constructor(ctx, canvasWidth, canvasHeight) {
        this.bulletKey = 0;
        this.bullets = [];
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    update(dt) {
        this.bullets = this.bullets.filter(bullet => bullet.v.b > 0);

        for (let bulletKey in this.bullets) {
            this.bullets[bulletKey].moveUp(dt);
            this.ctx.fillStyle = BULLET_COLOR;
            this.ctx.fillRect(this.bullets[bulletKey].v.a, this.bullets[bulletKey].v.b, this.BULLET_WIDHT, this.BULLET_HEIGHT);
        }
    }

    shootBullet(v) {
        this.bullets[this.bulletKey++] = new Bullet(
            new V2(v.a - this.BULLET_WIDHT / 2, v.b - this.BULLET_HEIGHT)
        );
    }
}

class GunRenderer
{
    GUN_WIDTH = 200;
    GUN_HEIGHT = 20;
    GUN_COLOR = 'green';

    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.pos = new V2(canvasWidth / 2 - this.GUN_WIDTH / 2, canvasHeight - this.GUN_HEIGHT - 50);
        this.bulletRenderer = new BulletRenderer(ctx, canvasWidth, canvasHeight);
    }

    update(dt) {
        this.drawGun();
        this.bulletRenderer.update(dt);
    }

    goLeft() {
        this.pos.a -= 20;
    }

    goRight() {
        this.pos.a += 20;
    }

    goUp() {
        this.pos.b -= 20;
    }

    goDown() {
        this.pos.b += 20;
    }

    drawGun() {
        this.ctx.fillStyle = this.GUN_COLOR;
        this.ctx.fillRect(this.pos.a, this.pos.b, this.GUN_WIDTH, this.GUN_HEIGHT);
    }

    shotTheBulltet() {
        this.bulletRenderer.shootBullet(
            new V2(this.pos.a + this.GUN_WIDTH / 2, this.pos.b)
        );
    }
}

class Target
{
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class TargetRenderer
{
    TARGET_WIDTH = 20;
    TARGET_HEIGHT = 20;
    TARGET_COLOR = 'red';

    constructor(ctx, canvasWidth) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.targets = [];
        this.createTargets();
    }

    createTargets() {
        let keys = 0;
        for(let i = 10; i + TARGET_WIDTH < this.canvasWidth;  i = i + TARGET_WIDTH + 10 ) {
            let target = new Target(i, 5, TARGET_WIDTH, TARGET_HEIGHT);
            this.targets[keys++] = target;
            this.drawTarget(target.x, target.y, target.w, target.h);
        }
    }

    update(dt) {
        for (let target of this.targets) {
            this.drawTarget(target.x, target.y, target.w, target.h);
        }
    }

    drawTarget(x, y, w, h) {
        this.ctx.fillStyle = TARGET_COLOR;
        this.ctx.fillRect(x, y, w, h);
    }
}

class Game
{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.targetRenderer = new TargetRenderer(this.ctx, this.canvas.width);
        this.gunRenderer = new GunRenderer(this.ctx, this.canvas.width, this.canvas.height);
        this.gameStopped = false;
        this.initEvents();
    }

    initEvents() {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            if (keyName === ' ') {
                this.gunRenderer.shotTheBulltet();
            }
            if (keyName === 'w' || keyName === 'ArrowUp') {
                this.gunRenderer.goUp();
            }
            if (keyName === 'a' || keyName === 'ArrowLeft') {
                this.gunRenderer.goLeft();
            }
            if (keyName === 's' || keyName === 'ArrowDown') {
                this.gunRenderer.goDown();
            }
            if (keyName === 'd' || keyName === 'ArrowRight') {
                this.gunRenderer.goRight();
            }
            if (keyName === 'Escape') {
                this.gameStopped = true;
            }
          }, false);
    }

    update(dt) {
        if (!this.gameStopped) {
            this.targetRenderer.update(dt);
            this.gunRenderer.update(dt);
        }
        else {
            this.stopGame();
        }
    }

    stopGame() {
        this.ctx.font = "34px serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline="middle";
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillText("Done", this.canvas.width / 2, this.canvas.height / 2);
    }
}



(() => {
    let start;
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let game = new Game(canvas);

    function step(timestamp) {
        if (start === undefined) {
            start = timestamp;
        }
        const dt = (timestamp - start) * 0.001;
        start = timestamp;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game.update(dt);

        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
})();



