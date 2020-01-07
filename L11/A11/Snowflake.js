"use strict";
var MyFuwa_11;
(function (MyFuwa_11) {
    class Snowflake extends MyFuwa_11.Moveable {
        constructor(_position) {
            super(_position);
            this.gradient = MyFuwa_11.crc2.createRadialGradient(0, 0, 2, 0, 0, 5);
            this.velocity = new MyFuwa_11.Vector(0, Math.random() * 3);
            this.gradient.addColorStop(0, "RGBA(250, 250, 250, 0.8)");
            this.gradient.addColorStop(1, "RGBA(250, 250, 250, 0.2)");
            this.draw();
        }
        draw() {
            MyFuwa_11.crc2.save();
            MyFuwa_11.crc2.beginPath();
            MyFuwa_11.crc2.translate(this.position.x, this.position.y);
            MyFuwa_11.crc2.fillStyle = this.gradient;
            MyFuwa_11.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            MyFuwa_11.crc2.fill();
            MyFuwa_11.crc2.restore();
        }
    }
    MyFuwa_11.Snowflake = Snowflake;
})(MyFuwa_11 || (MyFuwa_11 = {}));
//# sourceMappingURL=Snowflake.js.map