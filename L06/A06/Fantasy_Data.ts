namespace FirstFantasy_6 {
    export interface DataInterface {
        name: string;
        sex: string;
        race: string;
        class: string;
        height: number;
        weight: number;
        weapons: string;
        eyecolor: string;
        haircolor: string;
        clothcolor: string;
        hairstyle: string;
        acceccoires: string;
        backstory: string;
        birthdate: Date;
        headwear: string[];
        alignment: string;
    }

    export interface Property {
        [name: string]: Container;
    }

    export interface Container {
        type: string;
        name: string;
        content?: string[];
        attributes?: Attribute[];
    }

    interface Attribute {
        key: string;
        value: string;
    }
}