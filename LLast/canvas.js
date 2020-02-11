"use strict";
var MyFuwa_last;
(function (MyFuwa_last) {
    console.log("Waiting on load");
    window.addEventListener("load", handleLoad);
    let url = "https://fuwa-eia2-1.herokuapp.com/";
    let moveable;
    let moveables = [];
    MyFuwa_last.birds = [];
    MyFuwa_last.foods = [];
    MyFuwa_last.snowballs = [];
    let image;
    MyFuwa_last.fps = 30;
    MyFuwa_last.score = 0;
    let startEle;
    let gameEle;
    let endEle;
    let scoreboard;
    let birdX;
    let birdY;
    let direction;
    function handleLoad() {
        startEle = document.querySelector("div.start");
        gameEle = document.querySelector("div.game");
        endEle = document.querySelector("div.end");
        scoreboard = document.querySelector("div.highscore");
        loadHighscore();
        gameEle.style.display = "none";
        endEle.style.display = "none";
        console.log("Start now");
        MyFuwa_last.scoreElement = document.querySelector("span#score");
        MyFuwa_last.scoreElement.innerText = MyFuwa_last.score.toString();
        document.querySelector("button").addEventListener("click", handleStart);
        document.querySelector("div.end > button").addEventListener("click", handleStart);
    }
    function handleStart() {
        startEle.style.display = "none";
        gameEle.style.display = "initial";
        endEle.style.display = "none";
        MyFuwa_last.canvas = document.querySelector("canvas");
        if (MyFuwa_last.canvas.getContext("2d"))
            MyFuwa_last.crc2 = MyFuwa_last.canvas.getContext("2d");
        if (!MyFuwa_last.crc2) {
            console.log("Fehler!");
            setTimeout(handleLoad, 1000);
        }
        else {
            MyFuwa_last.crc2.strokeStyle = "black";
            let object;
            drawBackground();
            drawSun(new MyFuwa_last.Vector(980, 20));
            drawMountains(new MyFuwa_last.Vector(0, 500), 70, 170);
            object = new MyFuwa_last.Ghb(new MyFuwa_last.Vector(130, 420));
            object = new MyFuwa_last.Ghb(new MyFuwa_last.Vector(100, 460));
            drawIgloos();
            drawSnowman(new MyFuwa_last.Vector(800, 600));
            birdX = 250 + Math.random() * 350;
            birdY = 400 + Math.random() * 150;
            direction = -1.3 + Math.random() * 2;
            direction = Number(direction.toFixed(0));
            if (direction == 0)
                direction = 1;
            drawBirdhouse(new MyFuwa_last.Vector(birdX, birdY), direction);
            object = new MyFuwa_last.Cloud(new MyFuwa_last.Vector(600, 125), new MyFuwa_last.Vector(350, 100));
            image = MyFuwa_last.crc2.getImageData(0, 0, MyFuwa_last.canvas.width, MyFuwa_last.canvas.height);
            // Moveables
            // moveables.push(moveable);
            drawBirds(new MyFuwa_last.Vector(20, 20), new MyFuwa_last.Vector(MyFuwa_last.canvas.width - 100, MyFuwa_last.canvas.height - 20), 22);
            let amount = 100;
            drawSnowflakes(amount);
        }
        // console.log(moveables);
        MyFuwa_last.canvas.addEventListener("click", handleClick);
        window.setInterval(update, 1000 / MyFuwa_last.fps);
    }
    function handleClick(_event) {
        let mousePosition = new MyFuwa_last.Vector(_event.offsetX, _event.offsetY);
        if (_event.shiftKey) {
            let food = new MyFuwa_last.Food(mousePosition);
            MyFuwa_last.foods.push(food);
        }
        else {
            let snowball = new MyFuwa_last.Snowball(mousePosition);
            MyFuwa_last.snowballs.push(snowball);
        }
    }
    function update() {
        // window.setTimeout(update, 1000 / fps);
        MyFuwa_last.crc2.clearRect(0, 0, MyFuwa_last.canvas.width, MyFuwa_last.canvas.height);
        MyFuwa_last.crc2.putImageData(image, 0, 0);
        for (let moveable of moveables) {
            moveable.update();
        }
        for (let food of MyFuwa_last.foods) {
            food.update();
        }
        for (let bird of MyFuwa_last.birds) {
            // Bird in front or behind snowman
            if (bird.depth) {
                bird.update();
            }
        }
        drawSnowman(new MyFuwa_last.Vector(800, 600));
        for (let bird of MyFuwa_last.birds) {
            if (!bird.depth)
                bird.update();
        }
        for (let snowball of MyFuwa_last.snowballs) {
            snowball.update();
        }
    }
    function endGame() {
        scoreboard = document.querySelector("div.end > div.highscore");
        startEle.style.display = "none";
        gameEle.style.display = "none";
        endEle.style.display = "initial";
        let username = prompt("Your score: " + MyFuwa_last.score + ". Enter your name!");
        if (username === null || username == "")
            endGame();
        else
            sendPlayerScore(username);
    }
    MyFuwa_last.endGame = endGame;
    async function sendPlayerScore(_username) {
        // let query: URLSearchParams = new URLSearchParams(<any>formData);
        let query = "name=" + _username + "&score=" + MyFuwa_last.score.toString();
        console.log(query);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        // alert(responseText);
        console.log(responseText);
        loadHighscore();
    }
    async function loadHighscore() {
        console.log("Trying to get Highscore");
        let query = "command=retrieve";
        let response = await fetch(url + "?" + query);
        let responseText = await response.text();
        // alert(responseText);
        scoreboard.innerText = responseText;
    }
    function drawBackground() {
        let gradient = MyFuwa_last.crc2.createLinearGradient(0, 0, 0, MyFuwa_last.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(1, "white");
        MyFuwa_last.crc2.fillStyle = gradient;
        MyFuwa_last.crc2.rect(0, 0, MyFuwa_last.canvas.width, MyFuwa_last.canvas.height);
        MyFuwa_last.crc2.fill();
    }
    function drawSun(_position) {
        // auch danke Jirka
        let r1 = 30;
        let r2 = 150;
        let gradient = MyFuwa_last.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        MyFuwa_last.crc2.save();
        MyFuwa_last.crc2.translate(_position.x, _position.y);
        MyFuwa_last.crc2.fillStyle = gradient;
        MyFuwa_last.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        MyFuwa_last.crc2.fill();
        MyFuwa_last.crc2.restore();
    }
    function drawMountains(_position, _min, _max) {
        // ebenso danke
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        MyFuwa_last.crc2.save();
        MyFuwa_last.crc2.translate(_position.x, _position.y);
        MyFuwa_last.crc2.beginPath();
        MyFuwa_last.crc2.moveTo(0, MyFuwa_last.canvas.height - _position.y);
        MyFuwa_last.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            MyFuwa_last.crc2.lineTo(x, y);
        } while (x < MyFuwa_last.crc2.canvas.width);
        MyFuwa_last.crc2.lineTo(x, MyFuwa_last.canvas.height - _position.y);
        MyFuwa_last.crc2.closePath();
        let gradient = MyFuwa_last.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(0.75, "white");
        MyFuwa_last.crc2.fillStyle = gradient;
        MyFuwa_last.crc2.fill();
        MyFuwa_last.crc2.restore();
    }
    function drawSnowman(_position) {
        let stoneAmount = 6;
        MyFuwa_last.crc2.save();
        MyFuwa_last.crc2.translate(_position.x, _position.y);
        let gradient = MyFuwa_last.crc2.createLinearGradient(0, 0, 0, _position.y);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.15, "lightgrey");
        MyFuwa_last.crc2.fillStyle = gradient;
        MyFuwa_last.crc2.beginPath();
        // crc2.moveTo(0, 0);
        MyFuwa_last.crc2.arc(0, 0, 80, Math.PI * -0.5, Math.PI * 2);
        MyFuwa_last.crc2.arc(0, -110, 63, Math.PI * -0.5, Math.PI * 2);
        MyFuwa_last.crc2.arc(0, -200, 40, Math.PI * -0.5, Math.PI * 2);
        MyFuwa_last.crc2.fill();
        MyFuwa_last.crc2.closePath();
        MyFuwa_last.crc2.beginPath();
        MyFuwa_last.crc2.arc(0, -200, 5, Math.PI * -0.5, Math.PI * 2);
        MyFuwa_last.crc2.fillStyle = "orange";
        MyFuwa_last.crc2.fill();
        MyFuwa_last.crc2.closePath();
        for (let i = 0; i < stoneAmount; i++) {
            MyFuwa_last.crc2.beginPath();
            if (i <= stoneAmount * 0.5 - 1)
                MyFuwa_last.crc2.arc(-20 + (8 * i), -187 + (3 * i), 3, Math.PI * -0.5, Math.PI * 2);
            else
                MyFuwa_last.crc2.arc(-20 + (8 * i), -187 - (3 * i) + (stoneAmount * 2.5), 3, Math.PI * -0.5, Math.PI * 2);
            MyFuwa_last.crc2.fillStyle = "black";
            MyFuwa_last.crc2.fill();
            MyFuwa_last.crc2.closePath();
        }
        MyFuwa_last.crc2.restore();
    }
    function drawBirdhouse(_position, _direction) {
        MyFuwa_last.crc2.save();
        MyFuwa_last.crc2.translate(_position.x, _position.y);
        MyFuwa_last.crc2.beginPath();
        MyFuwa_last.crc2.fillStyle = "#663300";
        MyFuwa_last.crc2.fillRect(direction * 5, -3, direction * 10, 100);
        MyFuwa_last.crc2.closePath();
        MyFuwa_last.crc2.beginPath();
        MyFuwa_last.crc2.moveTo(direction * 35, 0);
        MyFuwa_last.crc2.lineTo(direction * 70, -5);
        MyFuwa_last.crc2.lineTo(direction * 70, -88);
        MyFuwa_last.crc2.lineTo(direction * 35, -83);
        MyFuwa_last.crc2.closePath();
        MyFuwa_last.crc2.fill();
        MyFuwa_last.crc2.fillStyle = "#990000";
        MyFuwa_last.crc2.beginPath();
        MyFuwa_last.crc2.moveTo(direction * 35, -83);
        MyFuwa_last.crc2.lineTo(direction * 70, -88);
        MyFuwa_last.crc2.lineTo(direction * 38, -115);
        MyFuwa_last.crc2.lineTo(0, -110);
        MyFuwa_last.crc2.closePath();
        MyFuwa_last.crc2.fill();
        MyFuwa_last.crc2.fillStyle = "#AA6633";
        MyFuwa_last.crc2.beginPath();
        MyFuwa_last.crc2.moveTo(-35, 0);
        MyFuwa_last.crc2.lineTo(-35, -83);
        MyFuwa_last.crc2.lineTo(0, -110);
        MyFuwa_last.crc2.lineTo(35, -83);
        MyFuwa_last.crc2.lineTo(35, 0);
        MyFuwa_last.crc2.closePath();
        MyFuwa_last.crc2.fill();
        MyFuwa_last.crc2.fillStyle = "rgba(5,5,5,0.7)";
        MyFuwa_last.crc2.beginPath();
        MyFuwa_last.crc2.moveTo(0, -55);
        MyFuwa_last.crc2.arc(0, -55, 18, 0, Math.PI * 2);
        MyFuwa_last.crc2.fill();
        MyFuwa_last.crc2.lineWidth = 5;
        MyFuwa_last.crc2.beginPath();
        MyFuwa_last.crc2.moveTo(0, -25);
        MyFuwa_last.crc2.lineTo(direction * -25, -23);
        MyFuwa_last.crc2.stroke();
        MyFuwa_last.birdHousePolePosition = new MyFuwa_last.Vector(direction * -8 + _position.x, -25 + _position.y);
        MyFuwa_last.crc2.restore();
    }
    function drawIgloos() {
        let x;
        let y;
        for (let i = 0; i < 5; i++) {
            y = 420 + Math.random() * 100;
            x = 300 + Math.random() * 700;
            drawIgloo(new MyFuwa_last.Vector(x, y));
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
        MyFuwa_last.crc2.save();
        MyFuwa_last.crc2.translate(_position.x, _position.y);
        MyFuwa_last.crc2.scale(scale, scale);
        MyFuwa_last.crc2.beginPath();
        MyFuwa_last.crc2.moveTo(0, 0);
        MyFuwa_last.crc2.arc(0, 0, 100, 0, Math.PI, true);
        MyFuwa_last.crc2.quadraticCurveTo(0, 30, 100, 0);
        let gradient = MyFuwa_last.crc2.createLinearGradient(-100, -150, 100, 50);
        gradient.addColorStop(0, "#fefefe");
        gradient.addColorStop(1, "#bbffff");
        MyFuwa_last.crc2.fillStyle = gradient;
        MyFuwa_last.crc2.fill();
        let entrance = new Path2D;
        MyFuwa_last.crc2.fillStyle = "white";
        entrance.moveTo(-22, 9);
        entrance.quadraticCurveTo(-19, -24, -35, -28);
        entrance.lineTo(-45, -26);
        entrance.lineTo(-30, 19);
        MyFuwa_last.crc2.fill(entrance);
        entrance.closePath();
        MyFuwa_last.crc2.fillStyle = "lightblue";
        entrance = new Path2D;
        entrance.moveTo(-60, 16);
        entrance.bezierCurveTo(-65, -40, -20, -40, -30, 19);
        MyFuwa_last.crc2.fill(entrance);
        MyFuwa_last.crc2.stroke(entrance);
        entrance.closePath();
        MyFuwa_last.crc2.fillStyle = "lightgrey";
        entrance = new Path2D;
        entrance.moveTo(-52, 6);
        entrance.quadraticCurveTo(-50, -35, -36, -23);
        entrance.quadraticCurveTo(-29, -14, -28, 9);
        entrance.closePath();
        MyFuwa_last.crc2.fill(entrance);
        //Patrick
        MyFuwa_last.crc2.scale(1, 1);
        MyFuwa_last.crc2.restore();
    }
    function drawBirds(_start, _size, _amount) {
        for (let i = 0; i < _amount; i++) {
            let x = _start.x + Math.random() * _size.x;
            let y = _start.y + Math.random() * _size.y;
            moveable = new MyFuwa_last.Bird(new MyFuwa_last.Vector(x, y));
            // moveables.push(moveable);
            MyFuwa_last.birds.push(moveable); // unkown vom linter empfohlen
        }
    }
    function drawSnowflakes(_amount) {
        for (let i = 0; i < _amount; i++) {
            let position = new MyFuwa_last.Vector(0, 0);
            position.x = Math.random() * MyFuwa_last.canvas.width;
            position.y = Math.random() * MyFuwa_last.canvas.height;
            moveable = new MyFuwa_last.Snowflake(position);
            moveables.push(moveable);
        }
    }
})(MyFuwa_last || (MyFuwa_last = {}));
//# sourceMappingURL=canvas.js.map