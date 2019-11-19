"use strict";
var Converter_L06;
(function (Converter_L06) {
    console.log("Your Hex-number ", process.argv[2]);
    let numb = process.argv[2];
    let convFrom = process.argv[3];
    let convTo = process.argv[4];
    let convert = parseInt(numb, convFrom);
    console.log("Decimal-number", convert);
    convert = convert.toString(convTo);
    console.log("Binary-number", convert);
})(Converter_L06 || (Converter_L06 = {}));
//# sourceMappingURL=Converter.js.map