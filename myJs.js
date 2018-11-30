var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;

var paddle1Y = 250;
var paddle2Y = 250;

const PADDLE_THICKNESS = 10;
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

function computerMovement() {

    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);

    if (paddle2Y < ballY - 35) {
        // paddle2Y = paddle2Y + 6;
        paddle2Y += 6;

    } else if (paddle2Y > ballY + 35) {
        // paddle2Y = paddle2Y - 6;
        paddle2Y -= 6;


    }
}

function moveEverything() {

    computerMovement();

    // ballX = ballX + ballSpeedX;
    // ballY = ballY + ballSpeedY;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    console.clear();
    console.log("X:", ballX, "Y:", ballY);

    if (ballX < 0) {
        if (ballY > paddle1Y &&
            ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballRest();
            player2Score++;
        }
    }


    if (ballX > canvas.width) {
        if (ballY > paddle2Y &&
            ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballRest();
            player1Score++;

        }
    }

    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function ballRest() {

    ballSpeedX = -ballSpeedX;

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

}


function drawEverything() {
    // next line blanks out eh screen with black
    colorRect(0, 0, canvas.clientWidth, canvas.height, '#555555');

    // left player paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'blue');


    // left computer paddle
    colorRect(canvas.clientWidth - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'green');

    // next line draws the ball
    colorCircle(ballX, ballY, 10, 'red');

    canvasContext.font = "20px Verdana,  sans-serif ";
    canvasContext.fillStyle = 'blue';
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);


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