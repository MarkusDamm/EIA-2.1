"use strict";
var MyFuwa_11;
(function (MyFuwa_11) {
    class Moveable extends MyFuwa_11.Object {
        move() {
            this.position.add(this.velocity);
            if (this.position.x >= MyFuwa_11.canvas.width + 60) {
                this.position.x = -50;
            }
            if (this.position.x <= -60) {
                this.position.x = MyFuwa_11.canvas.width + 50;
            }
            if (this.position.y >= MyFuwa_11.canvas.height + 60) {
                this.position.y = -50;
            }
            if (this.position.y <= -60) {
                this.position.y = MyFuwa_11.canvas.height + 50;
            }
        }
        update() {
            this.move();
            this.draw();
        }
    }
    MyFuwa_11.Moveable = Moveable;
})(MyFuwa_11 || (MyFuwa_11 = {}));
//# sourceMappingURL=Moveable.js.map