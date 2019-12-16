namespace L09 {
    export class Vector {
        x: number;
        y: number;

        constructor() {
            this.x = 0;
            this.y = 0;
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
    }
}