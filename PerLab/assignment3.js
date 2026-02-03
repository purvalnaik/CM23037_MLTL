console.log("--- Lab Assignment 3: Reshape vs Flatten ---");
const tensor = tf.tensor2d([[1, 2, 3], [4, 5, 6]]); // Original 2x3 [cite: 142]

const reshaped = tensor.reshape([3, 2]); // Changes shape [cite: 35]
const flattened = tensor.flatten(); // Converts to 1D [cite: 36]

console.log("Reshaped (3x2):");
reshaped.print();
console.log("Flattened (1D):");
flattened.print();