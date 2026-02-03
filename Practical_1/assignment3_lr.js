async function predictUnseen() {
    const xs = tf.tensor2d([0, 1, 2, 3], [4, 1]);
    const ys = tf.tensor2d([-1, 1, 3, 5], [4, 1]);

    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    await model.fit(xs, ys, {epochs: 250, verbose: 0});

    // Predict for an unseen value (e.g., 10)
    // Expected result: 2(10) - 1 = 19
    const input = tf.tensor2d([10], [1, 1]);
    const prediction = model.predict(input);
    
    console.log("Prediction for input 10:");
    prediction.print();
}
predictUnseen();