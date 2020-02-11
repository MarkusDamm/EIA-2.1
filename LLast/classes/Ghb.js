"use strict";
var MyFuwa_last;
(function (MyFuwa_last) {
    class Ghb extends MyFuwa_last.Object {
        // Drawn by Markus Damm
        constructor(_position) {
            super(_position);
            this.draw();
        }
        draw() {
            // console.log("Mal GHB");
            MyFuwa_last.crc2.save();
            MyFuwa_last.crc2.translate(this.position.x, this.position.y);
            MyFuwa_last.crc2.beginPath();
            MyFuwa_last.crc2.moveTo(0, 0);
            MyFuwa_last.crc2.lineTo(80, 0);
            MyFuwa_last.crc2.lineTo(80, -200);
            MyFuwa_last.crc2.bezierCurveTo(60, -210, 20, -210, 0, -200);
            MyFuwa_last.crc2.closePath();
            MyFuwa_last.crc2.fillStyle = "lightgrey";
            MyFuwa_last.crc2.stroke();
            MyFuwa_last.crc2.fill();
            MyFuwa_last.crc2.beginPath();
            MyFuwa_last.crc2.moveTo(30, 0);
            MyFuwa_last.crc2.lineTo(35, 0);
            MyFuwa_last.crc2.lineTo(35, -208);
            MyFuwa_last.crc2.lineTo(30, -207);
            MyFuwa_last.crc2.closePath();
            MyFuwa_last.crc2.fillStyle = "grey";
            MyFuwa_last.crc2.fill();
            MyFuwa_last.crc2.stroke();
            MyFuwa_last.crc2.restore();
        }
    }
    MyFuwa_last.Ghb = Ghb;
})(MyFuwa_last || (MyFuwa_last = {}));
//# sourceMappingURL=Ghb.js.map