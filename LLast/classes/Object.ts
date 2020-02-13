namespace MyFuwa_last {
    export abstract class Thing {
        protected position: Vector;

        constructor(_position: Vector) {
            this.position = _position;
            this.draw();
        }

        protected abstract draw(): void;
            //
        
    }
}