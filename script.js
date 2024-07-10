require('dotenv').config();

var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    storageBucket: process.env.storageBucket
}
firebase.initializeApp(config)

var pointsData = firebase.database().ref()

function setup() {
    var canvas = createCanvas(400, 400);
    background(255)
    fill(0)
    
    pointsData.on('child_added', function (point) {
        points.push(point.val())
    })
    pointsData.on('child_removed', function () {
    points = []
    })
    
    canvas.mousePressed(drawPoint)
    canvas.mouseMoved(drawPointIfMousePressed)
    
    
}

function draw() {
  for (var i = 0; i < points.length; i++) {
    var point = points[i]
    circle(point.x, point.y, 5)
  }
}

function drawPoint() {
    pointsData.push({ x: mouseX, y: mouseY })
}

function drawPointIfMousePressed() {
    if (mouseIsPressed) {
        drawPoint()
    }
}

$('#saveDrawing').on('click', saveDrawing)

function saveDrawing() {
    saveCanvas()
}

$('#clearDrawing').on('click', clearDrawing)

function clearDrawing() {
    pointsData.remove()
    points = []
}