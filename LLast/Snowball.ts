namespace MyFuwa_last {

    export class Snowball extends Moveable {
        current: Vector;
        size: number;
        time: number = 30;

        constructor(_position: Vector) {
            super(_position);
            this.size = 30;
            this.current = new Vector(canvas.width, canvas.height);
            this.velocity = new Vector(this.position.x - this.current.x, this.position.y - this.current.y);
            this.velocity.scale(1 / this.time);    // 30 = fps -> 1sec Flugzeit
        }

        move(): void {
            this.current.add(this.velocity);
        }

        draw(): void {
            crc2.save();
            crc2.translate(this.current.x, this.current.y);
            crc2.beginPath();
            crc2.arc(0, 0, this.size, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }

        isHitting(_position: Vector): boolean {

            return true;
        }

        update(): void {
            this.size -= 0.5;
            super.update();
            if (this.size < 15) {
                for (let bird of birds) {
                    if (this.isHitting(bird.position.getValue())) {

                    }
                }
            }

        }
    }
}