namespace BlackmailComp {
    
    let chosenCharacter: string = "M";
    let highlight: HTMLParagraphElement;
    let mail: HTMLElement;
    document.addEventListener("DOMContentLoaded", handleLoad);

    function handleLoad(): void {
        mail = <HTMLElement>document.querySelector("div#mail");
        document.addEventListener("click", handleClick);
//        document.addEventListener("keydown", chooseCharacter);

        let letters: HTMLDivElement = <HTMLDivElement>document.querySelector("div#letters");
        
        for (let alphabet of ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"/**/]) {
            let letter: HTMLParagraphElement = document.createElement("p");
            letters.appendChild(letter);
            letter.innerText = alphabet;
            letter.classList.add("alphabet");
        }
    }

    function handleClick(_event: MouseEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        //console.log(target.className);
        if (target == mail)
            placeLetter(_event);
        else if (target.className == "text") 
            deleteLetter(_event);
        else if (target.className == "alphabet")
            chooseCharacter(<HTMLParagraphElement>target);
    }


    function placeLetter(_event: MouseEvent): void {
        let x: number = _event.offsetX;
        let y: number = _event.offsetY;
        //let mail: HTMLElement = <HTMLElement>_event.target;
        let letter: HTMLSpanElement = document.createElement("span");

        mail.appendChild(letter);
        letter.textContent = chosenCharacter;
        letter.style.left = x + "px";
        letter.style.top = y + "px";
        letter.classList.add("text");
        //letter.addEventListener("click", deleteLetter);                

    }

    function chooseCharacter(_target: HTMLParagraphElement): void {
        console.log(_target.innerHTML);
        chosenCharacter = _target.innerHTML;
        if (!highlight) {
            highlight = _target;
            highlight.style.background = "#aa0000";
        }
        else {
            highlight.style.background = "#fff";
            highlight = _target;
            highlight.style.background = "#aa0000";
        }
        
    }

    function deleteLetter(_event: MouseEvent): void {
        let target: Node = <Node>_event.target;
        let parent: Node = <Node>target.parentNode;
        console.log(target);
        parent.removeChild(target);
    }

}