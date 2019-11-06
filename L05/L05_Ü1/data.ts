namespace Barcreeper_05 {
    export let allData: SystemData[] = [
        {
            category: "Drink", item: [
                { itemName: "Mojito", itemPrice: 24 },
                { itemName: "Zombie", itemPrice: 29 },
                { itemName: "Bloody Mary", itemPrice: 33.33 },
                { itemName: "The Bob-Omb", itemPrice: 17 },
                { itemName: "Scottish Tea", itemPrice: 26}
            ]
        },
        {
            category: "Container", item: [
                { itemName: "Slim", itemPrice: 2 },
                { itemName: "Wide", itemPrice: 3 },
                { itemName: "Paper", itemPrice: 1 },
                { itemName: "Plastic Bag", itemPrice: 0},
                { itemName: "Bucket", itemPrice: 7}
            ]
        },
        {
            category: "Extras", item: [
                { itemName: "Ice", itemPrice: 0.5},
                { itemName: "Lemon", itemPrice: 0.3},
                { itemName: "Orange", itemPrice: 0.3},
                { itemName: "Mint", itemPrice: 0.4}
            ]
        }
    ];
}