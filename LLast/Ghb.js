"use strict";
var MyFuwa_11;
(function (MyFuwa_11) {
    class Ghb extends MyFuwa_11.Object {
        constructor(_position) {
            super(_position);
            this.draw();
        }
        draw() {
            // console.log("Mal GHB");
            MyFuwa_11.crc2.save();
            MyFuwa_11.crc2.translate(this.position.x, this.position.y);
            MyFuwa_11.crc2.beginPath();
            MyFuwa_11.crc2.moveTo(0, 0);
            MyFuwa_11.crc2.lineTo(80, 0);
            MyFuwa_11.crc2.lineTo(80, -200);
            MyFuwa_11.crc2.bezierCurveTo(60, -210, 20, -210, 0, -200);
            MyFuwa_11.crc2.closePath();
            MyFuwa_11.crc2.fillStyle = "lightgrey";
            MyFuwa_11.crc2.stroke();
            MyFuwa_11.crc2.fill();
            MyFuwa_11.crc2.beginPath();
            MyFuwa_11.crc2.moveTo(30, 0);
            MyFuwa_11.crc2.lineTo(35, 0);
            MyFuwa_11.crc2.lineTo(35, -208);
            MyFuwa_11.crc2.lineTo(30, -207);
            MyFuwa_11.crc2.closePath();
            MyFuwa_11.crc2.fillStyle = "grey";
            MyFuwa_11.crc2.fill();
            MyFuwa_11.crc2.stroke();
            MyFuwa_11.crc2.restore();
        }
    }
    MyFuwa_11.Ghb = Ghb;
})(MyFuwa_11 || (MyFuwa_11 = {}));
//# sourceMappingURL=Ghb.js.map