"use strict";
var MyFuwa_10;
(function (MyFuwa_10) {
    class Moveable extends MyFuwa_10.Object {
        move() {
            this.position.add(this.velocity);
            if (this.position.x >= MyFuwa_10.canvas.width + 60) {
                this.position.x = -50;
            }
            if (this.position.x <= -60) {
                this.position.x = MyFuwa_10.canvas.width + 50;
            }
            if (this.position.y >= MyFuwa_10.canvas.height + 60) {
                this.position.y = -50;
            }
            if (this.position.y <= -60) {
                this.position.y = MyFuwa_10.canvas.height + 50;
            }
        }
        update() {
            this.move();
            this.draw();
        }
    }
    MyFuwa_10.Moveable = Moveable;
})(MyFuwa_10 || (MyFuwa_10 = {}));
//# sourceMappingURL=Moveable.js.map