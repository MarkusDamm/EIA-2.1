namespace MyFuwa_last {
    export class Food extends Object {
        lifetime: number;

        constructor(_position: Vector) {
            super(_position);
            this.bait();
            this.lifetime = 3.5 * fps;
        }

        public update(): void {
            if (this.lifetime == 0) {
                this.deleteFood();
            }
            else {
                this.lifetime--;
                this.draw();
            }
        }
        private draw(): void {
            // 2 versions depending on y-position, ground and hanging
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.arc(0, 0, 15, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.closePath();
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.restore();
        }
        private bait(): void {
            // bait the birds
            for (let bird of birds) {
                if (Math.random() <= 0.1) {
                    bird.changeTarget(this.position);
                }
            }
        }
        private deleteFood(): void {
            foods.shift();
        }
    }
}