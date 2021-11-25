namespace Betreuer {
  // document.addEventListener("DOMContendLoaded", hdlLoad);
  window.addEventListener("load", hdlLoad);
  let canvas: HTMLCanvasElement;
  let crc2: CanvasRenderingContext2D;


  function hdlLoad(): void {
    // loading goes here
    console.log("loading complete");
    
    canvas = <HTMLCanvasElement>document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
    drawFir();
  }

  function drawFir(): void {
    crc2.save();
    crc2.scale(5, 5);
    crc2.translate(50, 100);
    crc2.beginPath();
    crc2.fillStyle = "brown";
    crc2.fillRect(-5, -20, 10, 20);
    crc2.closePath();

    crc2.beginPath();
    crc2.moveTo(0, -70);
    crc2.lineTo(-23, -45);
    crc2.lineTo(-13, -50);
    crc2.lineTo(-27, -27);
    crc2.lineTo(-14, -32);
    crc2.lineTo(-35, -7);
    // crc2.bezierCurveTo(-20, -25, -20, -30, -35, -7);
    crc2.lineTo(0, -18);
    
    crc2.lineTo(35, -7);
    // crc2.bezierCurveTo(20, -25, 20, -30, 17, -32);
    crc2.lineTo(14, -32);
    crc2.lineTo(27, -27);
    crc2.lineTo(13, -50);
    crc2.lineTo(23, -45);
    crc2.closePath();
    crc2.fillStyle = "darkolivegreen";
    crc2.fill();
    crc2.restore();
  }
}