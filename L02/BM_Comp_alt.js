"use strict";
var BlackmailComp;
(function (BlackmailComp) {
    let chosenCharacter = "M";
    document.addEventListener("DOMContentLoaded", handleLoad);
    function handleLoad() {
        let mail = document.querySelector("div#mail");
        mail.addEventListener("click", placeLetter);
        document.addEventListener("keydown", chooseCharacter);
    }
    function placeLetter(_event) {
        //if (_event.target == _event.currentTarget) {
        let x = _event.offsetX;
        let y = _event.offsetY;
        let mail = _event.target;
        let letter = document.createElement("span");
        mail.appendChild(letter);
        letter.textContent = chosenCharacter;
        letter.style.left = x + "px";
        letter.style.top = y + "px";
        letter.addEventListener("click", deleteLetter);
        //}
    }
    function chooseCharacter(_event) {
        console.log(_event.key);
        chosenCharacter = _event.key;
    }
    function deleteLetter(_event) {
        //_event.stopPropagation;   funktioniert so nicht
        let target = _event.target;
        let parent = target.parentNode;
        console.log(target);
        parent.removeChild(target);
    }
})(BlackmailComp || (BlackmailComp = {}));
//# sourceMappingURL=BM_Comp_alt.js.map