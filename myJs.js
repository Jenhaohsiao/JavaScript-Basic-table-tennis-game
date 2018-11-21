var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }

}

window.onload = function() {
    console.log("Hello, Page loaded");

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function callboth() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
        })

}

function moveEverything() {

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    console.clear();
    console.log("X:", ballX, "Y:", ballY);


    if (ballX > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX < 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {
    // next line blanks out eh screen with black
    colorRect(0, 0, canvas.clientWidth, canvas.height, 'black');

    // left player paddle
    colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, 'blue');

    // next line draws the ball
    colorCircle(ballX, ballY, 10, 'red');


}

function colorCircle(enterX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(enterX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();

}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}