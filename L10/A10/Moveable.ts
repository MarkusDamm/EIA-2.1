namespace MyFuwa_10 {
    export class Moveable extends Object {
        velocity: Vector;

        move(): void {
            this.position.add(this.velocity);
            if (this.position.x >= canvas.width + 60) {
                this.position.x = - 50;
            }
            if (this.position.x <= - 60) {
                this.position.x = canvas.width + 50;
            }
            if (this.position.y >= canvas.height + 60) {
                this.position.y = - 50;
            }
            if (this.position.y <= - 60) {
                this.position.y = canvas.height + 50;
            }
        }

        update(): void {
            this.move();
            this.draw();
        }
    }
}