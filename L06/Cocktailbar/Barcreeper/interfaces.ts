namespace Barcreeper_06 {
    export interface ItemData {
        itemName: string;
        itemPrice: number;
    }

    export interface SystemData {
        [category: string]: ItemData[];
    }
}