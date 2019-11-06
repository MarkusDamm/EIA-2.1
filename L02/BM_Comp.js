"use strict";
var BlackmailComp;
(function (BlackmailComp) {
    let chosenCharacter = "M";
    let highlight;
    let mail;
    document.addEventListener("DOMContentLoaded", handleLoad);
    function handleLoad() {
        mail = document.querySelector("div#mail");
        document.addEventListener("click", handleClick);
        //        document.addEventListener("keydown", chooseCharacter);
        let letters = document.querySelector("div#letters");
        for (let alphabet of ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" /**/]) {
            let letter = document.createElement("p");
            letters.appendChild(letter);
            letter.innerText = alphabet;
            letter.classList.add("alphabet");
        }
    }
    function handleClick(_event) {
        let target = _event.target;
        //console.log(target.className);
        if (target == mail)
            placeLetter(_event);
        else if (target.className == "text")
            deleteLetter(_event);
        else if (target.className == "alphabet")
            chooseCharacter(target);
    }
    function placeLetter(_event) {
        let x = _event.offsetX;
        let y = _event.offsetY;
        //let mail: HTMLElement = <HTMLElement>_event.target;
        let letter = document.createElement("span");
        mail.appendChild(letter);
        letter.textContent = chosenCharacter;
        letter.style.left = x + "px";
        letter.style.top = y + "px";
        letter.classList.add("text");
        //letter.addEventListener("click", deleteLetter);                
    }
    function chooseCharacter(_target) {
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
    function deleteLetter(_event) {
        let target = _event.target;
        let parent = target.parentNode;
        console.log(target);
        parent.removeChild(target);
    }
})(BlackmailComp || (BlackmailComp = {}));
//# sourceMappingURL=BM_Comp.js.map