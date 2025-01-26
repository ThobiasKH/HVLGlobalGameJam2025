let bubblesOnScreen = [];
let bubbleCurrency = 999999;
const popAudio = document.getElementById("popAudio");

function addBubble(numBubbles, draw) {
    bubbleCurrency += numBubbles;
    if (!draw) return;
    const clone = popAudio.cloneNode(true);
    document.body.appendChild(clone);
    clone.volume = 0.1;
    clone.play();
    clone.addEventListener("ended", () => {
        clone.remove();
    });
    spawnBubbleOnScreen();
}

function spawnBubbleOnScreen() {
    const template = document.querySelector(".bubble");

    const bubble = template.cloneNode(true);

    bubble.style.display = "block";
    bubble.draggable = false;

    bubble.style.width = Math.random() * 5 + 2 + "%";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.top = Math.random() * 5 + 90 + "%";

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

        depth -= 0.0001;
        bub.style.top = depth +"%";
        return true;
    })
}

let taxRate = 0.70;

