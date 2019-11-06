namespace FirstFantasy_4 {

    let charData: DataInterface;
    window.addEventListener("load", init);
    let weight: number;
    let heigth: number;
    let bmi: number;
    //console.log(location);

    function init(): void {
        generateContent(properties);
        let form: HTMLDivElement = <HTMLDivElement>document.getElementById("form");
        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("[type=range]");
        let heightInput: HTMLInputElement = <HTMLInputElement>document.querySelector("input[type=number]");
        weight = parseInt((<HTMLInputElement>document.getElementById("weight")).value);
        heigth = parseInt((<HTMLInputElement>document.getElementById("height")).value);
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", handleInput);
        heightInput.addEventListener("input", displayBMI);
    }

    function handleChange(_event: Event): void {
        // let formData: FormData = new FormData(<HTMLFormElement>document.querySelector("form"));
        // console.log(formData);

        let sex: string = "";
        let headwear: string[] = [];
        let accessories: string = "";
        let alignment: string = "";
        // let equipWeight: number = 0;

        heigth = parseInt((<HTMLInputElement>document.getElementById("height")).value);
        let sexEles: NodeListOf<HTMLInputElement> = document.querySelectorAll("[name=sex]");
        for (let i: number = 0; i < sexEles.length; i++) {
            if (sexEles[i].checked)
                sex = sexEles[i].value;
        }

        let headwearEles: NodeListOf<HTMLInputElement> = document.querySelectorAll("[name=Headwear]");
        headwear.splice(0, headwear.length);
        for (let i: number = 0; i < headwearEles.length; i++) {
            if (headwearEles[i].checked)
                headwear.push(headwearEles[i].value);
        }

        let accecEles: NodeListOf<HTMLInputElement> = document.querySelectorAll("[name=accessories]");
        for (let i: number = 0; i < accecEles.length; i++) {
            if (accecEles[i].checked)
                accessories = accecEles[i].value;
        }

        let alignMoralEles: NodeListOf<HTMLInputElement> = document.querySelectorAll("[name=moral]");
        let alignEthiEles: NodeListOf<HTMLInputElement> = document.querySelectorAll("[name=ethical]");
        for (let i: number = 0; i < alignEthiEles.length; i++) {
            if (alignEthiEles[i].checked)
                alignment = alignEthiEles[i].value;
        }
        // console.log(alignment);
        if (alignment == "Ethical Neutral")
            alignment = "Neutral";
        for (let i: number = 0; i < alignMoralEles.length; i++) {
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
            name: (<HTMLInputElement>document.getElementById("name")).value,
            sex: sex,
            race: (<HTMLInputElement>document.getElementById("race")).value,
            class: (<HTMLInputElement>document.getElementById("class")).value,
            height: heigth,
            weight: weight,
            //bmi: parseInt(bmi.toFixed(1)),
            weapons: (<HTMLInputElement>document.getElementById("weapons")).value,
            eyecolor: (<HTMLInputElement>document.getElementById("eyecolor")).value,
            haircolor: (<HTMLInputElement>document.getElementById("haircolor")).value,
            clothcolor: (<HTMLInputElement>document.getElementById("clothcolor")).value,
            hairstyle: (<HTMLInputElement>document.getElementById("hairstyle")).value,
            acceccoires: accessories,
            backstory: (<HTMLTextAreaElement>document.getElementById("backstory")).value,
            birthdate: <Date>(<HTMLInputElement>document.getElementById("birthdate")).valueAsDate,
            //age: age,
            headwear: headwear,
            alignment: alignment
            //equipWeight: equipWeight
        };

        console.log(charData);
        showData(charData);
    }

    function showData(_data: DataInterface): void {
        let data: HTMLDivElement = <HTMLDivElement>document.getElementById("data");
        let age: number = calculateAge(_data.birthdate);
        bmi = _data.weight / (_data.height * _data.height / 10000);
        data.innerText = JSON.stringify(_data) + " Age: " + age + " BMI: " + bmi.toFixed(1);
    }

    function calculateAge(_birthdate: Date): number {
        let today: Date = new Date();
        let age: number = today.getFullYear() - _birthdate.getFullYear();
        // let ageHtml: HTMLSpanElement = <HTMLSpanElement>document.getElementById("age");
        // ageHtml.innerText = "Age: " + age;
        return age;
    }

    function handleInput(_event: Event): void {
        // let weightText: HTMLSpanElement = <HTMLSpanElement>document.getElementById("weightText");
        weight = parseInt((<HTMLInputElement>_event.target).value);
        charData.weight = weight;
        charData.height = parseInt((<HTMLInputElement>document.getElementById("height")).value);
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

    function generateContent(_data: Property[]): void {
        let entry: HTMLElement;
        for (let i: number = 0; i < _data.length; i++) {
            let property: Property = _data[i];

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
            let form: HTMLElement | null = document.getElementById("form");
            if (form && entry)
                form.appendChild(entry);
        }
        
    }

    function createSingle (_property: Property): HTMLElement {
        console.log(_property);
        let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
        let legend: HTMLLegendElement = document.createElement("legend");
        legend.innerText = _property.name;
        fieldset.appendChild(legend);
        let entry: HTMLInputElement = document.createElement("input");
        entry.type = _property.type;
        entry.name = _property.name;
        entry.id = _property.name;
        for (let i: number = 0; _property.attributes && i < _property.attributes.length; i++) 
            entry.setAttribute(_property.attributes[i].key, _property.attributes[i].value);
        
        fieldset.appendChild(entry);
        return fieldset;
    }

    function createMultiple(_property: Property): HTMLElement {
        let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
        let legend: HTMLLegendElement = document.createElement("legend");
        legend.innerText = _property.name;
        fieldset.appendChild(legend);

        for (let i: number = 0; _property.content && i < _property.content.length; i++) {
            let input: HTMLInputElement = document.createElement("input");
            input.type = _property.type;
            input.name = _property.name;
            input.id = _property.content[i];
            input.value = _property.content[i];
            fieldset.appendChild(input);
            let label: HTMLLabelElement = document.createElement("label");
            label.setAttribute("for", _property.content[i]);
            label.innerText = _property.content[i];
            fieldset.appendChild(label);
        }
        return fieldset;
    }

    function createArea(_property: Property): HTMLElement {
        let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
        let legend: HTMLLegendElement = document.createElement("legend");
        legend.innerText = _property.name;
        fieldset.appendChild(legend);
        let tArea: HTMLTextAreaElement = document.createElement("textarea");
        tArea.name = _property.name;
        tArea.id = _property.name;

        for (let i: number = 0; _property.attributes && i < _property.attributes.length; i++) 
            tArea.setAttribute(_property.attributes[i].key, _property.attributes[i].value);
        
        fieldset.appendChild(tArea);
        return fieldset;
    }

    function createSelect(_property: Property): HTMLElement {
        let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
        let legend: HTMLLegendElement = document.createElement("legend");
        legend.innerText = _property.name;
        fieldset.appendChild(legend);

        let select: HTMLSelectElement = document.createElement("select");
        select.name = _property.name;
        select.id = _property.name;

        for (let i: number = 0; _property.content && i < _property.content.length; i++) {
            let option: HTMLOptionElement = document.createElement("option");
            option.value = _property.content[i];
            option.innerText = _property.content[i];
            select.appendChild(option);
        }

        fieldset.appendChild(select);
        return fieldset;
    }
}