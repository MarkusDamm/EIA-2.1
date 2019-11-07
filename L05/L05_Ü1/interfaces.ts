namespace Barcreeper_05 {
    export interface ItemData {
        itemName: string;
        itemPrice: number;
    }

    export interface SystemData {
        [category: string]: ItemData[];
    }
}