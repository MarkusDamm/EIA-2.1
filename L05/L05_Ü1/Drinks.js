"use strict";
var Barcreeper_05;
(function (Barcreeper_05) {
    window.addEventListener("load", handleLoad);
    let amount = 0.5;
    let form;
    function handleLoad() {
        generateContent(Barcreeper_05.allData);
        // console.log(allData);
        // console.log("All Data here");
        form = document.getElementById("form");
        let slider = document.getElementById("amount");
        let submit = document.querySelector("button[type=submit]");
        let reset = document.querySelector("button[type=reset]");
        if (!document.getElementsByTagName("div")[4])
            alert("Etwas scheint nicht zu stimmen");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
        submit.addEventListener("click", sendOrder);
        reset.addEventListener("click", resetOrder);
    }
    async function sendOrder(_event) {
        _event.preventDefault();
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        console.log(query);
        await fetch("index.html?" + query.toString());
        alert("Order sent :)");
    }
    function resetOrder(_event) {
        let order = document.getElementById("order");
        order.innerText = "";
    }
    function generateContent(_data) {
        let i = 0;
        for (let category in _data) {
            category = _data[i].category;
            let items = _data[i].item;
            let group = document.createElement("div");
            if (category == "Drink")
                group = createSelect(items, category);
            else if (category == "Container")
                group = createRadio(items, category);
            if (category == "Extras")
                group = createCheckbox(items, category);
            let fieldset = document.getElementById(category);
            fieldset.appendChild(group);
            i++;
        }
    }
    function createSelect(_items, _category) {
        let group = document.createElement("div");
        let select = document.createElement("select");
        select.setAttribute("name", _category);
        for (let item of _items) {
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
        let group = document.createElement("div");
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
        let htmlText = "";
        let total = 0;
        let formData = new FormData(form);
        for (let entry of formData) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            let price = Number(item.getAttribute("price"));
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
})(Barcreeper_05 || (Barcreeper_05 = {}));
//# sourceMappingURL=Drinks.js.map