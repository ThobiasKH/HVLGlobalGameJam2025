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
        }
        if (shopItems[i].name == "Sugary Sweets" && shopItems[i].visibleInShop) {
            sweetsVisible = true;
        }
        if (shopItems[i].name == "Economic Boom!" && shopItems[i].visibleInShop) {
            econboomLevel = 0;
        }
        if (shopItems[i].name == "Economic Mega Boom!" && shopItems[i].visibleInShop) {
            econboomLevel = 1;
        }
        if (shopItems[i].name == "Economic Mega Ultra Super Surge!" && shopItems[i].visibleInShop) {
            econboomLevel = 2;
        }
        if (shopItems[i].name == "Level 1 Tax Evasion" && shopItems[i].visibleInShop) {
            taxEvasionLevel = 0;
        }
        if (shopItems[i].name == "Level 2 Tax Evasion" && shopItems[i].visibleInShop) {
            taxEvasionLevel = 1;
        }
        if (shopItems[i].name == "Level 3 Tax Evasion" && shopItems[i].visibleInShop) {
            taxEvasionLevel = 2;
        }
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
        timeSinceStart,
        countingGameTime,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function findInShop(name) {
    for (let i = 0; i < shopItems.length; i++) {
        if (shopItems[i].name == name) return shopItems[i];
    }
    return null;
}

function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    const gameState = JSON.parse(savedState);
    if (gameState == null) return;
    for (let i = 0; i < gameState.numChildren; i++) {
        findInShop("Small Child").buy(false);
    } 
    for (let i = 0; i < gameState.numInsiders; i++) {
        findInShop("Insider Trading").buy(false);
    }

    if (!gameState.sweetsVisible) {
        findInShop("Sugary Sweets").buy(false);
    }

    if (gameState.econboomLevel > 0) {
        findInShop("Economic Boom!").buy(false);
    }
    if (gameState.econboomLevel > 1) {
        findInShop("Economic Mega Boom!").buy(false);
    }
    if (gameState.econboomLevel > 2) {
        findInShop("Economic Mega Ultra Super Surge!").buy(false);
    }

    if (gameState.taxEvasionLevel > 0) {
        findInShop("Level 1 Tax Evasion").buy(false);
    }
    if (gameState.taxEvasionLevel > 1) {
        findInShop("Level 2 Tax Evasion").buy(false);
    }
    if (gameState.taxEvasionLevel > 2) {
        findInShop("Level 3 Tax Evasion").buy(false);
    }
    bubbleCurrency = gameState.bubbleCurrency;
    stockValue1 = gameState.stockValue1;
    stockHoldings = gameState.stockHoldings;
    timeSinceStart = gameState.timeSinceStart;
    countingGameTime = gameState.countingGameTime;

    for (let i = 0; i < 2; i++) {
        stockValue1 = simulateStockPrice(stockValue1, stockVolatility1, stockDrift1);
        addPriceToStack(stockValue1);
        drawChart();
    }
    removeShop();
    setupShop();
} 


window.addEventListener('beforeunload', () => {if (gameRunning) saveGameState()});

for (let i = 0; i < 2; i++) {
    stockValue1 = simulateStockPrice(stockValue1, stockVolatility1, stockDrift1);
    addPriceToStack(stockValue1);
    drawChart();
}
document.getElementById("moneyText").innerHTML = "Bubble Bucks: <br>&#x20BF;" + formatNumber(bubbleCurrency);
document.getElementById("holdings").innerHTML = "Stocks: " + stockHoldings + "<br>" +"Value: <br> &#x20BF;" + formatNumber(stockHoldings * stockValue1, 0);


