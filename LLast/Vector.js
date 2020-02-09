"use strict";
var MyFuwa_last;
(function (MyFuwa_last) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        static getDifference(_minuend, _subtrahend) {
            let result = new Vector(_minuend.x - _subtrahend.x, _minuend.y - _subtrahend.y);
            return result;
        }
        static getRandom(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = Math.random() * 2 * Math.PI;
            let result = new Vector(Math.cos(direction), Math.sin(direction));
            result.scale(length);
            return result;
        }
        static getSum(_addend1, _addend2) {
            let result = new Vector(_addend1.x + _addend2.x, _addend1.x + _addend2.y);
            return result;
        }
        getValue() {
            return this;
        }
        add(_addend) {
            this.set(this.x + _addend.x, this.y + _addend.y);
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
    }
    MyFuwa_last.Vector = Vector;
})(MyFuwa_last || (MyFuwa_last = {}));
//# sourceMappingURL=Vector.js.map