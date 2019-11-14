namespace Barcreeper_05 {
    window.addEventListener("load", handleLoad);
    let amount: number = 0.5;
    let form: HTMLFormElement;

    async function handleLoad(): Promise<void> {

        let response: Response = await fetch("Data.json");
        let offer: string = await response.text();
        let data: SystemData = JSON.parse(offer);

        generateContent(data);
        // console.log(allData);
        // console.log("All Data here");

        form = <HTMLFormElement>document.getElementById("form");
        let slider: HTMLInputElement = <HTMLInputElement>document.getElementById("amount");
        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=submit]");
        let reset: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=reset]");

        if (!document.getElementsByTagName("div")[4])
            alert("Etwas scheint nicht zu stimmen");

        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
        submit.addEventListener("click", sendOrder);
        reset.addEventListener("click", resetOrder);
        displayAmount();
    }

    async function sendOrder(_event: Event): Promise<void> {
        _event.preventDefault();
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        console.log(query);
        await fetch("index.html?" + query.toString());
        alert("Order sent :)");
    }

    function resetOrder(_event: Event): void {
        let order: HTMLDivElement = <HTMLDivElement>document.getElementById("order");
        order.innerText = "";
        setTimeout(displayAmount, 50);
    }

    function generateContent(_data: SystemData): void {
        for (let category in _data) {
            // category = _data[i].category;
            let items: ItemData[] = _data[category];
            let group: HTMLDivElement = document.createElement("div");

            if (category == "Drink")
                group = <HTMLDivElement>createSelect(items, category);

            else if (category == "Container")
                group = <HTMLDivElement>createRadio(items, category);

            if (category == "Extras")
                group = <HTMLDivElement>createCheckbox(items, category);

            let fieldset: HTMLFieldSetElement = <HTMLFieldSetElement>document.getElementById(category);
            fieldset.appendChild(group);
        }
    }

    function createSelect(_items: ItemData[], _category: string): HTMLDivElement {
        
        let group: HTMLDivElement = document.createElement("div");
        let select: HTMLSelectElement = document.createElement("select");
        select.setAttribute("name", _category);

        for (let item of _items) {
            let option: HTMLOptionElement = document.createElement("option");
            option.setAttribute("price", item.itemPrice.toFixed(2));
            option.setAttribute("value", item.itemName);
            option.setAttribute("name", _category);
            option.innerText = item.itemName;
            select.appendChild(option);
        }
        group.appendChild(select);
        return group;
    }

    function createRadio(_items: ItemData[], _category: string): HTMLDivElement {
        
        let group: HTMLDivElement = document.createElement("div");

        for (let i: number = 0; i < _items.length; i++) {
            let item: ItemData = _items[i];
            let input: HTMLInputElement = document.createElement("input");
            let label: HTMLLabelElement = document.createElement("label");

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

    function createCheckbox(_items: ItemData[], _category: string): HTMLDivElement {
        
        let group: HTMLDivElement = document.createElement("div");

        for (let i: number = 0; i < _items.length; i++) {
            let item: ItemData = _items[i];
            let checkbox: HTMLInputElement = document.createElement("input");
            let label: HTMLLabelElement = document.createElement("label");
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

    function handleChange(_event: Event): void {
        let order: HTMLDivElement = <HTMLDivElement>document.getElementById("order");
        order.innerHTML = "";
        let htmlText: string = "";
        let total: number = 0;

        let formData: FormData = new FormData(form);

        for (let entry of formData) {
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
            let price: number = Number(item.getAttribute("price"));

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

    function displayAmount(_event?: Event): void {
        if (_event)
            amount = parseFloat((<HTMLInputElement>_event.target).value);
        else {
            let slider: HTMLInputElement = <HTMLInputElement>document.getElementById("amount");
            amount = Number(slider.value);
            console.log(amount);
        }    
        let progress: HTMLProgressElement = <HTMLProgressElement>document.getElementsByTagName("progress")[0];
        console.log("Update Progress");
        progress.value = amount;
    }
}