for (let i = 0; i < 2; i++) {
    stockValue1 = simulateStockPrice(stockValue1, stockVolatility1, stockDrift1);
    addPriceToStack(stockValue1);
    drawChart();
}

// fielen dank chatGPT 
function formatNumber(number) {
    if (number >= 1e6) {
        return number.toExponential(2);
    } else if (number >= 1e3) {
        return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
    } else {
        return number.toFixed(2);
    }
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


    document.getElementById("moneyText").innerHTML = "Shop | &#x20BF;" + formatNumber(bubbleCurrency);
    requestAnimationFrame(loop);;

}

loop();

let taxTime = 20;
let timeLeft = taxTime; 
let lastUpdate = 0; 
let beep = document.getElementById("beepAudio");
beep.volume = 0.2;

const taxCounter = document.getElementById("taxCounter");
taxCounter.textContent = "Rate: " + taxRate * 100 + "% | Next tax: " + timeLeft +"s";
function updateTimer(timestamp) {
    if (!lastUpdate) {
        lastUpdate = timestamp;
    }
    
    const deltaTime = timestamp - lastUpdate; 

    if (timeLeft < 10) {
        taxCounter.style.background = "red";
    }
    else {
        taxCounter.style.background = "#00ff00";
    }
    
    if (deltaTime >= 1000) {
        if (timeLeft > 0) {
            timeLeft--;
            taxCounter.textContent = "Rate: " + taxRate * 100 + "% | Next tax: " + timeLeft + "s";
        }
        if (timeLeft < 10) {
            beep.play();
        }
        lastUpdate = timestamp; 
    }

    if (timeLeft <= 0) {
        timeLeft = taxTime;
        bubbleCurrency -= bubbleCurrency * taxRate;
        setTimeout(() => {
            requestAnimationFrame(updateTimer);
        }, 1000);
    }
    else {
        requestAnimationFrame(updateTimer);
    }
}

requestAnimationFrame(updateTimer);
