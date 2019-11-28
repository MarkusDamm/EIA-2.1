namespace FirstFantasy_7 {

    let charData: DataInterface;
    window.addEventListener("load", init);
    let weight: number;
    let heigth: number;
    let bmi: number;
    let form: HTMLFormElement;

    // let url: string = "http://localhost:5001/";
    let url: string = "https://fuwa-eia2-1.herokuapp.com/";

    async function init(): Promise<void> {
        let response: Response = await fetch("Fantasy_Data.json");
        let offer: string = await response.text();
        let data: Property[] = JSON.parse(offer);

        generateContent(data);
        form = <HTMLFormElement>document.querySelector("form[id=form]");
        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("[type=range]");
        weight = parseInt((<HTMLInputElement>document.getElementById("weight")).value);
        heigth = parseInt((<HTMLInputElement>document.getElementById("height")).value);
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", handleInput);

        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=submit]");
        let reset: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=reset]");
        let report: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=report]");

        submit.addEventListener("click", sendOrder);
        reset.addEventListener("click", resetOrder);
        report.addEventListener("click", reportCharacters);
        
    }

    function handleChange(_event: Event): void {
        let sex: string = "";
        let headwear: string[] = [];
        let accessories: string = "";
        let alignment: string = "";

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
        if (alignment == "Ethical Neutral")
            alignment = "Neutral";
        for (let i: number = 0; i < alignMoralEles.length; i++) {
            if (alignMoralEles[i].checked)
                if (alignment == "Neutral" && alignMoralEles[i].value == "Neutral")
                    alignment = "True Neutral";
                else
                    alignment += " " + alignMoralEles[i].value;
        }

        charData = {
            name: (<HTMLInputElement>document.getElementById("name")).value,
            sex: sex,
            race: (<HTMLInputElement>document.getElementById("race")).value,
            class: (<HTMLInputElement>document.getElementById("class")).value,
            height: heigth,
            weight: weight,
            weapons: (<HTMLInputElement>document.getElementById("weapons")).value,
            eyecolor: (<HTMLInputElement>document.getElementById("eyecolor")).value,
            haircolor: (<HTMLInputElement>document.getElementById("haircolor")).value,
            clothcolor: (<HTMLInputElement>document.getElementById("clothcolor")).value,
            hairstyle: (<HTMLInputElement>document.getElementById("hairstyle")).value,
            acceccoires: accessories,
            backstory: (<HTMLTextAreaElement>document.getElementById("backstory")).value,
            birthdate: <Date>(<HTMLInputElement>document.getElementById("birthdate")).valueAsDate,
            headwear: headwear,
            alignment: alignment
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
        return age;
    }

    function handleInput(_event: Event): void {
        weight = parseInt((<HTMLInputElement>_event.target).value);
        charData.weight = weight;
        charData.height = parseInt((<HTMLInputElement>document.getElementById("height")).value);
        showData(charData);
    }

    function generateContent(_data: Property[]): void {
        let entry: HTMLElement;
        for (let name in _data) {
            let container: Container = _data[name];
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
            let form: HTMLElement | null = document.getElementById("form");
            if (form && entry)
                form.appendChild(entry);
        }
    }

    function createSingle(_container: Container, _name: string): HTMLElement {
        console.log(_container);
        let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
        let legend: HTMLLegendElement = document.createElement("legend");
        legend.innerText = _name;
        fieldset.appendChild(legend);
        let entry: HTMLInputElement = document.createElement("input");
        entry.type = _container.type;
        entry.name = _container.name;
        entry.id = _container.name;
        for (let i: number = 0; _container.attributes && i < _container.attributes.length; i++)
            entry.setAttribute(_container.attributes[i].key, _container.attributes[i].value);

        fieldset.appendChild(entry);
        return fieldset;
    }

    function createMultiple(_container: Container, _name: string): HTMLElement {
        let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
        let legend: HTMLLegendElement = document.createElement("legend");
        legend.innerText = _name;
        fieldset.appendChild(legend);

        for (let i: number = 0; _container.content && i < _container.content.length; i++) {
            let input: HTMLInputElement = document.createElement("input");
            input.type = _container.type;
            input.name = _container.name;
            input.id = _container.content[i];
            input.value = _container.content[i];
            fieldset.appendChild(input);
            let label: HTMLLabelElement = document.createElement("label");
            label.setAttribute("for", _container.content[i]);
            label.innerText = _container.content[i];
            fieldset.appendChild(label);
        }
        return fieldset;
    }

    function createArea(_container: Container, _name: string): HTMLElement {
        let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
        let legend: HTMLLegendElement = document.createElement("legend");
        legend.innerText = _name;
        fieldset.appendChild(legend);
        let tArea: HTMLTextAreaElement = document.createElement("textarea");
        tArea.name = _container.name;
        tArea.id = _container.name;

        for (let i: number = 0; _container.attributes && i < _container.attributes.length; i++)
            tArea.setAttribute(_container.attributes[i].key, _container.attributes[i].value);

        fieldset.appendChild(tArea);
        return fieldset;
    }

    function createSelect(_container: Container, _name: string): HTMLElement {
        let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
        let legend: HTMLLegendElement = document.createElement("legend");
        legend.innerText = _name;
        fieldset.appendChild(legend);

        let select: HTMLSelectElement = document.createElement("select");
        select.name = _container.name;
        select.id = _container.name;

        for (let i: number = 0; _container.content && i < _container.content.length; i++) {
            let option: HTMLOptionElement = document.createElement("option");
            option.value = _container.content[i];
            option.innerText = _container.content[i];
            select.appendChild(option);
        }

        fieldset.appendChild(select);
        return fieldset;
    }

    async function sendOrder(_event: Event): Promise<void> {
        _event.preventDefault();
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        console.log(query);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        // await fetch("index.html?" + query.toString());
        // alert("Order sent ");
        alert(responseText);
        console.log(responseText);
    }

    function resetOrder(_event: Event): void {
        let order: HTMLDivElement = <HTMLDivElement>document.getElementById("order");
        order.innerText = "";
    }

    async function reportCharacters(_event: Event): Promise<void> {
        console.log("Trying to report Orders");
        let query: string = "command=retrieve";
        let response: Response = await fetch(url + "?" + query);
        let responseText: string = await response.text();

        alert(responseText);
        let orders: HTMLDivElement = <HTMLDivElement>document.querySelector("div#report");
        orders.innerText = responseText;
    }
}