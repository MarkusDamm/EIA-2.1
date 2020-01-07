namespace MyFuwa_11 {
    export class Bird extends Moveable {
        colorBody: string;
        colorTail: string;
        xInverted: number;
        depth: boolean;

        target: Vector;
        isTrained: boolean;
        isInvoked: boolean;

        constructor(_position: Vector) {
            super(_position);
            this.colorBody = this.getRandomColor();
            this.colorTail = this.getRandomColor();

            this.changeTarget();

            this.draw();
            this.depth = false;
            if (Math.random() <= 0.3) {
                this.depth = true;
            }
        }

        draw(): void {
            // console.log("Draw Bird");

            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.scale(0.8, 0.8);
            crc2.beginPath();

            if (this.velocity.x != 0) {
                //Beak
                crc2.fillStyle = "black";
                crc2.beginPath();
                crc2.moveTo(this.xInverted * 65, 0);
                crc2.lineTo(this.xInverted * 50, -8);
                crc2.lineTo(this.xInverted * 50, 8);
                crc2.closePath();
                crc2.fill();

                //Tail
                crc2.fillStyle = this.colorTail;
                crc2.beginPath();
                crc2.moveTo(this.xInverted * -20, 0);
                crc2.lineTo(this.xInverted * -40, -5);
                crc2.lineTo(this.xInverted * -40, 5);
                crc2.closePath();
                crc2.fill();

                //Backwing
                crc2.fillStyle = this.colorBody;
                crc2.beginPath();
                crc2.moveTo(this.xInverted * 10, 0);
                crc2.quadraticCurveTo(this.xInverted * 30, -20, this.xInverted * 20, -45);
                crc2.quadraticCurveTo(this.xInverted * 0, -22, this.xInverted * 10, 0);
                crc2.closePath();
                crc2.stroke();
                crc2.fill();

                //Body
                crc2.beginPath();
                if (this.xInverted == 1) 
                    crc2.arc(this.xInverted * 43, 0, 12, Math.PI * 0.9, Math.PI * 1, true);
                else     
                    crc2.arc(this.xInverted * 43, 0, 12, Math.PI * 1, Math.PI * 0.9);
                crc2.moveTo(this.xInverted * 43, 0);
                crc2.quadraticCurveTo(0, -25, this.xInverted * -25, 0);
                crc2.quadraticCurveTo(0, 20, this.xInverted * 43, 0);
                crc2.stroke();
                crc2.fill();
                crc2.closePath();

                //Frontwing
                crc2.beginPath();
                crc2.moveTo(this.xInverted * 10, 0);
                crc2.quadraticCurveTo(this.xInverted * 20, -20, 0, -45);
                crc2.quadraticCurveTo(this.xInverted * -10, -22, this.xInverted * 10, 0);
                crc2.closePath();
                crc2.stroke();
            }
            else {
                //Feet
                crc2.strokeStyle = "black";
                crc2.lineWidth = 2;
                crc2.moveTo(0, -30);
                crc2.lineTo(this.xInverted * -10, 0);
                crc2.lineTo(0, -30);
                crc2.lineTo(this.xInverted * 10, 0);
                crc2.stroke();
                crc2.closePath();

                //Beak
                crc2.fillStyle = "black";
                crc2.beginPath();
                crc2.moveTo(this.xInverted * 50, -50);
                crc2.lineTo(this.xInverted * 35, -58);
                crc2.lineTo(this.xInverted * 35, -42);
                crc2.closePath();
                crc2.fill();

                //Tail
                crc2.fillStyle = this.colorTail;
                crc2.beginPath();
                crc2.moveTo(this.xInverted * -10, -30);
                crc2.lineTo(this.xInverted * -40, -12);
                crc2.lineTo(this.xInverted * -37, -4);
                crc2.closePath();
                crc2.fill();

                //Body
                crc2.fillStyle = this.colorBody;
                crc2.beginPath();
                crc2.moveTo(this.xInverted * 30, -50);
                if (this.xInverted == 1) 
                    crc2.arc(30, -50, 12, Math.PI * 0.7, Math.PI * 1.1, true);
                else    
                    crc2.arc(this.xInverted * 30, -50, 12, Math.PI * 0.1, Math.PI * 0);
                crc2.quadraticCurveTo(this.xInverted * -10, -50, this.xInverted * -25, -20);
                crc2.quadraticCurveTo(this.xInverted * 10, -10, this.xInverted * 30, -50);
            }
            crc2.fill();

            crc2.scale(1, 1);
            crc2.restore();
        }

        update(): void {
            if (this.position == this.target || (this.position.x <= this.target.x + 5 && this.position.y <= this.target.y + 5 && this.position.x >= this.target.x - 5 && this.position.y >= this.target.y - 5)) {
                this.velocity.x = this.velocity.y = 0;
                this.draw();
                // console.log("at destination");
                if (this.isInvoked == false) {
                    setTimeout(this.changeTarget, 5000);
                    this.isInvoked = true;
                }
            }
            else {
                super.update();
            }
        }

        getRandomColor(): string {
            let letters: string = "0123456789ABCDEF";
            let color: string = "#";
            for (let i: number = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        changeTarget(): void {
            this.target = new Vector(Math.random() * canvas.width, 500 + Math.random() * (canvas.height - 510));
            this.velocity = this.target.subtract(this.position);
            this.velocity.scale(0.01 + Math.random() * 0.01);
            if (this.velocity.x < 0)
                this.xInverted = -1;
            else this.xInverted = 1;

            this.isInvoked = false;
            console.log("Zielen");
        }
    }
}