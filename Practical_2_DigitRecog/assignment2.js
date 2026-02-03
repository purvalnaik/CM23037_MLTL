function predictDigit() {
    const canvas = document.getElementById('canvas');
    const tensor = tf.browser.fromPixels(canvas)
        .resizeNearestNeighbor([28, 28])
        .mean(2)        // Convert to grayscale
        .expandDims(2)  // Add channel dimension
        .expandDims(0)  // Add batch dimension
        .toFloat();
    
    console.log("--- Assignment 2: Predicting Canvas Input ---");
    tensor.print(); // Print the tensor to verify the 28x28 input [cite: 37, 173]
}