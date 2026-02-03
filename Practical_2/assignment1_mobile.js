async function classify() {
    const img = document.getElementById('img');
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerText = 'Loading MobileNet...';
    const model = await mobilenet.load();
    
    resultsDiv.innerText = 'Classifying...';
    const predictions = await model.classify(img); // returns top predictions

    console.log('Top Predictions:', predictions);
    resultsDiv.innerHTML = '<h3>Top-3 Predictions:</h3>';
    predictions.slice(0, 3).forEach(p => {
        resultsDiv.innerHTML += `<p>${p.className}: ${(p.probability * 100).toFixed(2)}%</p>`;
    });
}
classify();