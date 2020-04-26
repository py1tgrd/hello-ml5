const image = document.getElementById('image'); // The image we want to classify
const result = document.getElementById('result'); // The result tag in the HTML
const probability = document.getElementById('probability'); // The probability tag in the HTML
const LoadModelButton = document.getElementById('LoadModel'); //Load model
const selectedmodel = document.getElementById('model'); //Model to load
const output_image = document.getElementById('output_image'); 
const IdentifyImageButton = document.getElementById('IdentifyImage'); 
const UpdateImageButton = document.getElementById('UpdateImage'); //Load model

const model_loading_status = document.getElementById('model_loading_status'); 


var c = ml5.imageClassifier('darknet', {version:'darknet-tiny', alpha:1.0, topk:3,}, (err, model) =>{
  model_loading_status.innerText="Loaded :-)";
  console.log("Model loaded");
}
);




LoadModelButton.addEventListener("click",loadModel);
UpdateImageButton.addEventListener("click",UpdateImage);
IdentifyImageButton.addEventListener("click",classifyImage);
selectedmodel.addEventListener("change",()=>{model_loading_status.innerText="Not yet loaded";})


function loadModel(){
    
  console.log(selectedmodel.value);
  c = ml5.imageClassifier(selectedmodel.value, (err, model) =>{
    model_loading_status.innerText="Loaded :-)";
    console.log("Model loaded");
  }
  );
}

function UpdateImage(){
  output_image.src="images/" + image.value;
  console.log(output_image.src);
}


function classifyImage(){

  // Initialize the Image Classifier method with MobileNet
  c.classify(output_image).then(results => {
      result.innerText = results[0].label;
      probability.innerText = results[0].confidence.toFixed(4);
    })
    .catch(error => console.log(error.message))
  ;

}
