"use strict";
var Bobby_8;
(function (Bobby_8) {
    console.log("Waiting on load");
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Start now");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        if (!crc2)
            console.log("Fehler!");
        else {
            crc2.fillStyle = "#FFaf00";
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
            crc2.strokeStyle = crc2.fillStyle = "red";
            crc2.beginPath();
            crc2.arc(100, 100, 20, 0, 1.2 * Math.PI);
            crc2.closePath();
            crc2.stroke();
            crc2.beginPath();
            crc2.ellipse(250, 100, 35, 15, Math.PI * 0.5, 0, Math.PI * 1.5);
            crc2.closePath();
            crc2.fill();
            crc2.beginPath();
            crc2.moveTo(300, 300);
            crc2.lineTo(250, 310);
            crc2.lineTo(270, 240);
            crc2.closePath();
            crc2.stroke();
            // Benutzt Fill-Style
            crc2.fillText("Text", 50, 50);
            // Benutzt Stroke-Style
            crc2.strokeText("Stroke", 200, 50);
            crc2.fillStyle = crc2.strokeStyle = "black";
            let path = new Path2D();
            path.arc(60, 60, 50, 0, 2 * Math.PI);
            crc2.stroke(path);
        }
    }
})(Bobby_8 || (Bobby_8 = {}));
//# sourceMappingURL=canvas.js.map