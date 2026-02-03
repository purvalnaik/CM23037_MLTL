async function runLinearRegression() {
    // 1. Create Synthetic Data (x: 0, 1, 2, 3; y: -1, 1, 3, 5)
    const xs = tf.tensor2d([0, 1, 2, 3], [4, 1]);
    const ys = tf.tensor2d([-1, 1, 3, 5], [4, 1]);

    // 2. Define the Model
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    // 3. Train
    console.log("Training...");
    await model.fit(xs, ys, {epochs: 100});
    console.log("Done!");

    // 4. Predict for plotting
    const preds = model.predict(xs).dataSync();
    const actuals = ys.dataSync();

    console.log("Actual vs Predicted:", actuals, preds);
}
runLinearRegression();