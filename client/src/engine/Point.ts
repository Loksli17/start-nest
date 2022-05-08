class Point {

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public x = 0;
    public y = 0;

    public move(x: number, y: number) {
        this.x += x;
        this.y += y;
    }
}


class SystemPoint extends Point {

    private ctx;
    private gap = 6;

    constructor(x: number, y: number, ctx: any) {
        super(x, y);
        this.ctx = ctx;
    }

    public render() {
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(this.x - this.gap / 2, this.y - this.gap / 2, this.gap, this.gap);
        this.ctx.strokeStyle = "#0e0efe";
        this.ctx.strokeRect(this.x - (this.gap / 2) - 1, this.y - (this.gap / 2) - 1, this.gap + 1, this.gap + 1);
    }
}


export {
    Point,
    SystemPoint,
}