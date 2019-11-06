"use strict";
var FirstFantasy_4;
(function (FirstFantasy_4) {
    let charData;
    window.addEventListener("load", init);
    let weight;
    let heigth;
    let bmi;
    //console.log(location);
    function init() {
        generateContent(FirstFantasy_4.properties);
        let form = document.getElementById("form");
        let slider = document.querySelector("[type=range]");
        let heightInput = document.querySelector("input[type=number]");
        weight = parseInt(document.getElementById("weight").value);
        heigth = parseInt(document.getElementById("height").value);
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", handleInput);
        heightInput.addEventListener("input", displayBMI);
    }
    function handleChange(_event) {
        // let formData: FormData = new FormData(<HTMLFormElement>document.querySelector("form"));
        // console.log(formData);
        let sex = "";
        let headwear = [];
        let accessories = "";
        let alignment = "";
        // let equipWeight: number = 0;
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
        // console.log(alignment);
        if (alignment == "Ethical Neutral")
            alignment = "Neutral";
        for (let i = 0; i < alignMoralEles.length; i++) {
            if (alignMoralEles[i].checked)
                if (alignment == "Neutral" && alignMoralEles[i].value == "Neutral")
                    alignment = "True Neutral";
                else
                    alignment += " " + alignMoralEles[i].value;
        }
        // console.log(alignment);
        // let weights: NodeListOf<HTMLElement> = document.querySelectorAll("[weight]");
        // let getValueforWeight: string = (<HTMLInputElement>document.getElementById("weapons")).value;
        // let weaponItem: HTMLOptionElement | null = document.querySelector("option[value='" + getValueforWeight + "']");
        // if (!weaponItem)
        //     alert("FUCKER!");
        // else
        // equipWeight = Number(weaponItem.getAttribute("weight"));
        //console.log(weights);
        // for (let i: number = 0; i < weights.length; i++) {
        //     let item: HTMLElement | HTMLInputElement | HTMLOptionElement = weights[i];
        //     if (item.type && item.checked)
        //         equipWeight += Number(item.getAttribute("weight"));
        // }
        // let age: number = calculateAge(<Date>(<HTMLInputElement>document.getElementById("birthdate")).valueAsDate);
        charData = {
            name: document.getElementById("name").value,
            sex: sex,
            race: document.getElementById("race").value,
            class: document.getElementById("class").value,
            height: heigth,
            weight: weight,
            //bmi: parseInt(bmi.toFixed(1)),
            weapons: document.getElementById("weapons").value,
            eyecolor: document.getElementById("eyecolor").value,
            haircolor: document.getElementById("haircolor").value,
            clothcolor: document.getElementById("clothcolor").value,
            hairstyle: document.getElementById("hairstyle").value,
            acceccoires: accessories,
            backstory: document.getElementById("backstory").value,
            birthdate: document.getElementById("birthdate").valueAsDate,
            //age: age,
            headwear: headwear,
            alignment: alignment
            //equipWeight: equipWeight
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
        // let ageHtml: HTMLSpanElement = <HTMLSpanElement>document.getElementById("age");
        // ageHtml.innerText = "Age: " + age;
        return age;
    }
    function handleInput(_event) {
        // let weightText: HTMLSpanElement = <HTMLSpanElement>document.getElementById("weightText");
        weight = parseInt(_event.target.value);
        charData.weight = weight;
        charData.height = parseInt(document.getElementById("height").value);
        // weightText.innerHTML = weight + " kg";
        // displayBMI();
        showData(charData);
    }
    // function displayBMI(): void {
    //     heigth = parseInt((<HTMLInputElement>document.getElementById("height")).value);
    //     bmi = weight / (heigth * heigth / 10000);
    //     let bmiEle: HTMLSpanElement = <HTMLSpanElement>document.getElementById("bmi");
    //     bmiEle.innerText = "BMI: " + bmi.toFixed(1);
    // }
    function generateContent(_data) {
        let entry;
        for (let i = 0; i < _data.length; i++) {
            let property = _data[i];
            switch (property.type) {
                case "select":
                    entry = createSelect(property);
                    break;
                case "textarea":
                    entry = createArea(property);
                    break;
                case "text":
                case "date":
                case "number":
                case "range":
                case "color":
                    entry = createSingle(property);
                    break;
                case "radio":
                case "checkbox":
                    entry = createMultiple(property);
                    break;
                default:
                    console.log("There was an error. No fitting type: " + property.type);
                    break;
            }
            let form = document.getElementById("form");
            if (form && entry)
                form.appendChild(entry);
        }
    }
    function createSingle(_property) {
        console.log(_property);
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerText = _property.name;
        fieldset.appendChild(legend);
        let entry = document.createElement("input");
        entry.type = _property.type;
        entry.name = _property.name;
        entry.id = _property.name;
        for (let i = 0; _property.attributes && i < _property.attributes.length; i++)
            entry.setAttribute(_property.attributes[i].key, _property.attributes[i].value);
        fieldset.appendChild(entry);
        return fieldset;
    }
    function createMultiple(_property) {
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerText = _property.name;
        fieldset.appendChild(legend);
        for (let i = 0; _property.content && i < _property.content.length; i++) {
            let input = document.createElement("input");
            input.type = _property.type;
            input.name = _property.name;
            input.id = _property.content[i];
            input.value = _property.content[i];
            fieldset.appendChild(input);
            let label = document.createElement("label");
            label.setAttribute("for", _property.content[i]);
            label.innerText = _property.content[i];
            fieldset.appendChild(label);
        }
        return fieldset;
    }
    function createArea(_property) {
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerText = _property.name;
        fieldset.appendChild(legend);
        let tArea = document.createElement("textarea");
        tArea.name = _property.name;
        tArea.id = _property.name;
        for (let i = 0; _property.attributes && i < _property.attributes.length; i++)
            tArea.setAttribute(_property.attributes[i].key, _property.attributes[i].value);
        fieldset.appendChild(tArea);
        return fieldset;
    }
    function createSelect(_property) {
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerText = _property.name;
        fieldset.appendChild(legend);
        let select = document.createElement("select");
        select.name = _property.name;
        select.id = _property.name;
        for (let i = 0; _property.content && i < _property.content.length; i++) {
            let option = document.createElement("option");
            option.value = _property.content[i];
            option.innerText = _property.content[i];
            select.appendChild(option);
        }
        fieldset.appendChild(select);
        return fieldset;
    }
})(FirstFantasy_4 || (FirstFantasy_4 = {}));
//# sourceMappingURL=First_Fantasy_CC.js.map