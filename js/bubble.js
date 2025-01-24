let bubblesOnScreen = []


function spawnBubbleOnScreen() {
    const template = document.querySelector(".bubble");

    const bubble = template.cloneNode(true);

    bubble.style.display = "block";
    bubble.draggable = false;

    bubble.style.width = Math.random() * 10 + 80 + "px";
    bubble.style.left = Math.random() * 50 + 125 + "px";
    bubble.style.top = Math.random() * 100 + 300 + "px";

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
        let LR = parseInt(bub.style.left);
        let offset = Math.random() * 1 - 0.1;
        LR += offset;
        depth--;
        bub.style.top = depth +"px";
        bub.style.left = LR + "px";
        return true;
    })
}
