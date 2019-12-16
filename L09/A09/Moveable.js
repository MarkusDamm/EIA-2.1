"use strict";
var MyFuwa_09;
(function (MyFuwa_09) {
    class Moveable extends MyFuwa_09.Object {
        move() {
            this.position.add(this.velocity);
            if (this.position.x >= MyFuwa_09.canvas.width + 60) {
                this.position.x = -50;
            }
            if (this.position.x <= -60) {
                this.position.x = MyFuwa_09.canvas.width + 50;
            }
            if (this.position.y >= MyFuwa_09.canvas.height + 60) {
                this.position.y = -50;
            }
            if (this.position.y <= -60) {
                this.position.y = MyFuwa_09.canvas.height + 50;
            }
        }
        update() {
            this.move();
            this.draw();
        }
    }
    MyFuwa_09.Moveable = Moveable;
})(MyFuwa_09 || (MyFuwa_09 = {}));
//# sourceMappingURL=Moveable.js.map