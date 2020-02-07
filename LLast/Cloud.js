"use strict";
var MyFuwa_11;
(function (MyFuwa_11) {
    class Cloud extends MyFuwa_11.Moveable {
        constructor(_position, _size) {
            super(_position);
            this.nParticles = 40;
            this.rParticle = 50;
            this.velocity = new MyFuwa_11.Vector(2, 0);
            this.particle = new Path2D();
            // this.position = _position;
            this.size = _size;
            this.draw();
        }
        draw() {
            let gradient = MyFuwa_11.crc2.createRadialGradient(0, 0, 0, 0, 0, this.rParticle);
            this.particle.arc(0, 0, this.rParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            MyFuwa_11.crc2.save();
            MyFuwa_11.crc2.translate(this.position.x, this.position.y);
            MyFuwa_11.crc2.fillStyle = gradient;
            for (let drawn = 0; drawn < this.nParticles; drawn++) {
                MyFuwa_11.crc2.save();
                let x = (Math.random() - 0.5) * this.size.x;
                let y = -(Math.random() * this.size.y);
                MyFuwa_11.crc2.translate(x, y);
                MyFuwa_11.crc2.fill(this.particle);
                MyFuwa_11.crc2.restore();
            }
            MyFuwa_11.crc2.restore();
        }
    }
    MyFuwa_11.Cloud = Cloud;
})(MyFuwa_11 || (MyFuwa_11 = {}));
//# sourceMappingURL=Cloud.js.map