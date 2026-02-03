async function testLearningRate(rate) {
    const xs = tf.tensor2d([0, 1, 2, 3], [4, 1]);
    const ys = tf.tensor2d([-1, 1, 3, 5], [4, 1]);

    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    
    // Using the specified learning rate
    const optimizer = tf.train.sgd(rate);
    model.compile({loss: 'meanSquaredError', optimizer: optimizer});

    const history = await model.fit(xs, ys, {epochs: 50, verbose: 0});
    console.log(`Final Loss with Learning Rate ${rate}:`, history.history.loss[49]);
}

console.log("Comparing Learning Rates...");
testLearningRate(0.01); // Standard
testLearningRate(0.1);  // Fast
testLearningRate(0.001); // Slow