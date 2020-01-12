namespace MyFuwa_11 {
    export abstract class Object {
        protected position: Vector;

        constructor(_position: Vector) {
            this.position = _position;
            // this.draw();
        }

        abstract draw(): void;
    }
}