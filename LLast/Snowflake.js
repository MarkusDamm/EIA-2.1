"use strict";
var MyFuwa_last;
(function (MyFuwa_last) {
    class Snowflake extends MyFuwa_last.Moveable {
        constructor(_position) {
            super(_position);
            this.gradient = MyFuwa_last.crc2.createRadialGradient(0, 0, 2, 0, 0, 5);
            this.velocity = new MyFuwa_last.Vector(0, Math.random() * 3);
            this.gradient.addColorStop(0, "RGBA(250, 250, 250, 0.8)");
            this.gradient.addColorStop(1, "RGBA(250, 250, 250, 0.2)");
            this.draw();
        }
        draw() {
            MyFuwa_last.crc2.save();
            MyFuwa_last.crc2.beginPath();
            MyFuwa_last.crc2.translate(this.position.x, this.position.y);
            MyFuwa_last.crc2.fillStyle = this.gradient;
            MyFuwa_last.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            MyFuwa_last.crc2.fill();
            MyFuwa_last.crc2.restore();
        }
    }
    MyFuwa_last.Snowflake = Snowflake;
})(MyFuwa_last || (MyFuwa_last = {}));
//# sourceMappingURL=Snowflake.js.map