"use strict";
var Betreuer;
(function (Betreuer) {
    let word = "Hallo Welt";
    console.log(word);
    // prompt("type something");
    word = prompt("type something", "type here");
    console.log(word);
    document.addEventListener("DOMContendLoaded", hdlLoad);
    function hdlLoad() {
        // loading goes here
    }
})(Betreuer || (Betreuer = {}));
//# sourceMappingURL=test.js.map