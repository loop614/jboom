import {V2} from "./2dvector.js"

export class Rectangle {
    tl: V2;
    br: V2;
    width: number;
    height: number;
    color: string;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.tl = new V2(x, y);
        this.height = height;
        this.width = width;
        this.color = color;
        this.br = new V2(x + width, y + height);
    }

    public render(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): boolean {
        if (!this.isOver(new Rectangle(0, 0, canvasWidth, canvasHeight, ''))) {
            return false;
        }

        ctx.fillStyle = this.color;
        ctx.fillRect(this.tl.x, this.tl.y, this.width, this.height);

        return true;
    }

    public isOver(that: Rectangle): boolean {
        let thatNotLeft: boolean = this.tl.x < that.br.x;
        let thatNotRight: boolean = this.br.x > that.tl.x;
        let thatNotOver: boolean = this.tl.y < that.br.y;
        let thatNotUnder: boolean = this.br.y > that.tl.y;

        return thatNotLeft && thatNotRight && thatNotOver && thatNotUnder;

    }

    public goUp(up: number): void {
        this.setPosition(this.tl.x, this.tl.y - up);
    }

    public goLeft(left: number): void {
        this.setPosition(this.tl.x - left, this.tl.y);
    }

    public goRight(right: number): void {
        this.setPosition(this.tl.x + right, this.tl.y);
    }

    public goDown(down: number): void {
        this.setPosition(this.tl.x, this.tl.y + down);
    }

    public setPosition(x: number, y: number): void {
        this.tl = new V2(x, y);
        this.br = new V2(x + this.width, y + this.height);
    }
}
