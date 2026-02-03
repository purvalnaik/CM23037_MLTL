const images = ['dog.jpg', 'cat.jpg', 'car.jpg', 'bird.jpg', 'coffee.jpg'];

async function testMultiple() {
    const model = await mobilenet.load();
    for (let imageName of images) {
        const imgElement = new Image();
        imgElement.src = `images/${imageName}`;
        await imgElement.decode(); // Wait for image to load
        
        const predictions = await model.classify(imgElement);
        console.log(`Results for ${imageName}:`, predictions[0].className);
    }
}
testMultiple();