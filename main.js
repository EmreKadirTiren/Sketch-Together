// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDcsGDmnt6BHFcvMrR5I5-Pk8yW_xjrr2g',
  authDomain: 'sketchtogether-cc4bb.firebaseapp.com',
  databaseURL: 'https://sketchtogether-cc4bb-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'sketchtogether-cc4bb.appspot.com'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var pointsData = firebase.database().ref();
var points = [];

function setup() {
  var canvas = createCanvas(400, 400);
  background(255);
  fill(0);

  // Listen for new points added to the database
  pointsData.on("child_added", function(snapshot) {
    points.push(snapshot.val());
  });

  // Listen for points removed from the database
  pointsData.on("child_removed", function() {
    points = [];
  });

  canvas.mousePressed(drawPoint);

  canvas.mouseMoved(function() {
    if (mouseIsPressed) {
      drawPoint();
    }
  });
}

function draw() {
  background(255);
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    ellipse(point.x, point.y, 5, 5);
  }
}

function drawPoint() {
  pointsData.push({ x: mouseX, y: mouseY });
}

$("#saveDrawing").on("click", saveDrawing);

function saveDrawing() {
  saveCanvas("Painter Orpheus");
}

$("#clearDrawing").on("click", clearDrawing);

function clearDrawing() {
  pointsData.remove();
  points = [];
}
