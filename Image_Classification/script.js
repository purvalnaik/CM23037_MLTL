let model;
const status = document.getElementById("status");
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");

async function loadModel() {
    status.innerText = "Loading MobileNet model...";
    model = await mobilenet.load();
    status.innerText = "Model ready. Upload an image.";
}

loadModel();

imageUpload.addEventListener("change", async function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";

        imagePreview.onload = async () => {
            status.innerText = "Analyzing image...";
            const predictions = await model.classify(imagePreview);
            displayPredictions(predictions);
        };
    };

    reader.readAsDataURL(file);
});

function displayPredictions(predictions) {
    const predictionsDiv = document.getElementById('predictions');
    predictionsDiv.style.display = 'block';
    status.innerText = "Classification Results:";

    predictionsDiv.innerHTML = predictions.map(p => `
        <div class="prediction-item">
            <span>${p.className.split(',')[0]}</span>
            <span class="prob-badge">${(p.probability * 100).toFixed(1)}%</span>
        </div>
    `).join('');
}