namespace Bobby_8 {
    console.log("Waiting on load");
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        console.log("Start now");
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        let crc2: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!crc2)
            console.log("Fehler!");
        else {
            crc2.fillStyle = "#FFaf00";
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

            crc2.strokeStyle = crc2.fillStyle = "red";
            crc2.beginPath();
            crc2.arc(100, 200, 20, 0, 1.2 * Math.PI);
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
            let path: Path2D = new Path2D();
            path.arc(60, 60, 50, 0, 2 * Math.PI);
            crc2.stroke(path);

            let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 100);
            gradient.addColorStop(0, "black");
            gradient.addColorStop(.3, "red");
            gradient.addColorStop(.5, "orange");
            gradient.addColorStop(1, "gold");

            crc2.fillStyle = gradient;
            crc2.fillRect(0, 0, 100, 100);

            let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");
            pattern.canvas.width = 40;
            pattern.canvas.height = 20;

            pattern.fillStyle = "#fec";
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            pattern.moveTo(0, 10);
            pattern.lineTo(10, 10);
            pattern.lineTo(20, 0);
            pattern.lineTo(30, 0);
            pattern.lineTo(40, 10);
            pattern.lineTo(30, 20);
            pattern.lineTo(20, 20);
            pattern.lineTo(10, 10);
            pattern.stroke();

            crc2.fillStyle = crc2.createPattern(pattern.canvas, "repeat");
            crc2.fillRect(200, 0, 500, 100);

            crc2.strokeStyle = gradient;
            crc2.strokeRect(110, 0, 80, 100);
        }
    }
}