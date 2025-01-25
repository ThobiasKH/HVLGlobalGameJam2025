class ShopItem {
    name;
    price;
    func;
    visibleInShop = true;
    numBought = 0;
    remainVisibleAfterPurchase;
    priceMultiplier;
    domElement;
    desc;

    // Writing this at 22:45, blame the sleep deprivation
    // I am certainly going to hell for ts
    constructor(name, price, func, desc = "", remainVisibleAfterPurchase = false, priceMultiplier = 1) {
        this.name = name;
        this.price = price;
        this.func = func;
        this.remainVisibleAfterPurchase = remainVisibleAfterPurchase;
        this.priceMultiplier = priceMultiplier
        this.desc = desc;
    }

    buy() {
        moneyAudio.play();
        if (bubbleCurrency < this.price) return;
        bubbleCurrency -= this.price;
        this.func();
        this.visibleInShop = this.remainVisibleAfterPurchase;
        this.numBought++;
        this.price *= this.priceMultiplier;
        removeShop();
        displayShop();
    }
}

// JS just wasn't unpredictable enough smh
// let test = new ShopItem("Peter", 100, function() {console.log("wtf")})
// Please don't judge me
const shopItems = [
    new ShopItem("Small Child", 1, 
        function() {
        setInterval(() => {
            addBubble(1, Math.random() <= 1 / this.numBought);
        }, 1000);
    }, 
    "Hire a small child to blow bubbles for you, their under-developed lungs produce 1 bubble per second so assemble a small army of children to drive up profits! Keep an eye on the cost, keeping child labour under wraps gets expensive! Beware!",
    true, 
    1.5),

    // Dear lord
    new ShopItem("Economic Boom!", 1000, function() {
        numFramesSinceLastStockUpdate = 0; 
        numFramesPerStockUpdate = 10;
        shopItems.push(
            new ShopItem("Economic Mega Boom!", 10000, function() {
                numFramesSinceLastStockUpdate = 0;
                numFramesPerStockUpdate = 5;
                shopItems.push(
                    new ShopItem("Economic Mega Ultra Super Surge!", 100000, function() {
                        numFramesSinceLastStockUpdate = 0;
                        numFramesPerStockUpdate = 1;
                    },
                    "Establish a personal relationship with the head of state to set fire to the stock market! Watch as the stock market's speed surges to new heights!"
                    )
                )
            },
            "Become best buddies with government officials to give the stock market an even greater speed boost!"
            )
        );
    }, 
    "Lobby the government to give the stock market a speed boost!"        
    ),
]

let shopIsVisible = false;

function displayShop() {
    const shop = document.getElementById("shop");
    shop.style.display = "grid";
    for (let i = 0; i < shopItems.length; i++) {
        const item = shopItems[i]; 
        if (item.visibleInShop == false) continue;
        const domElement = document.createElement("button");
        domElement.onclick = () => item.buy();

        domElement.classList.add("shopItem");
        domElement.innerText = item.name;

        const description = document.createElement("div");
        description.classList.add("shopItemDescription");
        description.innerHTML = "Price: &#x20BF;" + item.price + "<br>";
        if (item.remainVisibleAfterPurchase) description.innerHTML += "Num owned: " + item.numBought + "<br>";
        description.innerHTML += item.desc;
        
        domElement.appendChild(description);

        domElement.addEventListener("mouseover", () => {
            description.style.display = "block";
        })
        domElement.addEventListener("mouseleave", () => {
            description.style.display = "none";
        })

        shop.appendChild(domElement);
    }
}

function removeShop() {
    const shop = document.getElementById("shop");
    while (shop.firstChild) {
        let elem = shop.firstChild;
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
        shop.removeChild(elem);
    }
    shop.style.display = "none";

}

function toggleShop() {
    const shop = document.getElementById("shop");
    if (!shopIsVisible) {
        displayShop();
    }
    else {
        removeShop();
    }
    shopIsVisible = !shopIsVisible;
}

let mousePos = {x: 0, y: 0};
document.addEventListener("mousemove", (e) => {
    let descriptors = document.querySelectorAll(".shopItemDescription");
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    descriptors.forEach(desc => {
        desc.style.top = mousePos.y + 20 + "px"; 
        desc.style.left = mousePos.x + 10 + "px";
    });
});
