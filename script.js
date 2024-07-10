var config = {
    apiKey: 'AIzaSyDcsGDmnt6BHFcvMrR5I5-Pk8yW_xjrr2g', // Can be exposed restrictions added// 
    authDomain: 'sketchtogether-cc4bb.firebaseapp.com',  
    databaseURL: 'https://console.firebase.google.com/u/0/project/sketchtogether-cc4bb/database/sketchtogether-cc4bb-default-rtdb/data/~2F', //database is read and write to make drawing possible
    storageBucket: 'sketchtogether-cc4bb.appspot.com'
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