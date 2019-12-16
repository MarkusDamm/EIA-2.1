"use strict";
var L09;
(function (L09) {
    class Vector {
        constructor() {
            this.x = 0;
            this.y = 0;
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
    }
    L09.Vector = Vector;
})(L09 || (L09 = {}));
//# sourceMappingURL=class.js.map