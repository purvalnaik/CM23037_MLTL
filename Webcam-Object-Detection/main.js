// 1. Link the HTML elements to our script
const video = document.getElementById('webcam');
const labelDisplay = document.getElementById('obj-name');
const confDisplay = document.getElementById('conf');
const latencyDisplay = document.getElementById('latency');
const fpsDisplay = document.getElementById('fps');

let model; // This will hold the AI "Brain"
let lastTime = performance.now(); // Used to calculate FPS

// 2. The Start Function: This runs as soon as the page loads
async function startSystem() {
    labelDisplay.innerText = "STARTING CAMERA...";
    
    try {
        // Request access to the webcam
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user" }, 
            audio: false 
        });
        
        // Put the camera feed into our <video> tag
        video.srcObject = stream;

        // When the camera is ready, load the AI model
        video.onloadeddata = async () => {
            labelDisplay.innerText = "LOADING AI MODEL...";
            
            // Load the MobileNet model from the internet
            model = await mobilenet.load();
            
            labelDisplay.innerText = "SYSTEM READY - SCANNING";
            
            // Start the detection loop
            detect();
        };

    } catch (err) {
        // If the user clicks "Block" or has no camera
        console.error(err);
        labelDisplay.innerText = "CAMERA ERROR";
    }
}

// 3. The Detection Loop: This runs 30+ times every second
async function detect() {
    const startTime = performance.now(); // Record start time for Latency

    // Tell the AI to look at the video and predict what it is
    const predictions = await model.classify(video);
    
    const endTime = performance.now(); // Record end time
    const inferenceTime = (endTime - startTime).toFixed(1);

    // Update the HUD with the results
    if (predictions.length > 0) {
        // Show the top result (e.g., "Cell Phone")
        labelDisplay.innerText = predictions[0].className.split(',')[0].toUpperCase();
        // Show confidence (e.g., "95%")
        confDisplay.innerText = (predictions[0].probability * 100).toFixed(1) + "%";
    }

    // Performance Calculations (FPS)
    const now = performance.now();
    const fps = (1000 / (now - lastTime)).toFixed(1);
    lastTime = now;

    // Update the Diagnostic Panel
    latencyDisplay.innerText = inferenceTime + "ms";
    fpsDisplay.innerText = fps;

    // Run this function again for the next frame
    requestAnimationFrame(detect);
}

// Start the whole process
startSystem();