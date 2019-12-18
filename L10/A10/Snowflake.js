"use strict";
var MyFuwa_10;
(function (MyFuwa_10) {
    class Snowflake extends MyFuwa_10.Moveable {
        constructor(_position) {
            super(_position);
            this.gradient = MyFuwa_10.crc2.createRadialGradient(0, 0, 2, 0, 0, 5);
            this.velocity = new MyFuwa_10.Vector(0, Math.random() * 3);
            this.gradient.addColorStop(0, "RGBA(250, 250, 250, 0.8)");
            this.gradient.addColorStop(1, "RGBA(250, 250, 250, 0.2)");
            this.draw();
        }
        draw() {
            MyFuwa_10.crc2.save();
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.translate(this.position.x, this.position.y);
            MyFuwa_10.crc2.fillStyle = this.gradient;
            MyFuwa_10.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            MyFuwa_10.crc2.fill();
            MyFuwa_10.crc2.restore();
        }
    }
    MyFuwa_10.Snowflake = Snowflake;
})(MyFuwa_10 || (MyFuwa_10 = {}));
//# sourceMappingURL=Snowflake.js.map