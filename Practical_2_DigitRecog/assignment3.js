function runAssignment3() {
    console.log("--- Assignment 3: CNN vs Simple Dense ---");
    
    const denseModel = tf.sequential();
    denseModel.add(tf.layers.flatten({inputShape: [28, 28, 1]}));
    denseModel.add(tf.layers.dense({units: 128, activation: 'relu'}));
    denseModel.add(tf.layers.dense({units: 10, activation: 'softmax'}));
    
    console.log("Simple Dense Network created. Contrast this with the CNN's ability to recognize patterns.");
}
runAssignment3();