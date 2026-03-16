let model;
const video = document.getElementById('webcam');
const labelDisplay = document.getElementById('obj-name');
const confDisplay = document.getElementById('conf');
const latencyDisplay = document.getElementById('latency');
const fpsDisplay = document.getElementById('fps');

let lastTime = performance.now();

async function startSystem() {
    // 1. Load Model (Using CDN for GitHub Pages stability)
    labelDisplay.innerText = "LOADING MODEL...";
    model = await mobilenet.load();
    
    // 2. Setup Webcam
    const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" }, 
        audio: false 
    });
    video.srcObject = stream;

    labelDisplay.innerText = "READY_TO_SCAN";
    detect();
}

async function detect() {
    const startTime = performance.now();

    // 3. Real-time Inference
    const predictions = await model.classify(video);
    
    const endTime = performance.now();
    const inferenceTime = (endTime - startTime).toFixed(1);

    // 4. Update HUD
    if (predictions.length > 0) {
        const topResult = predictions[0];
        labelDisplay.innerText = topResult.className.split(',')[0].toUpperCase();
        confDisplay.innerText = `${(topResult.probability * 100).toFixed(1)}%`;
    }

    // 5. Performance Analysis (FPS)
    const now = performance.now();
    const fps = (1000 / (now - lastTime)).toFixed(1);
    lastTime = now;

    latencyDisplay.innerText = `${inferenceTime}ms`;
    fpsDisplay.innerText = fps;

    requestAnimationFrame(detect);
}

startSystem();