"use strict";
var MyFuwa_09;
(function (MyFuwa_09) {
    class Ghb extends MyFuwa_09.Object {
        constructor(_position) {
            super(_position);
            this.draw();
        }
        draw() {
            // console.log("Mal GHB");
            MyFuwa_09.crc2.save();
            MyFuwa_09.crc2.translate(this.position.x, this.position.y);
            MyFuwa_09.crc2.beginPath();
            MyFuwa_09.crc2.moveTo(0, 0);
            MyFuwa_09.crc2.lineTo(80, 0);
            MyFuwa_09.crc2.lineTo(80, -200);
            MyFuwa_09.crc2.bezierCurveTo(60, -210, 20, -210, 0, -200);
            MyFuwa_09.crc2.closePath();
            MyFuwa_09.crc2.fillStyle = "lightgrey";
            MyFuwa_09.crc2.stroke();
            MyFuwa_09.crc2.fill();
            MyFuwa_09.crc2.beginPath();
            MyFuwa_09.crc2.moveTo(30, 0);
            MyFuwa_09.crc2.lineTo(35, 0);
            MyFuwa_09.crc2.lineTo(35, -208);
            MyFuwa_09.crc2.lineTo(30, -207);
            MyFuwa_09.crc2.closePath();
            MyFuwa_09.crc2.fillStyle = "grey";
            MyFuwa_09.crc2.fill();
            MyFuwa_09.crc2.stroke();
            MyFuwa_09.crc2.restore();
        }
    }
    MyFuwa_09.Ghb = Ghb;
})(MyFuwa_09 || (MyFuwa_09 = {}));
//# sourceMappingURL=Ghb.js.map