function predictDigit() {
    const canvas = document.getElementById('canvas');
    // Pre-processing: Resize to 28x28
    const tensor = tf.browser.fromPixels(canvas)
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(2)
        .expandDims(0)
        .toFloat();
    
    // model.predict(tensor).print();
    console.log("Classifying drawing...");
}