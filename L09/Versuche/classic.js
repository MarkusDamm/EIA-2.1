"use strict";
var L09;
(function (L09) {
    let v1 = new L09.Vector();
    v1.set(3, 2);
    v1.scale(2);
    console.log(v1);
    window.setInterval(changeScale, 1000 / 10);
    function changeScale() {
        v1.scale(2);
        console.log(v1);
    }
})(L09 || (L09 = {}));
//# sourceMappingURL=classic.js.map