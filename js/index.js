
const RESOLUTION_SCALE = 1 / 8 

const canvas = document.getElementById("SCREEN")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth 
canvas.height = window.innerHeight 



function generateNoise() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const red = Math.random() * 255;
        const green = Math.random() * 255;
        const blue = Math.random() * 255;

        pixels[i] = red;     
        pixels[i + 1] = green; 
        pixels[i + 2] = blue;
        pixels[i + 3] = 255;  
    }

    ctx.putImageData(imageData, 0, 0);
}

function loop() {
    
    generateNoise()

    requestAnimationFrame(loop)
}

loop()
