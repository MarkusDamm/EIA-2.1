"use strict";
var MyFuwa_10;
(function (MyFuwa_10) {
    class Cloud extends MyFuwa_10.Moveable {
        constructor(_position, _size) {
            super(_position);
            this.nParticles = 40;
            this.rParticle = 50;
            this.velocity = new MyFuwa_10.Vector(2, 0);
            this.particle = new Path2D();
            // this.position = _position;
            this.size = _size;
            this.draw();
        }
        draw() {
            let gradient = MyFuwa_10.crc2.createRadialGradient(0, 0, 0, 0, 0, this.rParticle);
            this.particle.arc(0, 0, this.rParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            MyFuwa_10.crc2.save();
            MyFuwa_10.crc2.translate(this.position.x, this.position.y);
            MyFuwa_10.crc2.fillStyle = gradient;
            for (let drawn = 0; drawn < this.nParticles; drawn++) {
                MyFuwa_10.crc2.save();
                let x = (Math.random() - 0.5) * this.size.x;
                let y = -(Math.random() * this.size.y);
                MyFuwa_10.crc2.translate(x, y);
                MyFuwa_10.crc2.fill(this.particle);
                MyFuwa_10.crc2.restore();
            }
            MyFuwa_10.crc2.restore();
        }
    }
    MyFuwa_10.Cloud = Cloud;
})(MyFuwa_10 || (MyFuwa_10 = {}));
//# sourceMappingURL=Cloud.js.map