// initialized variables
console.log('ml5 version:', ml5.version);

let faceapi;
let facemesh;
let video;
let canvas;
let detections = [];

const HEIGHT = 480;
const WIDTH = 640;

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT); // canvas window
  canvas.id("canvas");

  // getting video of user
  video = createCapture(VIDEO);
  video.id("video");
  video.size(width, height);

  // making face details
  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.5,
  };

  //Initialize the model:
  faceapi = ml5.faceApi(video, faceOptions, faceReady);

  // Hide the video element, and just show the canvas
  // video.hide();
}

// chaeck model ready
function modelReady() {
  console.log("Model ready!");
}

// on face detection
function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces:
function gotFaces(error, result) {
  if (error) {
    // console.log("got faces error", error);
    return;
  }

  detections = result; //Now all the data in this detections:

  clear(); //Draw transparent background;:
  drawBoxs(detections); //Draw detection box:
  drawLandmarks(detections); //// Draw all the face points:

  faceapi.detect(gotFaces); // Call the function again at here:
}

// draw boxs
function drawBoxs(detections) {
  if (detections.length > 0) {
    //If at least 1 face is detected:
    for (f = 0; f < detections.length; f++) {
      let { _x, _y, _width, _height } = detections[f].alignedRect._box;
      stroke(44, 169, 225);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

// A function to draw landmarks over the detected keypoints
function drawLandmarks(detections) {
  if (detections.length > 0) {
    //If at least 1 face is detected:
    for (f = 0; f < detections.length; f++) {
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        stroke(47, 255, 0); // points color
        strokeWeight(5); // points weight
        point(points[i]._x, points[i]._y);
      }
    }
  }
}
