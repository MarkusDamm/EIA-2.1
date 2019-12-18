"use strict";
var MyFuwa_10;
(function (MyFuwa_10) {
    class Ghb extends MyFuwa_10.Object {
        constructor(_position) {
            super(_position);
            this.draw();
        }
        draw() {
            // console.log("Mal GHB");
            MyFuwa_10.crc2.save();
            MyFuwa_10.crc2.translate(this.position.x, this.position.y);
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.moveTo(0, 0);
            MyFuwa_10.crc2.lineTo(80, 0);
            MyFuwa_10.crc2.lineTo(80, -200);
            MyFuwa_10.crc2.bezierCurveTo(60, -210, 20, -210, 0, -200);
            MyFuwa_10.crc2.closePath();
            MyFuwa_10.crc2.fillStyle = "lightgrey";
            MyFuwa_10.crc2.stroke();
            MyFuwa_10.crc2.fill();
            MyFuwa_10.crc2.beginPath();
            MyFuwa_10.crc2.moveTo(30, 0);
            MyFuwa_10.crc2.lineTo(35, 0);
            MyFuwa_10.crc2.lineTo(35, -208);
            MyFuwa_10.crc2.lineTo(30, -207);
            MyFuwa_10.crc2.closePath();
            MyFuwa_10.crc2.fillStyle = "grey";
            MyFuwa_10.crc2.fill();
            MyFuwa_10.crc2.stroke();
            MyFuwa_10.crc2.restore();
        }
    }
    MyFuwa_10.Ghb = Ghb;
})(MyFuwa_10 || (MyFuwa_10 = {}));
//# sourceMappingURL=Ghb.js.map