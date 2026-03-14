document.addEventListener("DOMContentLoaded", () => {

let model;

const status = document.getElementById("status");
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");
const predictionsDiv = document.getElementById("predictions");

async function loadModel() {

try{

status.innerText = "Loading MobileNet model...";

model = await mobilenet.load();

status.innerText = "Model ready. Upload an image.";

}
catch(error){

console.error(error);
status.innerText = "Error loading AI model.";

}

}

loadModel();


imageUpload.addEventListener("change", function(event){

const file = event.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

imagePreview.src = e.target.result;
imagePreview.style.display = "block";

imagePreview.onload = async () => {

if(!model){

status.innerText = "Model not ready yet.";
return;

}

status.innerText = "Analyzing image...";

try{

const predictions = await model.classify(imagePreview);

displayPredictions(predictions);

}
catch(err){

console.error(err);
status.innerText = "Error analyzing image.";

}

};

};

reader.readAsDataURL(file);

});


function displayPredictions(predictions){

predictionsDiv.style.display = "block";

status.innerText = "Classification Results";

predictionsDiv.innerHTML = predictions.map(p => `

<div class="prediction-item">

<span>${p.className.split(',')[0]}</span>

<span class="prob">${(p.probability*100).toFixed(1)}%</span>

</div>

`).join("");

}

});