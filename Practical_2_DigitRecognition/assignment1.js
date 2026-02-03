async function trainCNN() {
    const model = tf.sequential();
    // 1st Convolution Layer
    model.add(tf.layers.conv2d({
        inputShape: [28, 28, 1],
        kernelSize: 3,
        filters: 8,
        activation: 'relu'
    }));
    model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
    model.add(tf.layers.flatten()); // Flattening for the dense layer 
    model.add(tf.layers.dense({units: 10, activation: 'softmax'}));

    model.compile({
        optimizer: tf.train.adam(),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    console.log("Training CNN for 5 epochs...");
    // Note: In a real lab, you would load MNIST data here using a helper
    // For now, this confirms the architecture setup.
}
trainCNN();