namespace FirstFantasy_4 {
    export interface DataInterface {
        name: string;
        sex: string;
        race: string;
        class: string;
        height: number;
        weight: number;
        // bmi: number;
        weapons: string;
        eyecolor: string;
        haircolor: string;
        clothcolor: string;
        hairstyle: string;
        acceccoires: string;
        backstory: string;
        birthdate: Date;
        // age: number;
        headwear: string[];
        alignment: string;
        // equipWeight: number;
    }

    export interface Property {
        type: string;
        name: string;
        content?: string[];
        attributes?: Attribute[];
    }

    interface Attribute {
        key: string;
        value: string;
    }

    export let properties: Property[] = [
        { type: "text", name: "name" },
        { type: "radio", name: "sex", content: ["male", "female", "divers", "apache"] },
        //Select Race
        { type: "select", name: "race", content: ["Human", "Orc", "Elf", "Tauren", "Gnome"] },

        //Select Class
        { type: "select", name: "class", content: ["Warrior", "Shaman", "Bard", "Dragonknight", "Paladin"] },

        { type: "number", name: "height", attributes: [{ key: "min", value: "130" }, { key: "max", value: "210" }, { key: "value", value: "170" }] },
        { type: "range", name: "weight", attributes: [{ key: "min", value: "40" }, { key: "max", value: "180" }, { key: "value", value: "70" }, { key: "step", value: "1" }] },
        //Select Weapon
        { type: "select", name: "weapons", content: ["Sword and Shield", "Greatsword", "Bow", "Daggers", "Mace"] },

        { type: "color", name: "eyecolor", attributes: [{ key: "value", value: "#00cc00" }] },
        { type: "color", name: "haircolor", attributes: [{ key: "value", value: "#0000ff" }] },
        { type: "color", name: "clothcolor", attributes: [{ key: "value", value: "#af7a09" }] },
        { type: "select", name: "hairstyle", content: ["Spiky", "Long", "Catears", "Podhead", "Bold"] },
        { type: "radio", name: "accessories", content: ["Bag", "Backbag", "Lab Coat"] },
        //TextArea Backstory
        { type: "textarea", name: "backstory", attributes: [{key: "cols", value: "80"}, {key: "rows", value: "6"}] },

        { type: "date", name: "birthdate" },
        { type: "checkbox", name: "Headwear", content: ["Beer helmet", "Top hat", "Pot", "Driving head"] },
        { type: "radio", name: "moral", content: ["Good", "Neutral", "Evil"] },
        { type: "radio", name: "ethical", content: ["Lawful", "Ethical Neutral", "Chaotic"] }

    ];

}