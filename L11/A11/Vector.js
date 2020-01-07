"use strict";
var MyFuwa_11;
(function (MyFuwa_11) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
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
        subtract(_subtrahend) {
            let result = new Vector(0, 0);
            result.x = this.x - _subtrahend.x;
            result.y = this.y - _subtrahend.y;
            return result;
        }
        random(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = Math.random() * 2 * Math.PI;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
        copy() {
            let vector = new Vector(this.x, this.y);
            return vector;
        }
    }
    MyFuwa_11.Vector = Vector;
})(MyFuwa_11 || (MyFuwa_11 = {}));
//# sourceMappingURL=Vector.js.map