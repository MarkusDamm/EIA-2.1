namespace MyFuwa_last {

    export class Snowball extends Moveable {
        current: Vector;
        size: number;

        constructor(_position: Vector) {
            if (score > 0)  score--;
            
            scoreElement.innerText = score.toString();
            super(_position);
            this.size = 40;
            this.current = new Vector(canvas.width, canvas.height);
            this.velocity = new Vector(this.position.x - this.current.x, this.position.y - this.current.y);
            this.velocity.scale(1 / fps);    // 30 = fps -> 1sec Flugzeit
        }

        public update(): void {
            this.size -= 0.5;
            super.update();
            if (this.size < 25) {
                this.impact();
            }
        }

        private move(): void {
            this.current.add(this.velocity);
        }

        private draw(): void {
            crc2.save();
            crc2.translate(this.current.x, this.current.y);
            crc2.beginPath();
            crc2.arc(0, 0, this.size, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.closePath();
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.restore();
        }

        private isHitting(_position: Vector): boolean {
            let distance: Vector = Vector.getDifference(_position, this.position);
            if (distance.length <= 40) {
                return true;
            }
            else return false;
        }

        private impact(): void {
            // let deleter: number[] = [];
            for (let i: number = 0; i < birds.length; i++) {
                if (this.isHitting(birds[i].getPosition)) {
                    score += 5 + Math.floor(birds[i].velocity.length);
                    birds.splice(i, 1);
                    // deleter.push(i);
                }
            }
            // for (let j: number = deleter.length - 1; j < 0; j--) {
            //     birds.splice(deleter[j], 1);    // Um zu verhindern, dass Vögel bei der oberen Schleife übersprungen werden
            // }
            snowballs.shift();
            scoreElement.innerText = score.toString();
            if (birds.length <= 0) {
                endGame();
            }
            // console.log(birds.length);
        }
    }
}