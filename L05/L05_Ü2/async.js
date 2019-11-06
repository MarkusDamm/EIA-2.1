"use strict";
var AsyncTest;
(function (AsyncTest) {
    communicate("https://jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt");
    async function communicate(_url) {
        let response = await fetch(_url);
        console.log("Response", response);
    }
})(AsyncTest || (AsyncTest = {}));
//# sourceMappingURL=async.js.map