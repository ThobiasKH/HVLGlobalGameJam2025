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

    buy(useMoney = true) {
        if (bubbleCurrency < this.price && useMoney == true) return;
        if (useMoney) { 
            bubbleCurrency -= this.price;
            moneyAudio.play();
        }
        this.func();
        this.visibleInShop = this.remainVisibleAfterPurchase;
        this.numBought++;
        this.price *= this.priceMultiplier;
        removeShop();
        setupShop();
    }
}

// JS just wasn't unpredictable enough smh
// let test = new ShopItem("Peter", 100, function() {console.log("wtf")})
// Please don't judge me
let shopItems = [
    new ShopItem("Small Child", 5, 
        function() {
        setInterval(() => {
            addBubble(1, Math.random() <= 1 / this.numBought);
        }, 1000);
    }, 
    "Hire a small child to blow bubbles for you, their under-developed lungs produce 1 bubble per second so assemble a small army of children to drive up profits! Keep an eye on the cost, keeping child labour under wraps gets expensive!",
    true, 
    1.1),

    new ShopItem("Sugary Sweets", 5000, function() {
        shopItems[0].func = function() {
            setInterval(() => {
                addBubble(1, Math.random() <= 1 / this.numBought);
            }, 500)
        }    
    },
    "Buy your hard workers some performance-enhancing sweets to make them work twice as fast!"
    ),

    // Dear lord
    new ShopItem("Economic Boom!", 1000, function() {
        numFramesSinceLastStockUpdate = 0; 
        numFramesPerStockUpdate = 10;
        maxStockStackSize = 300;
        shopItems.push(
            new ShopItem("Economic Mega Boom!", 5000, function() {
                numFramesSinceLastStockUpdate = 0;
                numFramesPerStockUpdate = 5;
                maxStockStackSize = 600;
                shopItems.push(
                    new ShopItem("Economic Mega Ultra Super Surge!", 15000, function() {
                        numFramesSinceLastStockUpdate = 0;
                        numFramesPerStockUpdate = 1;
                        maxStockStackSize = 1000;
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

    new ShopItem("Level 1 Tax Evasion", 500, function() {
        taxTime = 40;
        taxRate = 0.6;
        timeLeft = taxTime;
        lastUpdate = 0;
        shopItems.push(
            new ShopItem("Level 2 Tax Evasion", 5000, function() {
                taxTime = 60;
                taxRate = 0.5;
                timeLeft = taxTime;
                lastUpdate = 0;
                shopItems.push(
                    new ShopItem("Level 3 Tax Evasion", 12500, function() {
                        taxTime = 120;
                        taxRate = 0.3;
                        timeLeft = taxTime;
                        lastUpdate = 0;
                    },
                    "Bribe, I mean donate, to politicians in high places to make the tax policy more easy on you! Tax rate reduces to 30% with tax season being every 2 minutes!"
                    ) 
                )
            }, "Get yourself a trusted friend from Swizerland and have them set up a bank account to store your assets! Tax rate reduces to 50% with tax season being every 60s!")
        )
    },
    "Start a company in Ireland and make yourself the only employee! Tax rate reduces to 60% with tax season being every 40s!"
    ),

    new ShopItem("Insider Trading", 2500, function() {
        stockVolatility1 /= 1.25;
        stockDrift1 *= 2;
    }, 
    "Gain insight into the stock market to increase profits! The market will tend upwards more!",
    true,
    2
    )

]

let shopIsVisible = false;

function setupShop() {
    const shop = document.getElementById("shop");
    shop.style.display = "flex";
    const shopSign = document.createElement("button");
    shopSign.innerHTML = "SHOP";
    shopSign.classList.add("shopItem");
    shopSign.classList.add("shopSign");
    shop.appendChild(shopSign);
    for (let i = 0; i < shopItems.length; i++) {
        const item = shopItems[i]; 
        if (item.visibleInShop == false) continue;
        const domElement = document.createElement("button");
        domElement.onclick = () => item.buy();

        domElement.classList.add("shopItem");
        domElement.classList.add("clickableOutline");
        domElement.innerHTML = item.name + (item.remainVisibleAfterPurchase ? " x" + item.numBought : "") + "<br>";

       

        domElement.addEventListener("mouseover", () => {
            domElement.innerHTML += "Price: &#x20BF;" + formatNumber(item.price) + "<br>";
            if (item.remainVisibleAfterPurchase) domElement.innerHTML += "Owned: " + item.numBought + "<br>";
            domElement.innerHTML += item.desc;

        })
        domElement.addEventListener("mouseleave", () => {
            domElement.innerHTML = item.name + (item.remainVisibleAfterPurchase ? " x" + item.numBought : "") + "<br>";
        })

        shop.appendChild(domElement);
    }
}

function removeShop() {
    const shop = document.getElementById("shop");
    while (shop.firstChild) {
        shop.removeChild(shop.firstChild);
    }
}


// fielen dank chatGPT 
function formatNumber(number, decimals = 2) {
    if (number >= 1e6) {
        return number.toExponential(2);
    } else if (number >= 1e3) {
        return number.toLocaleString(undefined, { maximumFractionDigits:decimals});
    } else {
        return number.toFixed(0);
    }
}

setupShop();
