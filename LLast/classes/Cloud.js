"use strict";
var MyFuwa_last;
(function (MyFuwa_last) {
    class Cloud extends MyFuwa_last.Thing {
        constructor(_position, _size) {
            super(_position);
            this.nParticles = 40;
            this.rParticle = 50;
            // this.velocity = new Vector(2, 0);
            this.particle = new Path2D();
            // this.position = _position;
            this.size = _size;
            this.draw();
        }
        draw() {
            let gradient = MyFuwa_last.crc2.createRadialGradient(0, 0, 0, 0, 0, this.rParticle);
            this.particle.arc(0, 0, this.rParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            MyFuwa_last.crc2.save();
            MyFuwa_last.crc2.translate(this.position.x, this.position.y);
            MyFuwa_last.crc2.fillStyle = gradient;
            for (let drawn = 0; drawn < this.nParticles; drawn++) {
                MyFuwa_last.crc2.save();
                let x = (Math.random() - 0.5) * this.size.x;
                let y = -(Math.random() * this.size.y);
                MyFuwa_last.crc2.translate(x, y);
                MyFuwa_last.crc2.fill(this.particle);
                MyFuwa_last.crc2.restore();
            }
            MyFuwa_last.crc2.restore();
        }
    }
    MyFuwa_last.Cloud = Cloud;
})(MyFuwa_last || (MyFuwa_last = {}));
//# sourceMappingURL=Cloud.js.map