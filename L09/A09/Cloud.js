"use strict";
var MyFuwa_09;
(function (MyFuwa_09) {
    class Cloud extends MyFuwa_09.Moveable {
        constructor(_position, _size) {
            super(_position);
            this.nParticles = 40;
            this.radiusParticle = 50;
            this.velocity = new MyFuwa_09.Vector(2, 0);
            this.particle = new Path2D();
            // this.position = _position;
            this.size = _size;
            this.draw();
        }
        draw() {
            let gradient = MyFuwa_09.crc2.createRadialGradient(0, 0, 0, 0, 0, this.radiusParticle);
            this.particle.arc(0, 0, this.radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            MyFuwa_09.crc2.save();
            MyFuwa_09.crc2.translate(this.position.x, this.position.y);
            MyFuwa_09.crc2.fillStyle = gradient;
            for (let drawn = 0; drawn < this.nParticles; drawn++) {
                MyFuwa_09.crc2.save();
                let x = (Math.random() - 0.5) * this.size.x;
                let y = -(Math.random() * this.size.y);
                MyFuwa_09.crc2.translate(x, y);
                MyFuwa_09.crc2.fill(this.particle);
                MyFuwa_09.crc2.restore();
            }
            MyFuwa_09.crc2.restore();
        }
    }
    MyFuwa_09.Cloud = Cloud;
})(MyFuwa_09 || (MyFuwa_09 = {}));
//# sourceMappingURL=Cloud.js.map