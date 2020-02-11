"use strict";
var MyFuwa_last;
(function (MyFuwa_last) {
    class Bird extends MyFuwa_last.Moveable {
        constructor(_position) {
            super(_position);
            this.isInvoked = true;
            this.changeTarget = (_target) => {
                if (!this.isInvoked)
                    return;
                if (_target)
                    this.target = _target;
                else if (Math.random() <= 0.05)
                    this.target = MyFuwa_last.birdHousePolePosition;
                else
                    this.target = new MyFuwa_last.Vector(Math.random() * MyFuwa_last.canvas.width, 500 + Math.random() * (MyFuwa_last.canvas.height - 510));
                this.velocity = MyFuwa_last.Vector.getDifference(this.target, this.position);
                this.velocity.scale(0.01 + Math.random() * 0.01);
                if (this.velocity.x < 0)
                    this.xInverted = -1;
                else
                    this.xInverted = 1;
                this.isInvoked = false;
                // console.log("Zielen");
            };
            this.changePecking = () => {
                if (!this.isPecking) {
                    this.isPecking = true;
                    setTimeout(this.changePecking, 500);
                }
                else {
                    this.isPecking = false;
                    this.isThinking = false;
                }
            };
            this.colorBody = Bird.getRandomColor();
            this.colorTail = Bird.getRandomColor();
            this.depth = this.isTrained = this.isPecking = this.isThinking = false;
            if (Math.random() <= 0.3) {
                this.depth = true;
            }
            if (Math.random() <= 0.5) {
                this.velocity = new MyFuwa_last.Vector(-4 + Math.random() * 8, -2 + Math.random() * 4);
                // this.velocity = Vector.getRandom(2, 5);
                if (this.velocity.x <= 0) {
                    this.xInverted = -1;
                    this.velocity.x -= 3;
                }
                else {
                    this.xInverted = 1;
                    this.velocity.x += 3;
                }
            }
            else {
                this.changeTarget();
                if (Math.random() <= 0.2) {
                    this.isTrained = true;
                }
            }
            this.draw();
        }
        static getRandomColor() {
            let letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        update() {
            if (this.target && (this.position == this.target || (this.position.x <= this.target.x + 10 && this.position.y <= this.target.y + 10 && this.position.x >= this.target.x - 10 && this.position.y >= this.target.y - 10))) {
                this.velocity.x = this.velocity.y = 0;
                this.draw();
                // console.log("at destination");
                if (this.isInvoked == false) {
                    setTimeout(this.changeTarget, 5000);
                    this.isInvoked = true;
                }
                if (this.isThinking == false) {
                    setTimeout(this.changePecking, 500);
                    this.isThinking = true;
                }
            }
            else {
                super.update();
            }
        }
        get getPosition() {
            return this.position;
        }
        draw() {
            // console.log("Draw Bird");
            MyFuwa_last.crc2.save();
            MyFuwa_last.crc2.translate(this.position.x, this.position.y);
            MyFuwa_last.crc2.scale(0.8, 0.8);
            MyFuwa_last.crc2.beginPath();
            if (this.velocity.x != 0 && this.target || this.position.y <= 550 && !this.target) {
                //Beak
                MyFuwa_last.crc2.fillStyle = "black";
                MyFuwa_last.crc2.beginPath();
                MyFuwa_last.crc2.moveTo(this.xInverted * 65, 0);
                MyFuwa_last.crc2.lineTo(this.xInverted * 50, -8);
                MyFuwa_last.crc2.lineTo(this.xInverted * 50, 8);
                MyFuwa_last.crc2.closePath();
                MyFuwa_last.crc2.fill();
                //Tail
                MyFuwa_last.crc2.fillStyle = this.colorTail;
                MyFuwa_last.crc2.beginPath();
                MyFuwa_last.crc2.moveTo(this.xInverted * -20, 0);
                MyFuwa_last.crc2.lineTo(this.xInverted * -40, -5);
                MyFuwa_last.crc2.lineTo(this.xInverted * -40, 5);
                MyFuwa_last.crc2.closePath();
                MyFuwa_last.crc2.fill();
                //Backwing
                MyFuwa_last.crc2.fillStyle = this.colorBody;
                MyFuwa_last.crc2.beginPath();
                MyFuwa_last.crc2.moveTo(this.xInverted * 10, 0);
                MyFuwa_last.crc2.quadraticCurveTo(this.xInverted * 30, -20, this.xInverted * 20, -45);
                MyFuwa_last.crc2.quadraticCurveTo(this.xInverted * 0, -22, this.xInverted * 10, 0);
                MyFuwa_last.crc2.closePath(); // Coded by Markus Damm
                MyFuwa_last.crc2.stroke();
                MyFuwa_last.crc2.fill();
                //Body
                MyFuwa_last.crc2.beginPath();
                if (this.xInverted == 1)
                    MyFuwa_last.crc2.arc(this.xInverted * 43, 0, 12, Math.PI * 0.9, Math.PI * 1, true);
                else
                    MyFuwa_last.crc2.arc(this.xInverted * 43, 0, 12, Math.PI * 1, Math.PI * 0.9);
                MyFuwa_last.crc2.moveTo(this.xInverted * 43, 0);
                MyFuwa_last.crc2.quadraticCurveTo(0, -25, this.xInverted * -25, 0);
                MyFuwa_last.crc2.quadraticCurveTo(0, 20, this.xInverted * 43, 0);
                MyFuwa_last.crc2.stroke();
                MyFuwa_last.crc2.fill();
                MyFuwa_last.crc2.closePath();
                //Frontwing
                MyFuwa_last.crc2.beginPath();
                MyFuwa_last.crc2.moveTo(this.xInverted * 10, 0);
                MyFuwa_last.crc2.quadraticCurveTo(this.xInverted * 20, -20, 0, -45);
                MyFuwa_last.crc2.quadraticCurveTo(this.xInverted * -10, -22, this.xInverted * 10, 0);
                MyFuwa_last.crc2.closePath();
                MyFuwa_last.crc2.stroke();
            }
            else {
                //Feet
                MyFuwa_last.crc2.strokeStyle = "black";
                MyFuwa_last.crc2.lineWidth = 2;
                MyFuwa_last.crc2.moveTo(0, -30);
                MyFuwa_last.crc2.lineTo(this.xInverted * -10, 0);
                MyFuwa_last.crc2.lineTo(0, -30);
                MyFuwa_last.crc2.lineTo(this.xInverted * 10, 0);
                MyFuwa_last.crc2.stroke();
                MyFuwa_last.crc2.closePath();
                if (this.isPecking) {
                    MyFuwa_last.crc2.rotate(Math.PI * 0.3 * this.xInverted);
                    MyFuwa_last.crc2.translate(12 * -this.xInverted, 14);
                }
                //Beak
                MyFuwa_last.crc2.fillStyle = "black";
                MyFuwa_last.crc2.beginPath();
                MyFuwa_last.crc2.moveTo(this.xInverted * 50, -50);
                MyFuwa_last.crc2.lineTo(this.xInverted * 35, -58);
                MyFuwa_last.crc2.lineTo(this.xInverted * 35, -42);
                MyFuwa_last.crc2.closePath();
                MyFuwa_last.crc2.fill();
                //Tail
                MyFuwa_last.crc2.fillStyle = this.colorTail;
                MyFuwa_last.crc2.beginPath();
                MyFuwa_last.crc2.moveTo(this.xInverted * -10, -30);
                MyFuwa_last.crc2.lineTo(this.xInverted * -40, -12);
                MyFuwa_last.crc2.lineTo(this.xInverted * -37, -4);
                MyFuwa_last.crc2.closePath();
                MyFuwa_last.crc2.fill();
                //Body
                MyFuwa_last.crc2.fillStyle = this.colorBody;
                MyFuwa_last.crc2.beginPath();
                MyFuwa_last.crc2.moveTo(this.xInverted * 30, -50);
                if (this.xInverted == 1)
                    MyFuwa_last.crc2.arc(30, -50, 12, Math.PI * 0.7, Math.PI * 1.1, true);
                else
                    MyFuwa_last.crc2.arc(this.xInverted * 30, -50, 12, Math.PI * 0.1, Math.PI * 0);
                MyFuwa_last.crc2.quadraticCurveTo(this.xInverted * -10, -50, this.xInverted * -25, -20);
                MyFuwa_last.crc2.quadraticCurveTo(this.xInverted * 10, -10, this.xInverted * 30, -50);
            }
            MyFuwa_last.crc2.fill();
            MyFuwa_last.crc2.scale(1, 1);
            MyFuwa_last.crc2.restore();
        }
    }
    MyFuwa_last.Bird = Bird;
})(MyFuwa_last || (MyFuwa_last = {}));
//# sourceMappingURL=Bird.js.map