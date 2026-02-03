async function runAssignment1() {
    console.log("--- Assignment 1: CNN Training ---");
    const model = tf.sequential();
    
    // Convolutional Layer (CO2 - Analyze spatial features)
    model.add(tf.layers.conv2d({
        inputShape: [28, 28, 1],
        kernelSize: 3,
        filters: 8,
        activation: 'relu'
    }));
    model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
    model.add(tf.layers.flatten()); // Flattening 2D to 1D [cite: 36, 153]
    model.add(tf.layers.dense({units: 10, activation: 'softmax'}));

    model.compile({optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy']});
    
    console.log("CNN Model Defined. Reporting accuracy after 5 epochs...");
    // model.fit() would go here with MNIST data
}
runAssignment1();