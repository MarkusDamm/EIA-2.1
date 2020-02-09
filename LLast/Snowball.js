"use strict";
var MyFuwa_last;
(function (MyFuwa_last) {
    class Snowball extends MyFuwa_last.Moveable {
        constructor(_position) {
            super(_position);
            this.size = 40;
            this.current = new MyFuwa_last.Vector(MyFuwa_last.canvas.width, MyFuwa_last.canvas.height);
            this.velocity = new MyFuwa_last.Vector(this.position.x - this.current.x, this.position.y - this.current.y);
            this.velocity.scale(1 / MyFuwa_last.fps); // 30 = fps -> 1sec Flugzeit
        }
        move() {
            this.current.add(this.velocity);
        }
        draw() {
            MyFuwa_last.crc2.save();
            MyFuwa_last.crc2.translate(this.current.x, this.current.y);
            MyFuwa_last.crc2.beginPath();
            MyFuwa_last.crc2.arc(0, 0, this.size, 0, 2 * Math.PI);
            MyFuwa_last.crc2.stroke();
            MyFuwa_last.crc2.closePath();
            MyFuwa_last.crc2.fillStyle = "white";
            MyFuwa_last.crc2.fill();
            MyFuwa_last.crc2.restore();
        }
        isHitting(_position) {
            let distance = MyFuwa_last.Vector.getDifference(_position, this.position);
            if (distance.length <= 40) {
                return true;
            }
            else
                return false;
        }
        update() {
            this.size -= 0.5;
            super.update();
            if (this.size < 25) {
                for (let i = 0; i < MyFuwa_last.birds.length; i++) {
                    if (this.isHitting(MyFuwa_last.birds[i].getPosition)) {
                        MyFuwa_last.birds.splice(i, 1); // Nicht ganz sauber, da Vögel "übersprungen" werden könnten. Oder man behauptet, sie weichen aus
                    }
                }
                MyFuwa_last.snowballs.shift();
                console.log(MyFuwa_last.birds);
            }
        }
    }
    MyFuwa_last.Snowball = Snowball;
})(MyFuwa_last || (MyFuwa_last = {}));
//# sourceMappingURL=Snowball.js.map