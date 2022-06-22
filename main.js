Webcam.set({width: 350, height: 300, image_format: 'png', png_quality: 90});
camera = document.getElementById("camera");
Webcam.attach(camera);
function captureImage(){
    document.getElementById("identify-button").outerHTML = '<button id="identify-button" class="btn btn-outline-secondary" onclick="identifyObject()">Identify Family Member</button>'
    console.log("Capturing Image...");
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="The_image_Taken" style="width: 350px; height: 275px;" src="'+data_uri+'">'});
    console.log("Captured Image Successfully.");
}
console.log("ml5 version:", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Lqtw2pggM/model.json", modelLoaded);
function modelLoaded(){
    console.log("Model imported successfully");
}
function identifyObject(){
    img = document.getElementById("The_image_Taken");
    classifier.classify(img, gotResult)
}
function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("member").innerHTML = results[0].label;
        percentofaccuracy = results[0].confidence * 100;
        document.getElementById("accuracy").innerHTML = percentofaccuracy.toFixed(1) + "%";
    }
}