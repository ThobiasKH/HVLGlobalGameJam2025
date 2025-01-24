for (let i = 0; i < 2; i++) {
    stockValue1 = simulateStockPrice(stockValue1, stockVolatility1, stockDrift1);
    addPriceToStack(stockValue1);
    drawChart();
}

function loop() {
    numFramesSinceLastStockUpdate++;
    if (numFramesSinceLastStockUpdate >= numFramesPerStockUpdate) {
        stockValue1 = simulateStockPrice(stockValue1, stockVolatility1, stockDrift1);
        addPriceToStack(stockValue1); 
        drawChart();

        numFramesSinceLastStockUpdate = 0;
    }

    updateBubbles(); 


    document.getElementById("moneyText").innerHTML = "&#x20BF;" + bubbleCurrency.toFixed(2);
    requestAnimationFrame(loop);;

}

loop();
