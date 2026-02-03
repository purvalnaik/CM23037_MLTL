console.log("--- Lab Assignment 1: Tensor Creation ---");
const scalar = tf.scalar(10); // 0D tensor [cite: 28]
const vector = tf.tensor1d([1, 2, 3, 4]); // 1D tensor [cite: 30]
const matrix = tf.tensor2d([[1, 2], [3, 4]]); // 2D tensor [cite: 31]

scalar.print();
vector.print();
matrix.print();