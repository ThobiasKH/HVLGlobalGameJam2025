let stockValue1 = 100.69;
let stockHoldings = 0;
let stockVolatility1 = 0.02;
let stockDrift1 = 0.00001;

let numFramesPerStockUpdate = 15;
let numFramesSinceLastStockUpdate = 0;

let maxStockStackSize = 100;
let priceStack = [];

const stockCanvas = document.getElementById("graph");
const stockCTX = stockCanvas.getContext("2d");
stockCanvas.width = 1200;
stockCanvas.height = 600;

const moneyAudio = document.getElementById("moneyAudio");

function buyAll() {
    let numPossible = Math.floor(bubbleCurrency / stockValue1);
    if (numPossible > 0) moneyAudio.play();
    stockHoldings += numPossible;
    bubbleCurrency -= numPossible * stockValue1;
}

function sellAll() {
    if (stockHoldings > 0) moneyAudio.play();
    bubbleCurrency += stockHoldings * stockValue1;
    stockHoldings = 0;
}

function buyStock(soundeffect = false) {
    if (bubbleCurrency < stockValue1) return;
    if (soundeffect) moneyAudio.play();
    bubbleCurrency -= stockValue1;
    stockHoldings++;
}

function sellStock(soundeffect = false) {
    if (stockHoldings == 0) return;
    if (soundeffect) moneyAudio.play();
    bubbleCurrency += stockValue1;
    stockHoldings--;
}

function simulateStockPrice(currentPrice, volatility, drift) {
    const change = drift + (Math.random() * 2 - 1) * volatility;
    const newPrice = currentPrice * (1 + change);
    return newPrice;
}

function addPriceToStack(newPrice) {
    priceStack.push(newPrice);

    if (priceStack.length > maxStockStackSize) {
        priceStack.shift();
    }
}

function drawChart() {
    document.getElementById("valueDisplay").innerHTML = "Stock price: <br> &#x20BF;" + stockValue1.toFixed(2);
    stockCTX.clearRect(0, 0, stockCanvas.width, stockCanvas.height);

    if (priceStack.length <= 1) return; 
    const chartWidth = stockCanvas.width;
    const chartHeight = stockCanvas.height;
    const padding = 20; 
    const usableWidth = chartWidth - 2 * padding;
    const usableHeight = chartHeight - 2 * padding;

    const minPrice = Math.min(...priceStack) || 0;
    const maxPrice = Math.max(...priceStack) || 1;

    const scaleX = usableWidth / (priceStack.length - 1); 
    const scaleY = usableHeight / (maxPrice - minPrice);

    stockCTX.strokeStyle = "#cccccc";
    stockCTX.lineWidth = 4;
    stockCTX.beginPath();
    stockCTX.moveTo(padding, padding);
    stockCTX.lineTo(padding, chartHeight - padding); 
    stockCTX.lineTo(chartWidth - padding, chartHeight - padding); 
    stockCTX.stroke();

    for (let i = 1; i < priceStack.length; i++) {
        let increasing = priceStack[i] >= priceStack[i-1];
        stockCTX.strokeStyle = increasing ? "#00ff00" : "#ff0000";

        stockCTX.beginPath();
        stockCTX.moveTo(
            padding + (i - 1) * scaleX,
            chartHeight - padding - (priceStack[i - 1] - minPrice) * scaleY
        );
        stockCTX.lineTo(
            padding + (i) * scaleX,
            chartHeight - padding - (priceStack[i] - minPrice) * scaleY
        )

        stockCTX.stroke();
    }

}

