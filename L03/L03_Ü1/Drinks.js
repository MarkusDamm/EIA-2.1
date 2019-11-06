"use strict";
var DrinkDealer;
(function (DrinkDealer) {
    window.addEventListener("load", handleLoad);
    let amount;
    //console.log(location);
    function handleLoad() {
        let form = document.getElementById("form");
        let slider = document.getElementById("amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        let order = document.getElementById("order");
        order.innerHTML = "";
        let htmlText = "<h2>Your order</h2>";
        let total = 0;
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            let price = Number(item.getAttribute("price"));
            // console.log(item);
            if (item.getAttribute("name") == "Drink") {
                //let amountEle: HTMLInputElement = <HTMLInputElement>document.querySelector("[type=range]");
                //console.log(amountEle);
                total += amount * price;
                //console.log(amount);
                htmlText += "<p>" + item.value + " € " + (price * amount).toFixed(2);
            }
            else if (item.max == "1.0") {
                //
            }
            else {
                total += price;
                htmlText += "<p>" + item.name + " €" + price.toFixed(2);
            }
        }
        htmlText += "<p>Your Total: €" + total.toFixed(2);
        order.innerHTML = htmlText;
    }
    function displayAmount(_event) {
        amount = parseFloat(_event.target.value);
        let progress = document.getElementsByTagName("progress")[0];
        console.log("Update Progress");
        progress.value = amount;
    }
})(DrinkDealer || (DrinkDealer = {}));
//# sourceMappingURL=Drinks.js.map