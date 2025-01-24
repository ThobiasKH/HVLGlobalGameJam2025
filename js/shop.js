class ShopItem {
    name;
    price;
    func;
    visibleInShop = true;
    numBought = 0;
    remainVisibleAfterPurchase;
    priceMultiplier;

    // Writing this at 22:45, blame the sleep deprivation
    // I am certainly going to hell for ts
    constructor(name, price, func, remainVisibleAfterPurchase = false, priceMultiplier = 1) {
        this.name = name;
        this.price = price;
        this.func = func;
        this.remainVisibleAfterPurchase = remainVisibleAfterPurchase;
        this.priceMultiplier = priceMultiplier
    }

    buy() {
        if (bubbleCurrency < this.price) return;
        bubbleCurrency -= this.price;
        this.func();
        this.visibleInShop = this.remainVisibleAfterPurchase;
        numBought++;
        this.price *= priceMultiplier;
    }
}

// JS just wasn't unpredictable enough smh
// let test = new ShopItem("Peter", 100, function() {console.log("wtf")})

// Please don't judge me
const shopItems = [
    new ShopItem("Blower", 10, true, 1.5)
]

function displayPurchasableItems() {
    const shop = document.getElementById("shop");
}
