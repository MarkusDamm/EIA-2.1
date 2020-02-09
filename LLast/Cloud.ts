namespace MyFuwa_last {
    export class Cloud extends Moveable {
        size: Vector;
        nParticles: number = 40;
        rParticle: number = 50;
        particle: Path2D;

        constructor(_position: Vector, _size: Vector) {
            super(_position);
            this.velocity = new Vector(2, 0);
            this.particle = new Path2D();
            // this.position = _position;
            this.size = _size;
            this.draw();
        }

        private draw(): void {
            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, this.rParticle);

            this.particle.arc(0, 0, this.rParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;

            for (let drawn: number = 0; drawn < this.nParticles; drawn++) {
                crc2.save();
                let x: number = (Math.random() - 0.5) * this.size.x;
                let y: number = - (Math.random() * this.size.y);
                crc2.translate(x, y);
                crc2.fill(this.particle);
                crc2.restore();
            }
            crc2.restore();
        }
    }
}