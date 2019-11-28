"use strict";
var FirstFantasy_7;
(function (FirstFantasy_7) {
    let charData;
    window.addEventListener("load", init);
    let weight;
    let heigth;
    let bmi;
    let form;
    // let url: string = "http://localhost:5001/";
    let url = "https://fuwa-eia2-1.herokuapp.com/";
    async function init() {
        let response = await fetch("Fantasy_Data.json");
        let offer = await response.text();
        let data = JSON.parse(offer);
        generateContent(data);
        form = document.querySelector("form[id=form]");
        let slider = document.querySelector("[type=range]");
        weight = parseInt(document.getElementById("weight").value);
        heigth = parseInt(document.getElementById("height").value);
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", handleInput);
        let submit = document.querySelector("button[type=submit]");
        let reset = document.querySelector("button[type=reset]");
        let report = document.querySelector("button[type=report]");
        submit.addEventListener("click", sendOrder);
        reset.addEventListener("click", resetOrder);
        report.addEventListener("click", reportCharacters);
    }
    function handleChange(_event) {
        let sex = "";
        let headwear = [];
        let accessories = "";
        let alignment = "";
        heigth = parseInt(document.getElementById("height").value);
        let sexEles = document.querySelectorAll("[name=sex]");
        for (let i = 0; i < sexEles.length; i++) {
            if (sexEles[i].checked)
                sex = sexEles[i].value;
        }
        let headwearEles = document.querySelectorAll("[name=Headwear]");
        headwear.splice(0, headwear.length);
        for (let i = 0; i < headwearEles.length; i++) {
            if (headwearEles[i].checked)
                headwear.push(headwearEles[i].value);
        }
        let accecEles = document.querySelectorAll("[name=accessories]");
        for (let i = 0; i < accecEles.length; i++) {
            if (accecEles[i].checked)
                accessories = accecEles[i].value;
        }
        let alignMoralEles = document.querySelectorAll("[name=moral]");
        let alignEthiEles = document.querySelectorAll("[name=ethical]");
        for (let i = 0; i < alignEthiEles.length; i++) {
            if (alignEthiEles[i].checked)
                alignment = alignEthiEles[i].value;
        }
        if (alignment == "Ethical Neutral")
            alignment = "Neutral";
        for (let i = 0; i < alignMoralEles.length; i++) {
            if (alignMoralEles[i].checked)
                if (alignment == "Neutral" && alignMoralEles[i].value == "Neutral")
                    alignment = "True Neutral";
                else
                    alignment += " " + alignMoralEles[i].value;
        }
        charData = {
            name: document.getElementById("name").value,
            sex: sex,
            race: document.getElementById("race").value,
            class: document.getElementById("class").value,
            height: heigth,
            weight: weight,
            weapons: document.getElementById("weapons").value,
            eyecolor: document.getElementById("eyecolor").value,
            haircolor: document.getElementById("haircolor").value,
            clothcolor: document.getElementById("clothcolor").value,
            hairstyle: document.getElementById("hairstyle").value,
            acceccoires: accessories,
            backstory: document.getElementById("backstory").value,
            birthdate: document.getElementById("birthdate").valueAsDate,
            headwear: headwear,
            alignment: alignment
        };
        console.log(charData);
        showData(charData);
    }
    function showData(_data) {
        let data = document.getElementById("data");
        let age = calculateAge(_data.birthdate);
        bmi = _data.weight / (_data.height * _data.height / 10000);
        data.innerText = JSON.stringify(_data) + " Age: " + age + " BMI: " + bmi.toFixed(1);
    }
    function calculateAge(_birthdate) {
        let today = new Date();
        let age = today.getFullYear() - _birthdate.getFullYear();
        return age;
    }
    function handleInput(_event) {
        weight = parseInt(_event.target.value);
        charData.weight = weight;
        charData.height = parseInt(document.getElementById("height").value);
        showData(charData);
    }
    function generateContent(_data) {
        let entry;
        for (let name in _data) {
            let container = _data[name];
            // console.log("Properties: ", _data[name]);
            switch (container.type) {
                case "select":
                    entry = createSelect(container, name);
                    break;
                case "textarea":
                    entry = createArea(container, name);
                    break;
                case "text":
                case "date":
                case "number":
                case "range":
                case "color":
                    entry = createSingle(container, name);
                    break;
                case "radio":
                case "checkbox":
                    entry = createMultiple(container, name);
                    break;
                default:
                    console.log("There was an error. No fitting type: " + container.type);
                    break;
            }
            let form = document.getElementById("form");
            if (form && entry)
                form.appendChild(entry);
        }
    }
    function createSingle(_container, _name) {
        console.log(_container);
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerText = _name;
        fieldset.appendChild(legend);
        let entry = document.createElement("input");
        entry.type = _container.type;
        entry.name = _container.name;
        entry.id = _container.name;
        for (let i = 0; _container.attributes && i < _container.attributes.length; i++)
            entry.setAttribute(_container.attributes[i].key, _container.attributes[i].value);
        fieldset.appendChild(entry);
        return fieldset;
    }
    function createMultiple(_container, _name) {
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerText = _name;
        fieldset.appendChild(legend);
        for (let i = 0; _container.content && i < _container.content.length; i++) {
            let input = document.createElement("input");
            input.type = _container.type;
            input.name = _container.name;
            input.id = _container.content[i];
            input.value = _container.content[i];
            fieldset.appendChild(input);
            let label = document.createElement("label");
            label.setAttribute("for", _container.content[i]);
            label.innerText = _container.content[i];
            fieldset.appendChild(label);
        }
        return fieldset;
    }
    function createArea(_container, _name) {
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerText = _name;
        fieldset.appendChild(legend);
        let tArea = document.createElement("textarea");
        tArea.name = _container.name;
        tArea.id = _container.name;
        for (let i = 0; _container.attributes && i < _container.attributes.length; i++)
            tArea.setAttribute(_container.attributes[i].key, _container.attributes[i].value);
        fieldset.appendChild(tArea);
        return fieldset;
    }
    function createSelect(_container, _name) {
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerText = _name;
        fieldset.appendChild(legend);
        let select = document.createElement("select");
        select.name = _container.name;
        select.id = _container.name;
        for (let i = 0; _container.content && i < _container.content.length; i++) {
            let option = document.createElement("option");
            option.value = _container.content[i];
            option.innerText = _container.content[i];
            select.appendChild(option);
        }
        fieldset.appendChild(select);
        return fieldset;
    }
    async function sendOrder(_event) {
        _event.preventDefault();
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        console.log(query);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        // await fetch("index.html?" + query.toString());
        // alert("Order sent ");
        alert(responseText);
        console.log(responseText);
    }
    function resetOrder(_event) {
        let order = document.getElementById("order");
        order.innerText = "";
    }
    async function reportCharacters(_event) {
        console.log("Trying to report Orders");
        let query = "command=retrieve";
        let response = await fetch(url + "?" + query);
        let responseText = await response.text();
        alert(responseText);
        let orders = document.querySelector("div#report");
        orders.innerText = responseText;
    }
})(FirstFantasy_7 || (FirstFantasy_7 = {}));
//# sourceMappingURL=First_Fantasy_CC.js.map