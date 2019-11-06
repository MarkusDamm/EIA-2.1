"use strict";
var FirstFantasy_3;
(function (FirstFantasy_3) {
    let charData;
    window.addEventListener("load", init);
    let weight;
    let heigth;
    let bmi;
    //console.log(location);
    function init() {
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
        //let formData: FormData = new FormData(document.forms[0]);
        //console.log(formData);
        let sex = "";
        let headwear = [];
        let accessories = "";
        let alignment = "";
        let equipWeight = 0;
        let sexEles = document.querySelectorAll("[name=sex]");
        for (let i = 0; i < sexEles.length; i++) {
            if (sexEles[i].checked)
                sex = sexEles[i].value;
        }
        let headwearEles = document.querySelectorAll("[type=checkbox]");
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
        console.log(alignment);
        for (let i = 0; i < alignMoralEles.length; i++) {
            if (alignMoralEles[i].checked)
                if (alignment == "Neutral" && alignMoralEles[i].value == "Neutral")
                    alignment = "True Neutral";
                else
                    alignment += " " + alignMoralEles[i].value;
        }
        let weights = document.querySelectorAll("[weight]");
        let getValueforWeight = document.getElementById("weapons").value;
        let weaponItem = document.querySelector("option[value='" + getValueforWeight + "']");
        if (!weaponItem)
            alert("FUCKER!");
        else
            equipWeight = Number(weaponItem.getAttribute("weight"));
        //console.log(weights);
        for (let i = 0; i < weights.length; i++) {
            let item = weights[i];
            if (item.type && item.checked)
                equipWeight += Number(item.getAttribute("weight"));
        }
        let age = calculateAge(document.getElementById("birthdate").valueAsDate);
        charData = {
            name: document.getElementById("name").value,
            sex: sex,
            race: document.getElementById("race").value,
            class: document.getElementById("class").value,
            height: heigth,
            weight: weight,
            bmi: parseInt(bmi.toFixed(1)),
            weapons: document.getElementById("weapons").value,
            eyecolor: document.getElementById("eyecolor").value,
            haircolor: document.getElementById("haircolor").value,
            clothcolor: document.getElementById("clothcolor").value,
            hairstyle: document.getElementById("hairstyle").value,
            acceccoires: accessories,
            backstory: document.getElementById("backstory").value,
            birthdate: document.getElementById("birthdate").valueAsDate,
            age: age,
            headwear: headwear,
            alignment: alignment,
            equipWeight: equipWeight
        };
        console.log(charData);
        // for (let entry of formData) {
        //     let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
        //     console.log(item);
        //     item was null
        //     if (item.getAttribute("name") == "Drink") {
        //         let amountEle: HTMLInputElement = <HTMLInputElement>document.querySelector("[type=range]");
        //         console.log(amountEle);
        //     }
        //     else if (item.max == "1.0") {
        //         //
        //     }
        //     else {
        //         //
        //     }
        // }
    }
    function calculateAge(_birthdate) {
        let today = new Date();
        let age = today.getFullYear() - _birthdate.getFullYear();
        let ageHtml = document.getElementById("age");
        ageHtml.innerText = "Age: " + age;
        return age;
    }
    function handleInput(_event) {
        let weightText = document.getElementById("weightText");
        weight = parseInt(_event.target.value);
        weightText.innerHTML = weight + " kg";
        displayBMI();
    }
    function displayBMI() {
        heigth = parseInt(document.getElementById("height").value);
        bmi = weight / (heigth * heigth / 10000);
        let bmiEle = document.getElementById("bmi");
        bmiEle.innerText = "BMI: " + bmi.toFixed(1);
    }
})(FirstFantasy_3 || (FirstFantasy_3 = {}));
//# sourceMappingURL=First_Fantasy_CC.js.map