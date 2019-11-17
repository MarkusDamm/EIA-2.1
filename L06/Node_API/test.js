"use strict";
var L06_NodeAPI;
(function (L06_NodeAPI) {
    process.addListener("exit", handleExit);
    function handleExit(_event) {
        console.log("Bye " + process.argv[2]);
    }
})(L06_NodeAPI || (L06_NodeAPI = {}));
//# sourceMappingURL=test.js.map