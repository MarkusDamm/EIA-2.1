"use strict";
var MyFuwa_last;
(function (MyFuwa_last) {
    class Food extends MyFuwa_last.Object {
        constructor(_position) {
            super(_position);
            this.bait();
            this.lifetime = 3.5 * MyFuwa_last.fps;
        }
        update() {
            if (this.lifetime == 0) {
                this.deleteFood();
            }
            else {
                this.lifetime--;
                this.draw();
            }
        }
        draw() {
            // 2 versions depending on y-position, ground and hanging
            MyFuwa_last.crc2.save();
            MyFuwa_last.crc2.translate(this.position.x, this.position.y);
            MyFuwa_last.crc2.beginPath();
            MyFuwa_last.crc2.arc(0, 0, 15, 0, 2 * Math.PI);
            MyFuwa_last.crc2.stroke();
            MyFuwa_last.crc2.closePath();
            MyFuwa_last.crc2.fillStyle = "red";
            MyFuwa_last.crc2.fill();
            MyFuwa_last.crc2.restore();
        }
        bait() {
            // bait the birds
            for (let bird of MyFuwa_last.birds) {
                if (Math.random() <= 0.1) {
                    bird.changeTarget(this.position);
                    // Coded by Markus Damm
                }
            }
        }
        deleteFood() {
            MyFuwa_last.foods.shift();
        }
    }
    MyFuwa_last.Food = Food;
})(MyFuwa_last || (MyFuwa_last = {}));
//# sourceMappingURL=Food.js.map