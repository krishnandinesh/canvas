var finalCanvas = document.getElementById("finalCanvas");
var finalCtx = finalCanvas.getContext("2d");

var tempCanvas = document.getElementById("tempCanvas");
var tempCtx = tempCanvas.getContext("2d");

const start = document.getElementById("cl");
const end = document.getElementById("re");
const size = document.getElementById("size");

var recta = document.getElementById("rect");
var det = document.getElementById("details");

var currX = 0, currY = 0;
var clickX = 0, clickY = 0, releaseX = 0, releaseY = 0;
var mousedown = false;
var flag = 1;
var colorsel;

// ---------------DRAW---------------

function down(e) {
    mousedown = true;
    position(e);
}

function up(e) {
    mousedown = false;
    position(e);
}

function draw(e) {
    if (mousedown) {
        finalCtx.beginPath();
        finalCtx.lineWidth = 1;
        finalCtx.strokeStyle = colorsel;
        finalCtx.moveTo(currX, currY);
        position(e);
        finalCtx.lineTo(currX, currY);
        finalCtx.stroke();
    }
}

// -------------POSITION--------------
function position(e) {
    currX = e.offsetX;
    currY = e.offsetY;
}

// -----------RECTANGLE FUNCTION-------------

function initiateRect(e) {
    mousedown = true;
    position(e);
    clickX = currX;
    clickY = currY;

    start.innerHTML = "X: " + clickX + ", Y: " + clickY;
}

function drawRect(e) {
    rect(e, tempCtx, true);
}

function persistRect(e) {
    rect(e, finalCtx, false);
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height); //clear canvas
    mousedown = false;

    position(e);
    releaseX = currX;
    releaseY = currY;

    end.innerHTML = "X: " + releaseX + ", Y: " + releaseY;
    size.innerHTML = "Width: " + Math.abs(clickX - releaseX) + ", Height: " + Math.abs(clickY - releaseY);

}

function rect(e, ctx, isClearReq) {
    let endX = e.offsetX - currX, endY = e.offsetY - currY;
    if (mousedown) {
        if (isClearReq) {
            tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height); //clear canvas
        }
        createRect(ctx, currX, currY, endX, endY);
    }
}

function createRect(ctx, startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.rect(startX, startY, endX, endY);
    ctx.strokeStyle = colorsel;
    ctx.lineWidth = 1;
    ctx.stroke();
}

// -------------BUTTON FUNCTION-------------

function toggleRect() {
    $(tempCanvas).toggleClass("hide");
    $(recta).toggleClass("select");
    $(det).toggleClass("hide");
}

function clean() {
    finalCtx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

    start.innerHTML = "-";
    end.innerHTML = "-";
    size.innerHTML = "-";

    colorsel = "black";
}

function violet() {
    colorsel = "violet";
}

function indigo() {
    colorsel = "indigo";
}

function blue() {
    colorsel = "blue";
}

function green() {
    colorsel = "green";
}

function yellow() {
    colorsel = "yellow";
}

function orange() {
    colorsel = "orange";
}

function red() {
    colorsel = "red";
}

// -----------------------EVENTS-----------------------

finalCanvas.addEventListener("mousedown", down);
finalCanvas.addEventListener("mouseup", up);
finalCanvas.addEventListener("mousemove", draw);
finalCanvas.addEventListener("mouseleave", up);

// tempCanvas.addEventListener("mouseleave", persistRect);
tempCanvas.addEventListener("mousedown", initiateRect);
tempCanvas.addEventListener("mousemove", drawRect)
tempCanvas.addEventListener("mouseup", persistRect);
