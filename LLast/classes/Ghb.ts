namespace MyFuwa_last {
    export class Ghb extends Object {

        constructor(_position: Vector) {
            super(_position);
            this.draw();
        }

        private draw(): void {
            // console.log("Mal GHB");
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.lineTo(80, 0);
            crc2.lineTo(80, -200);
            crc2.bezierCurveTo(60, -210, 20, -210, 0, -200);

            crc2.closePath();
            crc2.fillStyle = "lightgrey";
            crc2.stroke();
            crc2.fill();

            crc2.beginPath();
            crc2.moveTo(30, 0);
            crc2.lineTo(35, 0);
            crc2.lineTo(35, -208);
            crc2.lineTo(30, -207);

            crc2.closePath();
            crc2.fillStyle = "grey";
            crc2.fill();
            crc2.stroke();

            crc2.restore();
        }
    }
}