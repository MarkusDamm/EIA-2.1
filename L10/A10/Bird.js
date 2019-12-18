"use strict";
var MyFuwa_10;
(function (MyFuwa_10) {
    class Bird extends MyFuwa_10.Moveable {
        constructor(_position) {
            super(_position);
            this.velocity = new MyFuwa_10.Vector(2 + Math.random() * 4, -2 + Math.random() * 4);
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
        drawFly() {
            // console.log("Draw Bird");
            MyFuwa_10.crc2.save();
            MyFuwa_10.crc2.translate(this.position.x, this.position.y);
            MyFuwa_10.crc2.scale(0.8, 0.8);
            MyFuwa_10.crc2.beginPath();
            //Beak
            MyFuwa_10.crc2.fillStyle = "black";
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.moveTo(65, 0);
            MyFuwa_10.crc2.lineTo(50, -8);
            MyFuwa_10.crc2.lineTo(50, 8);
            MyFuwa_10.crc2.closePath();
            MyFuwa_10.crc2.fill();
            //Tail
            MyFuwa_10.crc2.fillStyle = this.colorTail;
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.moveTo(-20, 0);
            MyFuwa_10.crc2.lineTo(-40, -5);
            MyFuwa_10.crc2.lineTo(-40, 5);
            MyFuwa_10.crc2.closePath();
            MyFuwa_10.crc2.fill();
            //Backwing
            MyFuwa_10.crc2.fillStyle = this.colorBody;
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.moveTo(10, 0);
            MyFuwa_10.crc2.quadraticCurveTo(30, -20, 20, -45);
            MyFuwa_10.crc2.quadraticCurveTo(0, -22, 10, 0);
            MyFuwa_10.crc2.closePath();
            MyFuwa_10.crc2.stroke();
            MyFuwa_10.crc2.fill();
            //Body
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.arc(43, 0, 12, Math.PI * 0.9, Math.PI * 1, true);
            MyFuwa_10.crc2.moveTo(43, 0);
            MyFuwa_10.crc2.quadraticCurveTo(0, -25, -25, 0);
            MyFuwa_10.crc2.quadraticCurveTo(0, 20, 43, 0);
            MyFuwa_10.crc2.stroke();
            MyFuwa_10.crc2.fill();
            MyFuwa_10.crc2.closePath();
            //Frontwing
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.moveTo(10, 0);
            MyFuwa_10.crc2.quadraticCurveTo(20, -20, 0, -45);
            MyFuwa_10.crc2.quadraticCurveTo(-10, -22, 10, 0);
            MyFuwa_10.crc2.closePath();
            MyFuwa_10.crc2.stroke();
            MyFuwa_10.crc2.fill();
            MyFuwa_10.crc2.scale(1, 1);
            MyFuwa_10.crc2.restore();
        }
        drawStand() {
            MyFuwa_10.crc2.save();
            MyFuwa_10.crc2.translate(this.position.x, this.position.y);
            MyFuwa_10.crc2.scale(0.8, 0.8);
            MyFuwa_10.crc2.beginPath();
            //Feet
            MyFuwa_10.crc2.strokeStyle = "black";
            MyFuwa_10.crc2.lineWidth = 2;
            MyFuwa_10.crc2.moveTo(0, -30);
            MyFuwa_10.crc2.lineTo(-10, 0);
            MyFuwa_10.crc2.lineTo(0, -30);
            MyFuwa_10.crc2.lineTo(10, 0);
            MyFuwa_10.crc2.stroke();
            MyFuwa_10.crc2.closePath();
            //Beak
            MyFuwa_10.crc2.fillStyle = "black";
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.moveTo(50, -50);
            MyFuwa_10.crc2.lineTo(35, -58);
            MyFuwa_10.crc2.lineTo(35, -42);
            MyFuwa_10.crc2.closePath();
            MyFuwa_10.crc2.fill();
            //Tail
            MyFuwa_10.crc2.fillStyle = this.colorTail;
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.moveTo(-10, -30);
            MyFuwa_10.crc2.lineTo(-40, -12);
            MyFuwa_10.crc2.lineTo(-37, -4);
            MyFuwa_10.crc2.closePath();
            MyFuwa_10.crc2.fill();
            //Body
            MyFuwa_10.crc2.fillStyle = this.colorBody;
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.moveTo(30, -50);
            MyFuwa_10.crc2.arc(30, -50, 12, Math.PI * 0.7, Math.PI * 1.1, true);
            MyFuwa_10.crc2.quadraticCurveTo(-10, -50, -25, -20);
            MyFuwa_10.crc2.quadraticCurveTo(10, -10, 30, -50);
            MyFuwa_10.crc2.fill();
            MyFuwa_10.crc2.scale(1, 1);
            MyFuwa_10.crc2.restore();
        }
        getRandomColor() {
            let letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        update() {
            this.move();
            if (this.position.y <= 480)
                this.drawFly();
            else
                this.drawStand();
        }
    }
    MyFuwa_10.Bird = Bird;
})(MyFuwa_10 || (MyFuwa_10 = {}));
//# sourceMappingURL=Bird.js.map