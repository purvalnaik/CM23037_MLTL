const video = document.getElementById('webcam');
const statusMsg = document.getElementById('system-status');
const objName = document.getElementById('obj-name');
const confDiv = document.getElementById('conf');
const latencyDiv = document.getElementById('latency');
const fpsDiv = document.getElementById('fps');

let model;
let lastTime = performance.now();

async function init() {
    try {
        statusMsg.innerText = "REQUESTING CAMERA...";
        
        // 1. Get Camera
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' }, 
            audio: false 
        });
        video.srcObject = stream;

        // 2. Wait for Video to actually start
        video.onloadeddata = async () => {
            statusMsg.innerText = "LOADING AI...";
            // Use the global 'mobilenet' object from the CDN script
            model = await mobilenet.load();
            statusMsg.innerText = "SYSTEM ACTIVE";
            detect();
        };

    } catch (err) {
        statusMsg.innerText = "ERROR: ACCESS DENIED";
        console.error("Camera Error:", err);
    }
}

async function detect() {
    // Record start time for latency
    const startTime = performance.now();

    // Run AI classification
    const predictions = await model.classify(video);

    const endTime = performance.now();
    const inferenceTime = (endTime - startTime).toFixed(1);

    // Update Dashboard
    if (predictions.length > 0) {
        objName.innerText = predictions[0].className.split(',')[0].toUpperCase();
        confDiv.innerText = (predictions[0].probability * 100).toFixed(1) + "%";
    }

    // FPS Logic
    const now = performance.now();
    const fps = (1000 / (now - lastTime)).toFixed(1);
    lastTime = now;

    latencyDiv.innerText = inferenceTime + "ms";
    fpsDiv.innerText = fps;

    requestAnimationFrame(detect);
}

// Kick off the system
init();