namespace MyFuwa_last {
    export class Snowflake extends Moveable {
        gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 2, 0, 0, 5);
        // Coded by Markus Damm
        constructor(_position: Vector) {
            super(_position);
            this.velocity = new Vector(0, Math.random() * 3);
            this.gradient.addColorStop(0, "RGBA(250, 250, 250, 0.8)");
            this.gradient.addColorStop(1, "RGBA(250, 250, 250, 0.2)");
            this.draw();
        }

        private draw(): void {
            crc2.save();

            crc2.beginPath();
            
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = this.gradient;
            crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            crc2.fill();

            crc2.restore();
        }
    }
}