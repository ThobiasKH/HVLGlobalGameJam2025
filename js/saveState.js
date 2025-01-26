// Kill me
function saveGameState() {
    let numChildren = shopItems[0].numBought;
    let numInsiders = 0;
    let sweetsVisible = false;
    let econboomLevel = 3;
    let taxEvasionLevel = 3;
    for (let i = 0; i < shopItems.length; i++) {
        if (shopItems[i].name == "Insider Trading") {
            numInsiders = shopItems[i].numBought; 
            break;
        }
        if (shopItems[i].name == "Sugary Sweets" && shopItems[i].visible) {
            sweetsVisible = true;
        }
        if (shopItems[i].name == "Economic Boom!"&& shopItems[i].visible) {
            console.log(true)
            econboomLevel = 0;
        }
        if (shopItems[i].name == "Economic Mega Boom!"&& shopItems[i].visible) {
            econboomLevel = 1;
        }
        if (shopItems[i].name == "Economic Mega Ultra Super Surge!"&& shopItems[i].visible) {
            econboomLevel = 2;
        }
        if (shopItems[i].name == "Level 1 Tax Evasion"&& shopItems[i].visible) taxEvasionLevel = 0;
        if (shopItems[i].name == "Level 2 Tax Evasion"&& shopItems[i].visible) taxEvasionLevel = 1;
        if (shopItems[i].name == "Level 3 Tax Evasion"&& shopItems[i].visible) taxEvasionLevel = 2;
    }
    const gameState = {
        numChildren,
        numInsiders,
        sweetsVisible,
        econboomLevel,
        taxEvasionLevel, 
        bubbleCurrency,
        stockValue1,
        stockHoldings,
        maxStockStackSize,
        timeSinceStart,
        countingGameTime,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
    console.log('Game state saved!');
}

function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        for (let i = 0; i < shopItems.length; i++) {
            if (shopItems[i].name == "Small Child") {
                for (let i = 0; i < gameState.numChildren; i++) {
                    shopItems[i].buy(false);
                }
            }
            if (shopItems[i].name == "Insider Trading") {
                for (let i = 0; i < gameState.numInsiders; i++) {
                    shopItems[i].buy(false);
                } 
            }
             if (!gameState.sweetsVisible && shopItems[i].name == "Sugary Sweets") {
                shopItems[i].buy(false);
            }
            // genuinely loosing my mind right here
             if (gameState.econboomLevel > 0 && shopItems[i].name == "Economic Boom!") {
                shopItems[i].buy(false);
                if (gameState.econboomLevel > 1) {
                    shopItems[shopItems.length - 1].buy(false);
                    if (gameState.econboomLevel > 2) {
                        shopItems[shopItems.length - 1].buy(false);
                    }
                }
            }
             if (gameState.taxEvasionLevel > 0 && shopItems[i].name == "Level 1 Tax Evasion") {
                shopItems[i].buy();
                if (gameState.taxEvasionLevel > 1) {
                    shopItems[shopItems.length - 1].buy();
                    if (gameState.taxEvasionLevel > 2) {
                        shopItems[shopItems.length - 1].buy();
                    }
                }
            } 
            
        }
        bubbleCurrency = gameState.bubbleCurrency;
        stockValue1 = gameState.stockValue1;
        stockHoldings = gameState.stockHoldings;
        maxStockStackSize = gameState.maxStockStackSize;
        timeSinceStart = gameState.timeSinceStart;
        countingGameTime = gameState.countingGameTime;

        for (let i = 0; i < 2; i++) {
            stockValue1 = simulateStockPrice(stockValue1, stockVolatility1, stockDrift1);
            addPriceToStack(stockValue1);
            drawChart();
        }
        removeShop();
        setupShop();
    } else {
        console.log('No saved game state found.');
    }
}

window.addEventListener('beforeunload', saveGameState);

for (let i = 0; i < 2; i++) {
    stockValue1 = simulateStockPrice(stockValue1, stockVolatility1, stockDrift1);
    addPriceToStack(stockValue1);
    drawChart();
}
document.getElementById("moneyText").innerHTML = "Bubble Bucks: <br>&#x20BF;" + formatNumber(bubbleCurrency);
document.getElementById("holdings").innerHTML = "Stocks: " + stockHoldings + "<br>" +"Value: <br> &#x20BF;" + formatNumber(stockHoldings * stockValue1, 0);


