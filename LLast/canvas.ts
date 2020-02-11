namespace MyFuwa_last {
    console.log("Waiting on load");
    window.addEventListener("load", handleLoad);
    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    export let birdHousePolePosition: Vector;

    let url: string = "https://fuwa-eia2-1.herokuapp.com/";

    let moveable: Moveable;
    let moveables: Moveable[] = [];
    export let birds: Bird[] = [];
    export let foods: Food[] = [];
    export let snowballs: Snowball[] = [];
    let image: ImageData;
    export let fps: number = 30;
    export let score: number = 0;
    export let scoreElement: HTMLSpanElement;

    let startEle: HTMLDivElement;
    let gameEle: HTMLDivElement;
    let endEle: HTMLDivElement;
    let scoreboard: HTMLDivElement;

    let intervalID: number;

    let birdX: number;
    let birdY: number;
    let direction: number;

    function handleLoad(): void {
        startEle = <HTMLDivElement>document.querySelector("div.start");
        gameEle = <HTMLDivElement>document.querySelector("div.game");
        endEle = <HTMLDivElement>document.querySelector("div.end");
        scoreboard = <HTMLDivElement>document.querySelector("div.highscore");

        loadHighscore();

        gameEle.style.display = "none";
        endEle.style.display = "none";

        console.log("Start now");
        scoreElement = <HTMLSpanElement>document.querySelector("span#score");
        scoreElement.innerText = score.toString();

        document.querySelector("button").addEventListener("click", handleStart);
        document.querySelector("div.end > button").addEventListener("click", handleLoad);
    }

    function handleStart(): void {
        startEle.style.display = "none";
        gameEle.style.display = "initial";
        endEle.style.display = "none";

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (canvas.getContext("2d"))
            crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        if (!crc2) {
            console.log("Fehler!");
            setTimeout(handleLoad, 1000);
        }
        else {
            crc2.strokeStyle = "black";
            let object: Object;
            drawBackground();
            drawSun(new Vector(980, 20));
            drawMountains(new Vector(0, 500), 70, 170);
            object = new Ghb(new Vector(130, 420));
            object = new Ghb(new Vector(100, 460));
            drawIgloos();
            drawSnowman(new Vector(800, 600));
            birdX = 250 + Math.random() * 350;
            birdY = 400 + Math.random() * 150;

            direction = -1.3 + Math.random() * 2;
            direction = Number(direction.toFixed(0));
            if (direction == 0)
                direction = 1;

            drawBirdhouse(new Vector(birdX, birdY), direction);
            object = new Cloud(new Vector(600, 125), new Vector(350, 100));
            image = crc2.getImageData(0, 0, canvas.width, canvas.height);

            // Moveables
            // moveables.push(moveable);
            drawBirds(new Vector(20, 20), new Vector(canvas.width - 100, canvas.height - 20), 22);

            let amount: number = 100;
            drawSnowflakes(amount);

        }
        // console.log(moveables);

        canvas.addEventListener("click", handleClick);
        intervalID = window.setInterval(update, 1000 / fps);
    }

    function handleClick(_event: MouseEvent): void {
        let mousePosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        if (_event.shiftKey) {
            let food: Food = new Food(mousePosition);
            foods.push(food);
        }
        else {
            let snowball: Snowball = new Snowball(mousePosition);
            snowballs.push(snowball);
        }
    }

    function update(): void {
        // window.setTimeout(update, 1000 / fps);

        crc2.clearRect(0, 0, canvas.width, canvas.height);
        crc2.putImageData(image, 0, 0);
        for (let moveable of moveables) {
            moveable.update();
        }
        for (let food of foods) {
            food.update();
        }
        for (let bird of birds) {
            // Bird in front or behind snowman
            if (bird.depth) {
                bird.update();
            }
        }
        drawSnowman(new Vector(800, 600));

        for (let bird of birds) {
            if (!bird.depth)
                bird.update();
        }

        for (let snowball of snowballs) {
            snowball.update();
        }

    }

    export function endGame(): void {
        scoreboard = <HTMLDivElement>document.querySelector("div.end > div.highscore");

        clearInterval(intervalID);

        startEle.style.display = "none";
        gameEle.style.display = "none";
        endEle.style.display = "initial";

        let username: string | null = prompt("Your score: " + score + ". Enter your name!");
        if (username === null || username == "") endGame();
        else    sendPlayerScore(username);
    }

    async function sendPlayerScore(_username: string): Promise<void> {
        // let query: URLSearchParams = new URLSearchParams(<any>formData);
        let query: string = "name=" + _username + "&score=" + score.toString();
        console.log(query);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();

        // alert(responseText);
        console.log(responseText);
        loadHighscore();
    }

    async function loadHighscore(): Promise<void> {
        console.log("Trying to get Highscore");
        let query: string = "command=retrieve";
        let response: Response = await fetch(url + "?" + query);
        let responseText: string = await response.text();

        // alert(responseText);
        scoreboard.innerText = responseText;
    }

    function drawBackground(): void {
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(1, "white");

        crc2.fillStyle = gradient;
        crc2.rect(0, 0, canvas.width, canvas.height);
        crc2.fill();
    }

    function drawSun(_position: Vector): void {
        // auch danke Jirka
        let r1: number = 30;
        let r2: number = 150;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number): void {
        // ebenso danke
        let stepMin: number = 50;
        let stepMax: number = 150;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, canvas.height - _position.y);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, canvas.height - _position.y);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(0.75, "white");

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

    function drawSnowman(_position: Vector): void {
        let stoneAmount: number = 6;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, _position.y);
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


        for (let i: number = 0; i < stoneAmount; i++) {
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

    function drawBirdhouse(_position: Vector, _direction: number): void {
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

        birdHousePolePosition = new Vector(direction * -8 + _position.x, -25 + _position.y);
        crc2.restore();
    }

    function drawIgloos(): void {
        let x: number;
        let y: number;

        for (let i: number = 0; i < 5; i++) {
            y = 420 + Math.random() * 100;
            x = 300 + Math.random() * 700;
            drawIgloo(new Vector(x, y));
        }
    }

    function drawIgloo(_position: Vector): void {
        let scale: number;
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

        let gradient: CanvasGradient = crc2.createLinearGradient(- 100, - 150, 100, 50);
        gradient.addColorStop(0, "#fefefe");
        gradient.addColorStop(1, "#bbffff");
        crc2.fillStyle = gradient;
        crc2.fill();

        let entrance: Path2D = new Path2D;
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

    function drawBirds(_start: Vector, _size: Vector, _amount: number): void {
        for (let i: number = 0; i < _amount; i++) {
            let x: number = _start.x + Math.random() * _size.x;
            let y: number = _start.y + Math.random() * _size.y;
            moveable = new Bird(new Vector(x, y));
            // moveables.push(moveable);
            birds.push(<Bird><unknown>moveable);    // unkown vom linter empfohlen
        }

    }

    function drawSnowflakes(_amount: number): void {
        for (let i: number = 0; i < _amount; i++) {
            let position: Vector = new Vector(0, 0);
            position.x = Math.random() * canvas.width;
            position.y = Math.random() * canvas.height;
            moveable = new Snowflake(position);
            moveables.push(moveable);
        }
    }
}