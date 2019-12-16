namespace L09 {
    let v1: Vector = new Vector();
    v1.set(3, 2);
    v1.scale(2);
    console.log(v1);

    window.setInterval(changeScale, 1000 / 10);

    function changeScale(): void {
        v1.scale(2);
        console.log(v1);
    
    }

}