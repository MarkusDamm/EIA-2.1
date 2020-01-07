"use strict";
var MyFuwa_11;
(function (MyFuwa_11) {
    console.log("Waiting on load");
    window.addEventListener("load", handleLoad);
    let moveable;
    let moveablesArray = [];
    let image;
    let fps = 30;
    let birdX;
    let birdY;
    let direction;
    function handleLoad(_event) {
        console.log("Start now");
        MyFuwa_11.canvas = document.querySelector("canvas");
        if (MyFuwa_11.canvas.getContext("2d"))
            MyFuwa_11.crc2 = MyFuwa_11.canvas.getContext("2d");
        if (!MyFuwa_11.crc2) {
            console.log("Fehler!");
            setTimeout(handleLoad, 1000);
        }
        else {
            MyFuwa_11.crc2.strokeStyle = "black";
            let object;
            drawBackground();
            drawSun(new MyFuwa_11.Vector(980, 20));
            drawMountains(new MyFuwa_11.Vector(0, 500), 70, 170);
            object = new MyFuwa_11.Ghb(new MyFuwa_11.Vector(130, 420));
            object = new MyFuwa_11.Ghb(new MyFuwa_11.Vector(100, 460));
            drawIgloos();
            drawSnowman(new MyFuwa_11.Vector(800, 600));
            birdX = 300 + Math.random() * 300;
            birdY = 500 + Math.random() * 150;
            direction = -1.3 + Math.random() * 2;
            direction = Number(direction.toFixed(0));
            if (direction == 0)
                direction = 1;
            drawBirdhouse(new MyFuwa_11.Vector(birdX, birdY), direction);
            moveable = new MyFuwa_11.Cloud(new MyFuwa_11.Vector(600, 125), new MyFuwa_11.Vector(350, 100));
            image = MyFuwa_11.crc2.getImageData(0, 0, MyFuwa_11.canvas.width, MyFuwa_11.canvas.height);
            // Moveables
            // moveablesArray.push(moveable);
            drawBirds(new MyFuwa_11.Vector(20, 20), new MyFuwa_11.Vector(MyFuwa_11.canvas.width - 100, MyFuwa_11.canvas.height - 20), 22);
            let amount = 100;
            drawSnowflakes(amount);
        }
        console.log(moveablesArray);
        // window.setInterval(update, 1000);
        window.setTimeout(update, 1000);
    }
    function drawBackground() {
        let gradient = MyFuwa_11.crc2.createLinearGradient(0, 0, 0, MyFuwa_11.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(1, "white");
        MyFuwa_11.crc2.fillStyle = gradient;
        MyFuwa_11.crc2.rect(0, 0, MyFuwa_11.canvas.width, MyFuwa_11.canvas.height);
        MyFuwa_11.crc2.fill();
    }
    function drawSun(_position) {
        // auch danke Jirka
        let r1 = 30;
        let r2 = 150;
        let gradient = MyFuwa_11.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        MyFuwa_11.crc2.save();
        MyFuwa_11.crc2.translate(_position.x, _position.y);
        MyFuwa_11.crc2.fillStyle = gradient;
        MyFuwa_11.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        MyFuwa_11.crc2.fill();
        MyFuwa_11.crc2.restore();
    }
    function drawMountains(_position, _min, _max) {
        // ebenso danke
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        MyFuwa_11.crc2.save();
        MyFuwa_11.crc2.translate(_position.x, _position.y);
        MyFuwa_11.crc2.beginPath();
        MyFuwa_11.crc2.moveTo(0, MyFuwa_11.canvas.height - _position.y);
        MyFuwa_11.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            MyFuwa_11.crc2.lineTo(x, y);
        } while (x < MyFuwa_11.crc2.canvas.width);
        MyFuwa_11.crc2.lineTo(x, MyFuwa_11.canvas.height - _position.y);
        MyFuwa_11.crc2.closePath();
        let gradient = MyFuwa_11.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(0.75, "white");
        MyFuwa_11.crc2.fillStyle = gradient;
        MyFuwa_11.crc2.fill();
        MyFuwa_11.crc2.restore();
    }
    function drawSnowman(_position) {
        let stoneAmount = 6;
        MyFuwa_11.crc2.save();
        MyFuwa_11.crc2.translate(_position.x, _position.y);
        let gradient = MyFuwa_11.crc2.createLinearGradient(0, 0, 0, _position.y);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.15, "lightgrey");
        MyFuwa_11.crc2.fillStyle = gradient;
        MyFuwa_11.crc2.beginPath();
        // crc2.moveTo(0, 0);
        MyFuwa_11.crc2.arc(0, 0, 80, Math.PI * -0.5, Math.PI * 2);
        MyFuwa_11.crc2.arc(0, -110, 63, Math.PI * -0.5, Math.PI * 2);
        MyFuwa_11.crc2.arc(0, -200, 40, Math.PI * -0.5, Math.PI * 2);
        MyFuwa_11.crc2.fill();
        MyFuwa_11.crc2.closePath();
        MyFuwa_11.crc2.beginPath();
        MyFuwa_11.crc2.arc(0, -200, 5, Math.PI * -0.5, Math.PI * 2);
        MyFuwa_11.crc2.fillStyle = "orange";
        MyFuwa_11.crc2.fill();
        MyFuwa_11.crc2.closePath();
        for (let i = 0; i < stoneAmount; i++) {
            MyFuwa_11.crc2.beginPath();
            if (i <= stoneAmount * 0.5 - 1)
                MyFuwa_11.crc2.arc(-20 + (8 * i), -187 + (3 * i), 3, Math.PI * -0.5, Math.PI * 2);
            else
                MyFuwa_11.crc2.arc(-20 + (8 * i), -187 - (3 * i) + (stoneAmount * 2.5), 3, Math.PI * -0.5, Math.PI * 2);
            MyFuwa_11.crc2.fillStyle = "black";
            MyFuwa_11.crc2.fill();
            MyFuwa_11.crc2.closePath();
        }
        MyFuwa_11.crc2.restore();
    }
    function drawBirdhouse(_position, _direction) {
        MyFuwa_11.crc2.save();
        MyFuwa_11.crc2.translate(_position.x, _position.y);
        MyFuwa_11.crc2.beginPath();
        MyFuwa_11.crc2.fillStyle = "#663300";
        MyFuwa_11.crc2.fillRect(direction * 5, -3, direction * 10, 100);
        MyFuwa_11.crc2.closePath();
        MyFuwa_11.crc2.beginPath();
        MyFuwa_11.crc2.moveTo(direction * 35, 0);
        MyFuwa_11.crc2.lineTo(direction * 70, -5);
        MyFuwa_11.crc2.lineTo(direction * 70, -88);
        MyFuwa_11.crc2.lineTo(direction * 35, -83);
        MyFuwa_11.crc2.closePath();
        MyFuwa_11.crc2.fill();
        MyFuwa_11.crc2.fillStyle = "#990000";
        MyFuwa_11.crc2.beginPath();
        MyFuwa_11.crc2.moveTo(direction * 35, -83);
        MyFuwa_11.crc2.lineTo(direction * 70, -88);
        MyFuwa_11.crc2.lineTo(direction * 38, -115);
        MyFuwa_11.crc2.lineTo(0, -110);
        MyFuwa_11.crc2.closePath();
        MyFuwa_11.crc2.fill();
        MyFuwa_11.crc2.fillStyle = "#AA6633";
        MyFuwa_11.crc2.beginPath();
        MyFuwa_11.crc2.moveTo(-35, 0);
        MyFuwa_11.crc2.lineTo(-35, -83);
        MyFuwa_11.crc2.lineTo(0, -110);
        MyFuwa_11.crc2.lineTo(35, -83);
        MyFuwa_11.crc2.lineTo(35, 0);
        MyFuwa_11.crc2.closePath();
        MyFuwa_11.crc2.fill();
        MyFuwa_11.crc2.fillStyle = "rgba(5,5,5,0.7)";
        MyFuwa_11.crc2.beginPath();
        MyFuwa_11.crc2.moveTo(0, -55);
        MyFuwa_11.crc2.arc(0, -55, 18, 0, Math.PI * 2);
        MyFuwa_11.crc2.fill();
        MyFuwa_11.crc2.lineWidth = 5;
        MyFuwa_11.crc2.beginPath();
        MyFuwa_11.crc2.moveTo(0, -25);
        MyFuwa_11.crc2.lineTo(direction * -25, -23);
        MyFuwa_11.crc2.stroke();
        MyFuwa_11.crc2.restore();
    }
    function drawIgloos() {
        let x;
        let y;
        for (let i = 0; i < 5; i++) {
            y = 420 + Math.random() * 100;
            x = 300 + Math.random() * 700;
            drawIgloo(new MyFuwa_11.Vector(x, y));
        }
    }
    function drawIgloo(_position) {
        let scale;
        switch (true) {
            case (_position.y < 450):
                scale = 0.3;
                break;
            case (_position.y < 480):
                scale = 0.4;
                break;
            case (_position.y < 510):
                scale = 0.5;
                break;
            case (_position.y < 550):
                scale = 0.6;
                break;
            default:
                scale = 1;
                break;
        }
        MyFuwa_11.crc2.save();
        MyFuwa_11.crc2.translate(_position.x, _position.y);
        MyFuwa_11.crc2.scale(scale, scale);
        MyFuwa_11.crc2.beginPath();
        MyFuwa_11.crc2.moveTo(0, 0);
        MyFuwa_11.crc2.arc(0, 0, 100, 0, Math.PI, true);
        MyFuwa_11.crc2.quadraticCurveTo(0, 30, 100, 0);
        let gradient = MyFuwa_11.crc2.createLinearGradient(-100, -150, 100, 50);
        gradient.addColorStop(0, "#fefefe");
        gradient.addColorStop(1, "#bbffff");
        MyFuwa_11.crc2.fillStyle = gradient;
        MyFuwa_11.crc2.fill();
        let entrance = new Path2D;
        MyFuwa_11.crc2.fillStyle = "white";
        entrance.moveTo(-22, 9);
        entrance.quadraticCurveTo(-19, -24, -35, -28);
        entrance.lineTo(-45, -26);
        entrance.lineTo(-30, 19);
        MyFuwa_11.crc2.fill(entrance);
        entrance.closePath();
        MyFuwa_11.crc2.fillStyle = "lightblue";
        entrance = new Path2D;
        entrance.moveTo(-60, 16);
        entrance.bezierCurveTo(-65, -40, -20, -40, -30, 19);
        MyFuwa_11.crc2.fill(entrance);
        MyFuwa_11.crc2.stroke(entrance);
        entrance.closePath();
        MyFuwa_11.crc2.fillStyle = "lightgrey";
        entrance = new Path2D;
        entrance.moveTo(-52, 6);
        entrance.quadraticCurveTo(-50, -35, -36, -23);
        entrance.quadraticCurveTo(-29, -14, -28, 9);
        entrance.closePath();
        MyFuwa_11.crc2.fill(entrance);
        //Patrick
        MyFuwa_11.crc2.scale(1, 1);
        MyFuwa_11.crc2.restore();
    }
    function drawBirds(_start, _size, _amount) {
        for (let i = 0; i < _amount; i++) {
            let x = _start.x + Math.random() * _size.x;
            let y = _start.y + Math.random() * _size.y;
            moveable = new MyFuwa_11.Bird(new MyFuwa_11.Vector(x, y));
            moveablesArray.push(moveable);
        }
    }
    function drawSnowflakes(_amount) {
        for (let i = 0; i < _amount; i++) {
            let position = new MyFuwa_11.Vector(0, 0);
            position.x = Math.random() * MyFuwa_11.canvas.width;
            position.y = Math.random() * MyFuwa_11.canvas.height;
            moveable = new MyFuwa_11.Snowflake(position);
            moveablesArray.push(moveable);
        }
    }
    function update() {
        window.setTimeout(update, 1000 / fps);
        MyFuwa_11.crc2.clearRect(0, 0, MyFuwa_11.canvas.width, MyFuwa_11.canvas.height);
        MyFuwa_11.crc2.putImageData(image, 0, 0);
        for (let moveable of moveablesArray) {
            // Bird in front or behind birdhouse & snowman
            if (moveable.depth)
                moveable.update();
        }
        drawBirdhouse(new MyFuwa_11.Vector(birdX, birdY), direction);
        drawSnowman(new MyFuwa_11.Vector(800, 600));
        for (let moveable of moveablesArray) {
            if (!moveable.depth)
                moveable.update();
        }
    }
})(MyFuwa_11 || (MyFuwa_11 = {}));
//# sourceMappingURL=canvas.js.map