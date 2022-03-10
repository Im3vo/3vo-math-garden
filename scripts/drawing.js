const BACKGROUND_COLOR = "#000000";
const LINE_COLOR = "#FFFFFF";
const LINE_WIDTH = 12;

var currentX = 0;
var currentY = 0;
var prevX = 0;
var prevY = 0;

var canvas;
var context;

var isPainting = false;

function prepareCanvas() {
    // console.log("Preparing Canvas");
    canvas = document.getElementById("my-canvas");
    context = canvas.getContext("2d");

    context.strokeStyle = LINE_COLOR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = "round";

    context.fillStyle = BACKGROUND_COLOR
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    canvas.addEventListener("mousedown", function (event) {
        isPainting = true;
        // console.log("Mouse pressed");
        currentX = event.clientX - canvas.offsetLeft;
        currentY = event.clientY - canvas.offsetTop;
    });

    canvas.addEventListener("mouseup", function (event) {
        isPainting = false;
        // console.log("Mouse released");
    });

    canvas.addEventListener("mousemove", function (event) {
        if (isPainting) {
            prevX = currentX;
            currentX = event.clientX - canvas.offsetLeft;
            prevY = currentY;
            currentY = event.clientY - canvas.offsetTop;
            // console.log(`Current X: ${currentX}`);

            draw();
        } 
    });

    canvas.addEventListener("mouseleave", function (event) {
        isPainting = false;
    });

    // Touch Events
    canvas.addEventListener("touchstart", function (event) {
        isPainting = true;
        // console.log("Touchdown");
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currentY = event.touches[0].clientY - canvas.offsetTop;
    });

    canvas.addEventListener("touchend", function (event) {
        isPainting = false;
    });

    canvas.addEventListener("touchcancel", function (event) {
        isPainting = false;
    });

    canvas.addEventListener("touchmove", function (event) {
        if (isPainting) {
            prevX = currentX;
            currentX = event.touches[0].clientX - canvas.offsetLeft;
            prevY = currentY;
            currentY = event.touches[0].clientY - canvas.offsetTop;
            // console.log(`Current X: ${currentX}`);

            draw()
        } 
    });
}

function draw() {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function resetCanvas() {
    currentX = 0;
    currentY = 0;
    prevX = 0;
    prevY = 0;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}