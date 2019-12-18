namespace MyFuwa_10 {
    export class Bird extends Moveable {
        colorBody: string;
        colorTail: string;
        xInverted: number;
        depth: boolean;

        constructor(_position: Vector) {
            super(_position);
            this.velocity = new Vector(2 + Math.random() * 4, -2 + Math.random() * 4);
            this.colorBody = this.getRandomColor();
            this.colorTail = this.getRandomColor();
            if (this.position.y <= 480)
                this.drawFly();
            else
                this.drawStand();
            this.depth = false;
            if (Math.random() <= 0.4) {
                this.depth = true;
            }
        }

        drawFly(): void {
            // console.log("Draw Bird");

            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.scale(0.8, 0.8);
            crc2.beginPath();

            //Beak
            crc2.fillStyle = "black";
            crc2.beginPath();
            crc2.moveTo(65, 0);
            crc2.lineTo(50, -8);
            crc2.lineTo(50, 8);
            crc2.closePath();
            crc2.fill();

            //Tail
            crc2.fillStyle = this.colorTail;
            crc2.beginPath();
            crc2.moveTo(-20, 0);
            crc2.lineTo(-40, -5);
            crc2.lineTo(-40, 5);
            crc2.closePath();
            crc2.fill();

            //Backwing
            crc2.fillStyle = this.colorBody;
            crc2.beginPath();
            crc2.moveTo(10, 0);
            crc2.quadraticCurveTo(30, -20, 20, -45);
            crc2.quadraticCurveTo(0, -22, 10, 0);
            crc2.closePath();
            crc2.stroke();
            crc2.fill();

            //Body
            crc2.beginPath();
            crc2.arc(43, 0, 12, Math.PI * 0.9, Math.PI * 1, true);
            crc2.moveTo(43, 0);
            crc2.quadraticCurveTo(0, -25, -25, 0);
            crc2.quadraticCurveTo(0, 20, 43, 0);
            crc2.stroke();
            crc2.fill();
            crc2.closePath();

            //Frontwing
            crc2.beginPath();
            crc2.moveTo(10, 0);
            crc2.quadraticCurveTo(20, -20, 0, -45);
            crc2.quadraticCurveTo(-10, -22, 10, 0);
            crc2.closePath();
            crc2.stroke();
            crc2.fill();


            crc2.scale(1, 1);
            crc2.restore();
        }

        drawStand(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.scale(0.8, 0.8);
            crc2.beginPath();

            //Feet
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.moveTo(0, -30);
            crc2.lineTo(-10, 0);
            crc2.lineTo(0, -30);
            crc2.lineTo(10, 0);
            crc2.stroke();
            crc2.closePath();

            //Beak
            crc2.fillStyle = "black";
            crc2.beginPath();
            crc2.moveTo(50, -50);
            crc2.lineTo(35, -58);
            crc2.lineTo(35, -42);
            crc2.closePath();
            crc2.fill();

            //Tail
            crc2.fillStyle = this.colorTail;
            crc2.beginPath();
            crc2.moveTo(-10, -30);
            crc2.lineTo(-40, -12);
            crc2.lineTo(-37, -4);
            crc2.closePath();
            crc2.fill();

            //Body
            crc2.fillStyle = this.colorBody;
            crc2.beginPath();
            crc2.moveTo(30, -50);
            crc2.arc(30, -50, 12, Math.PI * 0.7, Math.PI * 1.1, true);
            crc2.quadraticCurveTo(-10, -50, -25, -20);
            crc2.quadraticCurveTo(10, -10, 30, -50);

            crc2.fill();

            crc2.scale(1, 1);
            crc2.restore();

        }

        getRandomColor(): string {
            let letters: string = "0123456789ABCDEF";
            let color: string = "#";
            for (let i: number = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        update(): void {
            this.move();
            if (this.position.y <= 480)
                this.drawFly();
            else
                this.drawStand();
        }
    }
}