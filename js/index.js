for (let i = 0; i < 2; i++) {
    stockValue1 = simulateStockPrice(stockValue1, stockVolatility1, stockDrift1);
    addPriceToStack(stockValue1);
    drawChart();
}
document.getElementById("moneyText").innerHTML = "Bubble Bucks: <br>&#x20BF;" + formatNumber(bubbleCurrency);
document.getElementById("holdings").innerHTML = "Stocks: " + stockHoldings + "<br>" +"Value: <br> &#x20BF;" + formatNumber(stockHoldings * stockValue1, 0);

function loop() {
    numFramesSinceLastStockUpdate++;
    if (numFramesSinceLastStockUpdate >= numFramesPerStockUpdate) {
        stockValue1 = simulateStockPrice(stockValue1, stockVolatility1, stockDrift1);
        addPriceToStack(stockValue1); 
        drawChart();

        numFramesSinceLastStockUpdate = 0;
    }

    document.getElementById("moneyText").innerHTML = "&#x20BF;" + bubbleCurrency;

    document.getElementById("holdings").innerHTML = "Stocks: " + stockHoldings + "<br>" +"Value: <br> &#x20BF;" + formatNumber(stockHoldings * stockValue1, 0);


    updateBubbles(); 

    if (bubbleCurrency >= 1000000) countingGameTime = false;

    document.getElementById("moneyText").innerHTML = "Bubble Bucks: <br>&#x20BF;" + formatNumber(bubbleCurrency);
    requestAnimationFrame(loop);;

}

// Thanks chatGPT
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600); // Get total hours
    const minutes = Math.floor((seconds % 3600) / 60); // Get remaining minutes
    const remainingSeconds = seconds % 60; // Get remaining seconds

    // Return formatted time
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

let taxTime = 20;
let timeLeft = taxTime; 
let lastUpdate = 0; 
let beep = document.getElementById("beepAudio");
beep.volume = 0.1;

let timeSinceStart = 0;
let countingGameTime = true;

const taxCounter = document.getElementById("taxCounter");
taxCounter.innerHTML = "Tax rate: " + taxRate * 100 + "% <br> Next tax: " + timeLeft +"s";
taxCounter.style.background = "#00ff00";
document.getElementById("gameTimer").innerHTML = "Time played: <br>" + formatTime(timeSinceStart);
function updateTimer(timestamp) {
    if (!lastUpdate) {
        lastUpdate = timestamp;
    }
    
    const deltaTime = timestamp - lastUpdate; 
    if (countingGameTime) {
        document.getElementById("gameTimer").innerHTML = "Time played: <br>" + formatTime(timeSinceStart);
    }
    else {
        document.getElementById("gameTimer").innerHTML = "1 Million achieved in: <br>" + formatTime(timeSinceStart) +"!";
    }

    if (deltaTime >= 1000) {
        taxCounter.style.background = "#00ff00";
        if (timeLeft > 0) {
            timeLeft--;
            if (countingGameTime) timeSinceStart++;

            taxCounter.innerHTML = "Tax rate: " + taxRate * 100 + "% <br> Next tax: " + timeLeft +"s";
        }
        if (timeLeft < 5) {
            beep.play();
            taxCounter.style.background = "red";
        }
        lastUpdate = timestamp; 
    }

    if (timeLeft <= 0) {
        timeLeft = taxTime;
        bubbleCurrency -= bubbleCurrency * taxRate;
        requestAnimationFrame(updateTimer);
    }
    else {
        requestAnimationFrame(updateTimer);
    }
}

function startGame(doLoadGameState = true) {
    document.getElementById("tutorial").remove();
    if (doLoadGameState) loadGameState();

    loop();
    requestAnimationFrame(updateTimer);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action (e.g., form submission)
    }
});

