// ... keep the loadModel and file reader logic from before ...

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