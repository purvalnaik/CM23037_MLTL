console.log("--- Lab Assignment 2: Element-wise Operations ---");
const vectorA = tf.tensor1d([2, 4, 6]);
const vectorB = tf.tensor1d([1, 3, 5]);

const addition = tf.add(vectorA, vectorB); // Element-wise addition [cite: 105]
const multiplication = tf.mul(vectorA, vectorB); // Element-wise multiplication [cite: 109]

console.log("Addition Result:");
addition.print();
console.log("Multiplication Result:");
multiplication.print();