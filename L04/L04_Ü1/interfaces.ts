namespace Barcreeper {
    export interface ItemData {
        itemName: string;
        itemPrice: number;
    }

    export interface SystemData {
        category: string;
        item: ItemData[];
    }

    export interface NewData {
        [category: string]: ItemData[];
    }
}