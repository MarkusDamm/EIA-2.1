"use strict";
var MyFuwa_08;
(function (MyFuwa_08) {
    console.log("Waiting on load");
    window.addEventListener("load", handleLoad);
    let canvas;
    let crc2;
    function handleLoad(_event) {
        console.log("Start now");
        canvas = document.querySelector("canvas");
        if (canvas.getContext("2d"))
            crc2 = canvas.getContext("2d");
        if (!crc2) {
            console.log("Fehler!");
            setTimeout(handleLoad, 1000);
        }
        else {
            crc2.strokeStyle = "black";
            drawBackground();
            drawCloud({ x: 600, y: 125 }, { x: 350, y: 100 });
            drawSun({ x: 980, y: 20 });
            drawMountains({ x: 0, y: 500 }, 70, 170);
            drawGHB({ x: 130, y: 420 });
            drawGHB({ x: 100, y: 460 });
            drawIgloos();
            drawSnowman({ x: 800, y: 600 });
            let x = 300 + Math.random() * 300;
            let y = 500 + Math.random() * 150;
            drawBirdhouse({ x, y });
            drawBirds({ x: 20, y: 20 }, { x: canvas.width - 100, y: canvas.height - 20 });
            let amount = 250;
            drawSnowflakes(amount);
            // drawBirdhouse({ x: 300, y: 500 });
        }
    }
    function drawBackground() {
        let gradient = crc2.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(1, "white");
        crc2.fillStyle = gradient;
        crc2.rect(0, 0, canvas.width, canvas.height);
        crc2.fill();
    }
    function drawCloud(_position, _size) {
        // danke, Jirka
        let nParticles = 40;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawSun(_position) {
        // auch danke
        let r1 = 30;
        let r2 = 150;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawMountains(_position, _min, _max) {
        // ebenso danke
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, canvas.height - _position.y);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, canvas.height - _position.y);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(0.75, "white");
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawGHB(_position) {
        crc2.save();
        crc2.translate(_position.x, _position.y);
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
    function drawIgloos() {
        let x;
        let y;
        for (let i = 0; i < 8; i++) {
            y = 420 + Math.random() * 100;
            x = 300 + Math.random() * 700;
            drawIgloo({ x, y });
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
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.scale(scale, scale);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.arc(0, 0, 100, 0, Math.PI, true);
        crc2.quadraticCurveTo(0, 30, 100, 0);
        let gradient = crc2.createLinearGradient(-100, -150, 100, 50);
        gradient.addColorStop(0, "#fefefe");
        gradient.addColorStop(1, "#bbffff");
        crc2.fillStyle = gradient;
        crc2.fill();
        let entrance = new Path2D;
        crc2.fillStyle = "white";
        entrance.moveTo(-22, 9);
        entrance.quadraticCurveTo(-19, -24, -35, -28);
        entrance.lineTo(-45, -26);
        entrance.lineTo(-30, 19);
        crc2.fill(entrance);
        entrance.closePath();
        crc2.fillStyle = "lightblue";
        entrance = new Path2D;
        entrance.moveTo(-60, 16);
        entrance.bezierCurveTo(-65, -40, -20, -40, -30, 19);
        crc2.fill(entrance);
        crc2.stroke(entrance);
        entrance.closePath();
        crc2.fillStyle = "lightgrey";
        entrance = new Path2D;
        entrance.moveTo(-52, 6);
        entrance.quadraticCurveTo(-50, -35, -36, -23);
        entrance.quadraticCurveTo(-29, -14, -28, 9);
        entrance.closePath();
        crc2.fill(entrance);
        //Patrick
        crc2.scale(1, 1);
        crc2.restore();
    }
    function drawBirds(_start, _size) {
        for (let i = 0; i < 20; i++) {
            let x = _start.x + Math.random() * _size.x;
            let y = _start.y + Math.random() * _size.y;
            drawBird({ x, y });
        }
    }
    function drawBird(_position) {
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.scale(0.8, 0.8);
        crc2.beginPath();
        if (_position.y <= 420) {
            //Beak
            crc2.fillStyle = "black";
            crc2.beginPath();
            crc2.moveTo(65, 0);
            crc2.lineTo(50, -8);
            crc2.lineTo(50, 8);
            crc2.closePath();
            crc2.fill();
            //Tail
            crc2.fillStyle = getRandomColor();
            crc2.beginPath();
            crc2.moveTo(-20, 0);
            crc2.lineTo(-40, -5);
            crc2.lineTo(-40, 5);
            crc2.closePath();
            crc2.fill();
            //Backwing
            crc2.fillStyle = getRandomColor();
            crc2.beginPath();
            crc2.moveTo(10, 0);
            crc2.quadraticCurveTo(30, -20, 20, -45);
            crc2.quadraticCurveTo(0, -22, 10, 0);
            crc2.closePath();
            crc2.stroke();
            crc2.fill();
            //Body
            crc2.beginPath();
            crc2.arc(43, 0, 12, Math.PI * 0.9, Math.PI * 1, true);
            crc2.moveTo(43, 0);
            crc2.quadraticCurveTo(0, -25, -25, 0);
            crc2.quadraticCurveTo(0, 20, 43, 0);
            crc2.stroke();
            crc2.fill();
            crc2.closePath();
            //Frontwing
            crc2.beginPath();
            crc2.moveTo(10, 0);
            crc2.quadraticCurveTo(20, -20, 0, -45);
            crc2.quadraticCurveTo(-10, -22, 10, 0);
            crc2.closePath();
            crc2.stroke();
            crc2.fill();
        }
        else {
            //Feet
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.moveTo(0, -30);
            crc2.lineTo(-10, 0);
            crc2.lineTo(0, -30);
            crc2.lineTo(10, 0);
            crc2.stroke();
            crc2.closePath();
            //Beak
            crc2.fillStyle = "black";
            crc2.beginPath();
            crc2.moveTo(50, -50);
            crc2.lineTo(35, -58);
            crc2.lineTo(35, -42);
            crc2.closePath();
            crc2.fill();
            //Tail
            crc2.fillStyle = getRandomColor();
            crc2.beginPath();
            crc2.moveTo(-10, -30);
            crc2.lineTo(-40, -12);
            crc2.lineTo(-37, -4);
            crc2.closePath();
            crc2.fill();
            //Body
            crc2.fillStyle = getRandomColor();
            crc2.beginPath();
            crc2.moveTo(30, -50);
            crc2.arc(30, -50, 12, Math.PI * 0.7, Math.PI * 1.1, true);
            crc2.quadraticCurveTo(-10, -50, -25, -20);
            crc2.quadraticCurveTo(10, -10, 30, -50);
            crc2.fill();
        }
        crc2.scale(1, 1);
        crc2.restore();
    }
    function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function drawSnowman(_position) {
        let stoneAmount = 6;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        let gradient = crc2.createLinearGradient(0, 0, 0, _position.y);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.15, "lightgrey");
        crc2.fillStyle = gradient;
        crc2.beginPath();
        // crc2.moveTo(0, 0);
        crc2.arc(0, 0, 80, Math.PI * -0.5, Math.PI * 2);
        crc2.arc(0, -110, 63, Math.PI * -0.5, Math.PI * 2);
        crc2.arc(0, -200, 40, Math.PI * -0.5, Math.PI * 2);
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(0, -200, 5, Math.PI * -0.5, Math.PI * 2);
        crc2.fillStyle = "orange";
        crc2.fill();
        crc2.closePath();
        for (let i = 0; i < stoneAmount; i++) {
            crc2.beginPath();
            if (i <= stoneAmount * 0.5 - 1)
                crc2.arc(-20 + (8 * i), -187 + (3 * i), 3, Math.PI * -0.5, Math.PI * 2);
            else
                crc2.arc(-20 + (8 * i), -187 - (3 * i) + (stoneAmount * 2.5), 3, Math.PI * -0.5, Math.PI * 2);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();
        }
        crc2.restore();
    }
    function drawBirdhouse(_position) {
        let direction = -1.3 + Math.random() * 2;
        direction = Number(direction.toFixed(0));
        if (direction == 0)
            direction = 1;
        console.log(direction);
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.fillStyle = "#663300";
        crc2.fillRect(direction * 5, -3, direction * 10, 100);
        crc2.closePath();
        crc2.beginPath();
        crc2.moveTo(direction * 35, 0);
        crc2.lineTo(direction * 70, -5);
        crc2.lineTo(direction * 70, -88);
        crc2.lineTo(direction * 35, -83);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#990000";
        crc2.beginPath();
        crc2.moveTo(direction * 35, -83);
        crc2.lineTo(direction * 70, -88);
        crc2.lineTo(direction * 38, -115);
        crc2.lineTo(0, -110);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#AA6633";
        crc2.beginPath();
        crc2.moveTo(-35, 0);
        crc2.lineTo(-35, -83);
        crc2.lineTo(0, -110);
        crc2.lineTo(35, -83);
        crc2.lineTo(35, 0);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "rgba(5,5,5,0.7)";
        crc2.beginPath();
        crc2.moveTo(0, -55);
        crc2.arc(0, -55, 18, 0, Math.PI * 2);
        crc2.fill();
        crc2.lineWidth = 5;
        crc2.beginPath();
        crc2.moveTo(0, -25);
        crc2.lineTo(direction * -25, -23);
        crc2.stroke();
        crc2.restore();
    }
    function drawSnowflakes(_amount) {
        crc2.save();
        let gradient = crc2.createRadialGradient(0, 0, 2, 0, 0, 5);
        gradient.addColorStop(0, "RGBA(250, 250, 250, 0.8)");
        gradient.addColorStop(1, "RGBA(250, 250, 250, 0.2)");
        for (let i = 0; i < _amount; i++) {
            crc2.beginPath();
            let position = { x: 0, y: 0 };
            position.x = Math.random() * canvas.width;
            position.y = Math.random() * canvas.height;
            crc2.save();
            crc2.translate(position.x, position.y);
            crc2.fillStyle = gradient;
            crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            crc2.fill();
            crc2.restore();
        }
        crc2.restore();
    }
})(MyFuwa_08 || (MyFuwa_08 = {}));
//# sourceMappingURL=canvas.js.map