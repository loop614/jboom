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
        if (this.isOutOfCanvas(canvasWidth, canvasHeight)) {
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

    public moveUp(up: number): void {
        this.setPosition(this.tl.x, this.tl.y - up);
    }

    protected setPosition(x: number, y: number): void {
        this.tl = new V2(x, y);
        this.br = new V2(x + this.width, y + this.height);
    }

    private isOutOfCanvas(canvasWidth: number, canvasHeight: number): boolean {
        let isLeftOf: boolean = this.tl.x + this.width < 0;
        let isUpOf: boolean = this.tl.y + this.height < 0;
        let isRightOf: boolean = this.tl.x - this.width > canvasWidth;
        let isDownOf: boolean = this.tl.y - this.height > canvasHeight;

        return isLeftOf || isRightOf || isUpOf || isDownOf;
    }
}
