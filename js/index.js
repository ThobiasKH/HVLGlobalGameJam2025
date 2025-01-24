function loop() {
    
    updateBubbles(); 

    requestAnimationFrame(loop);;
}

loop();
