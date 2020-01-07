namespace MyFuwa_11 {
    export class Vector {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }
        
        set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }

        add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }

        subtract(_subtrahend: Vector): Vector {
            let result: Vector = new Vector(0, 0);
            result.x = this.x - _subtrahend.x;
            result.y = this.y - _subtrahend.y;
            return result;
        }

        random(_minLength: number, _maxLength: number): void {
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);
            let direction: number = Math.random() * 2 * Math.PI;

            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }

        copy(): Vector {
            let vector: Vector = new Vector(this.x, this.y);
            return vector;
        }
    }
}
