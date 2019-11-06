"use strict";
var Barcreeper;
(function (Barcreeper) {
    window.addEventListener("load", handleLoad);
    let amount = 0.5;
    //console.log(location);
    function handleLoad() {
        generateContent(Barcreeper.allData);
        console.log(Barcreeper.allData);
        console.log("All Data here");
        let form = document.getElementById("form");
        let slider = document.getElementById("amount");
        if (!document.getElementsByTagName("div")[4])
            alert("Etwas scheint nicht zu stimmen");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function generateContent(_data) {
        let items;
        let group = document.createElement("div");
        for (let category in _data) {
            items = _data[category];
            // DO THIS
            if (category == "Drink")
                group = createSelect(items, category);
            else if (category == "Container")
                group = createRadio(items, category);
            else if (category == "Extras")
                group = createCheckbox(items, category);
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
        // for (let i: number = 0; i < _data.length; i++) {
        //     let category: string = _data[i].category;
        //     let items: NewData[] = _data[i].item;
        //     let group: HTMLDivElement = new HTMLDivElement;
        //     if (category == "Drink")
        //         group = createSelect(items, category);
        //     else if (category == "Container")
        //         group = createRadio(items, category);
        //     if (category == "Extras")
        //         group = createCheckbox(items, category);
        //     let fieldset: HTMLFieldSetElement = <HTMLFieldSetElement>document.getElementById(category);
        //     fieldset.appendChild(group);
        //     }
    }
    function createSelect(_items, _category) {
        //
        let group = document.createElement("div");
        let select = document.createElement("select");
        select.setAttribute("name", _category);
        for (let i = 0; i < _items.length; i++) {
            let item = _items[i];
            let option = document.createElement("option");
            option.setAttribute("price", item.itemPrice.toFixed(2));
            option.setAttribute("value", item.itemName);
            option.setAttribute("name", _category);
            option.innerText = item.itemName;
            select.appendChild(option);
        }
        group.appendChild(select);
        return group;
    }
    function createRadio(_items, _category) {
        //
        let group = document.createElement("div");
        for (let i = 0; i < _items.length; i++) {
            let item = _items[i];
            let input = document.createElement("input");
            let label = document.createElement("label");
            input.setAttribute("type", "radio");
            input.setAttribute("price", item.itemPrice.toFixed(2));
            input.setAttribute("value", item.itemName);
            input.setAttribute("name", _category);
            input.setAttribute("id", item.itemName);
            label.setAttribute("for", item.itemName);
            label.innerText = item.itemName;
            group.appendChild(input);
            group.appendChild(label);
        }
        return group;
    }
    function createCheckbox(_items, _category) {
        //
        let group = document.createElement("div");
        /*for (const item of _items) {
            let checkbox: HTMLInputElement = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.itemPrice.toFixed(2));
            checkbox.value = item.itemName;
            checkbox.name = _category;
            checkbox.id = item.itemName;

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.itemName;
            label.htmlFor = item.itemName;

            group.appendChild(checkbox);
            group.appendChild(label);

        }
*/
        for (let i = 0; i < _items.length; i++) {
            let item = _items[i];
            let checkbox = document.createElement("input");
            let label = document.createElement("label");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("price", item.itemPrice.toFixed(2));
            checkbox.setAttribute("value", item.itemName);
            checkbox.setAttribute("name", item.itemName);
            checkbox.setAttribute("id", item.itemName);
            group.appendChild(checkbox);
            label.setAttribute("for", item.itemName);
            label.innerText = item.itemName;
            group.appendChild(label);
        }
        return group;
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
})(Barcreeper || (Barcreeper = {}));
//# sourceMappingURL=Drinks.js.map