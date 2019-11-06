namespace DrinkDealer {
    window.addEventListener("load", handleLoad);
    let amount: number;
    //console.log(location);

    function handleLoad(): void {
        let form: HTMLDivElement = <HTMLDivElement>document.getElementById("form");
        let slider: HTMLInputElement = <HTMLInputElement>document.getElementById("amount");

        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }

    function handleChange(_event: Event): void {
        let order: HTMLDivElement = <HTMLDivElement>document.getElementById("order");
        order.innerHTML = "";
        let htmlText: string = "<h2>Your order</h2>";
        let total: number = 0;

        let formData: FormData = new FormData(document.forms[0]);

        for (let entry of formData) {
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
            let price: number = Number(item.getAttribute("price"));
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

    function displayAmount(_event: Event): void {
        amount = parseFloat((<HTMLInputElement>_event.target).value);
        let progress: HTMLProgressElement = <HTMLProgressElement>document.getElementsByTagName("progress")[0];
        console.log("Update Progress");
        progress.value = amount;
    }

}