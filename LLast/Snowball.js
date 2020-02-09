"use strict";
var MyFuwa_last;
(function (MyFuwa_last) {
    class Snowball extends MyFuwa_last.Moveable {
        constructor(_position) {
            super(_position);
            this.time = 30;
            this.size = 30;
            this.current = new MyFuwa_last.Vector(MyFuwa_last.canvas.width, MyFuwa_last.canvas.height);
            this.velocity = new MyFuwa_last.Vector(this.position.x - this.current.x, this.position.y - this.current.y);
            this.velocity.scale(1 / this.time); // 30 = fps -> 1sec Flugzeit
        }
        move() {
            this.current.add(this.velocity);
        }
        draw() {
            MyFuwa_last.crc2.save();
            MyFuwa_last.crc2.translate(this.current.x, this.current.y);
            MyFuwa_last.crc2.beginPath();
            MyFuwa_last.crc2.arc(0, 0, this.size, 0, 2 * Math.PI);
            MyFuwa_last.crc2.closePath();
            MyFuwa_last.crc2.fill();
            MyFuwa_last.crc2.restore();
        }
        isHitting(_position) {
            return true;
        }
        update() {
            this.size -= 0.5;
            super.update();
            if (this.size < 15) {
                for (let bird of MyFuwa_last.birds) {
                    if (this.isHitting(bird.position.getValue())) {
                    }
                }
            }
        }
    }
    MyFuwa_last.Snowball = Snowball;
})(MyFuwa_last || (MyFuwa_last = {}));
//# sourceMappingURL=Snowball.js.map