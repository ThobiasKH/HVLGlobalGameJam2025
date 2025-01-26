// Kill me
function saveGameState() {
    let numChildren = shopItems[0].numBought;
    let numInsiders = 0;
    for (let i = 0; i < shopItems.length; i++) {
        if (shopItems[i].name == "Insider Trading") {
            numInsiders = shopItems[i].numBought; 
            break;
        }
    }
    const gameState = {
        numChildren,
        numInsiders,
        bubbleCurrency,
        stockValue1,
        stockVolatility1,
        stockDrift1,
        stockHoldings,
        maxStockStackSize,
        numFramesPerStockUpdate,
        taxRate,
        taxTime,
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
        shopItems[0].numBought = gameState.numChildren;
        for (let i = 0; i < gameState.numChildren; i++) {
            shopItems[0].func(); 
        }
        for (let i = 0; i < shopItems.length; i++) {
            if (shopItems[i].name == "Insider Trading") {
                shopItems[i].numBought = gameState.numInsiders;
                for (let i = 0; i < gameState.numInsiders; i++) {
                    shopItems[i].func();
                } 
                break;
            }
        }
        bubbleCurrency = gameState.bubbleCurrency;
        stockValue1 = gameState.stockValue1;
        stockDrift1 = gameState.stockDrift1;
        stockVolatility1 = gameState.stockVolatility1;
        stockHoldings = gameState.stockHoldings;
        maxStockStackSize = gameState.maxStockStackSize;
        numFramesPerStockUpdate = gameState.numFramesPerStockUpdate;
        taxRate = gameState.taxRate;
        taxTime = gameState.taxTime;
        timeSinceStart = gameState.timeSinceStart;
        countingGameTime = gameState.countingGameTime;

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


