namespace BlackmailComp {

    let chosenCharacter: string = "M";
    document.addEventListener("DOMContentLoaded", handleLoad);

    function handleLoad(): void {
        let mail: HTMLElement = <HTMLElement>document.querySelector("div#mail");
        mail.addEventListener("click", placeLetter);
        document.addEventListener("keydown", chooseCharacter);
    }


    function placeLetter(_event: MouseEvent): void {
        //if (_event.target == _event.currentTarget) {
            let x: number = _event.offsetX;
            let y: number = _event.offsetY;
            let mail: HTMLElement = <HTMLElement>_event.target;
            let letter: HTMLSpanElement = document.createElement("span");
            mail.appendChild(letter);
            letter.textContent = chosenCharacter;
            letter.style.left = x + "px";
            letter.style.top = y + "px";
            letter.addEventListener("click", deleteLetter);
        //}


    }

    function chooseCharacter(_event: KeyboardEvent): void {
        console.log(_event.key);
        chosenCharacter = _event.key;
    }

    function deleteLetter(_event: MouseEvent): void {
        //_event.stopPropagation;   funktioniert so nicht
        let target: Node = <Node>_event.target;
        let parent: Node = <Node>target.parentNode;
        console.log(target);
        parent.removeChild(target);

    }

}