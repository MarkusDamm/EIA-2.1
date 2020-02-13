namespace MyFuwa_last {
    export abstract class Moveable extends Thing {
        velocity: Vector;
        // Coded by Markus Damm
        public update(): void {
            this.move();
            this.draw();
        }

        protected move(): void {
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
    }
}