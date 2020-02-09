"use strict";
var MyFuwa_last;
(function (MyFuwa_last) {
    class Moveable extends MyFuwa_last.Object {
        update() {
            this.move();
            this.draw();
        }
        move() {
            this.position.add(this.velocity);
            if (this.position.x >= MyFuwa_last.canvas.width + 60) {
                this.position.x = -50;
            }
            if (this.position.x <= -60) {
                this.position.x = MyFuwa_last.canvas.width + 50;
            }
            if (this.position.y >= MyFuwa_last.canvas.height + 60) {
                this.position.y = -50;
            }
            if (this.position.y <= -60) {
                this.position.y = MyFuwa_last.canvas.height + 50;
            }
        }
    }
    MyFuwa_last.Moveable = Moveable;
})(MyFuwa_last || (MyFuwa_last = {}));
//# sourceMappingURL=Moveable.js.map