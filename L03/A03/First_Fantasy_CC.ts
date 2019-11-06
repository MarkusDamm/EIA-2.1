namespace FirstFantasy_3 {
    interface DataInterface {
        name: string;
        sex: string;
        race: string;
        class: string;
        height: number;
        weight: number;
        bmi: number;
        weapons: string;
        eyecolor: string;
        haircolor: string;
        clothcolor: string;
        hairstyle: string;
        acceccoires: string;
        backstory: string;
        birthdate: Date;
        age: number;
        headwear: string[];
        alignment: string;
        equipWeight: number;
    }

    let charData: DataInterface;
    window.addEventListener("load", init);
    let weight: number;
    let heigth: number;
    let bmi: number;

    //console.log(location);

    function init(): void {
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
        //let formData: FormData = new FormData(document.forms[0]);
        //console.log(formData);

        let sex: string = "";
        let headwear: string[] = [];
        let accessories: string = "";
        let alignment: string = "";
        let equipWeight: number = 0;

        let sexEles: NodeListOf<HTMLInputElement> = document.querySelectorAll("[name=sex]");
        for (let i: number = 0; i < sexEles.length; i++) {
            if (sexEles[i].checked)
                sex = sexEles[i].value;
        }

        let headwearEles: NodeListOf<HTMLInputElement> = document.querySelectorAll("[type=checkbox]");
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
        console.log(alignment);
        for (let i: number = 0; i < alignMoralEles.length; i++) {
            if (alignMoralEles[i].checked)
                if (alignment == "Neutral" && alignMoralEles[i].value == "Neutral")
                    alignment = "True Neutral";
                else
                    alignment += " " + alignMoralEles[i].value;
        }

        let weights: NodeListOf<HTMLElement> = document.querySelectorAll("[weight]");
        let getValueforWeight: string = (<HTMLInputElement>document.getElementById("weapons")).value;
        let weaponItem: HTMLOptionElement | null = document.querySelector("option[value='" + getValueforWeight + "']");
        if (!weaponItem) 
            alert("FUCKER!");
        else
            equipWeight = Number(weaponItem.getAttribute("weight"));

        //console.log(weights);
        for (let i: number = 0; i < weights.length; i++) {
            let item: HTMLElement | HTMLInputElement | HTMLOptionElement = weights[i];

            if (item.type && item.checked)                     
                equipWeight += Number(item.getAttribute("weight"));
            
        }
        

        let age: number = calculateAge(<Date>(<HTMLInputElement>document.getElementById("birthdate")).valueAsDate);

        charData = {
            name: (<HTMLInputElement>document.getElementById("name")).value,
            sex: sex,
            race: (<HTMLInputElement>document.getElementById("race")).value,
            class: (<HTMLInputElement>document.getElementById("class")).value,
            height: heigth,
            weight: weight,
            bmi: parseInt(bmi.toFixed(1)),
            weapons: (<HTMLInputElement>document.getElementById("weapons")).value,
            eyecolor: (<HTMLInputElement>document.getElementById("eyecolor")).value,
            haircolor: (<HTMLInputElement>document.getElementById("haircolor")).value,
            clothcolor: (<HTMLInputElement>document.getElementById("clothcolor")).value,
            hairstyle: (<HTMLInputElement>document.getElementById("hairstyle")).value,
            acceccoires: accessories,
            backstory: (<HTMLTextAreaElement>document.getElementById("backstory")).value,
            birthdate: <Date>(<HTMLInputElement>document.getElementById("birthdate")).valueAsDate,
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

    function calculateAge(_birthdate: Date): number {
        let today: Date = new Date();
        let age: number = today.getFullYear() - _birthdate.getFullYear();
        let ageHtml: HTMLSpanElement = <HTMLSpanElement>document.getElementById("age");
        ageHtml.innerText = "Age: " + age;
        return age;
    }

    function handleInput(_event: Event): void {
        let weightText: HTMLSpanElement = <HTMLSpanElement>document.getElementById("weightText");
        weight = parseInt((<HTMLInputElement>_event.target).value);
        weightText.innerHTML = weight + " kg";

        displayBMI();
    }

    function displayBMI(): void {
        heigth = parseInt((<HTMLInputElement>document.getElementById("height")).value);
        bmi = weight / (heigth * heigth / 10000);
        let bmiEle: HTMLSpanElement = <HTMLSpanElement>document.getElementById("bmi");
        bmiEle.innerText = "BMI: " + bmi.toFixed(1);
    }
}