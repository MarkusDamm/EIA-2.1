namespace MyFuwa_last {
    export class Vector {
        x: number;
        y: number;
        
        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }
        
        public static getDifference(_minuend: Vector, _subtrahend: Vector): Vector {
            let result: Vector = new Vector(_minuend.x - _subtrahend.x, _minuend.y - _subtrahend.y);
            return result;
        }

        public static getRandom(_minLength: number, _maxLength: number): Vector {
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);
            let direction: number = Math.random() * 2 * Math.PI;
            let result: Vector = new Vector(Math.cos(direction), Math.sin(direction));
            result.scale(length);
            return result;
        }

        public static getSum(_addend1: Vector, _addend2: Vector): Vector {
            let result: Vector = new Vector(_addend1.x + _addend2.x, _addend1.x + _addend2.y);
            return result;
        }

        public getValue(): Vector {
            return this;
        }

        public get length(): number {
            return Math.hypot(this.x, this.y);
        }

        public add(_addend: Vector): void {
            this.set(this.x + _addend.x, this.y + _addend.y);
        }
        
        public scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }
        
        private set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }
    }
}
