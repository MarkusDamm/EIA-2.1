namespace Converter_L06 {
    console.log("Your Hex-number ", process.argv[2]);
    let numb: string | number = process.argv[2];
    let convFrom: number = process.argv[3];
    let convTo: number = process.argv[4];

    let convert: number | string = parseInt(numb, convFrom);

    console.log("Decimal-number", convert);

    convert = convert.toString(convTo);

    console.log("Binary-number", convert);
}