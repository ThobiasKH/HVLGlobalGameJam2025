let bubblesOnScreen = []
let bubbleCurrency = 0

function addBubble(numBubbles, draw) {
    bubbleCurrency += numBubbles;
    if (!draw) return;
    spawnBubbleOnScreen();
}

function spawnBubbleOnScreen() {
    const template = document.querySelector(".bubble");

    const bubble = template.cloneNode(true);

    bubble.style.display = "block";
    bubble.draggable = false;

    bubble.style.width = Math.random() * 10 + 80 + "px";
    bubble.style.left = Math.random() * 120 + 100 + "px";
    bubble.style.top = Math.random() * 30 + 340 + "px";

    document.querySelector(".container").appendChild(bubble);

    bubblesOnScreen.push(bubble);
}


function updateBubbles() {
    bubblesOnScreen = bubblesOnScreen.filter((bub) => {
        let depth = parseInt(bub.style.top);
        
        if (depth <= 0) {
            bub.remove();
            return false;
        }

        depth--;
        bub.style.top = depth +"px";
        return true;
    })
}
