// const { Socket } = require("socket.io-client");

// const { contextBridge } = require("electron");
const socket = io.connect("https://r-openboard.herokuapp.com/");
let activeTool = "pencil";
// ctx.lineWidth = 5;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = 1;
ctx.imageSmoothingEnabled = true;
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let sticky = document.querySelector("#sticky");
let pencilSize = 5;
let eraserSize = 5;
pencil.addEventListener("click", function () {
    if (activeTool == "pencil") {
        pencilOptions.classList.add("show");
    } else {
        eraserOptions.classList.remove("show");
        activeTool = "pencil";
        ctx.strokeStyle = "black";
        ctx.lineWidth = pencilSize;
        // socket.emit("color","black");
    }
})
eraser.addEventListener("click", function () {
    if (activeTool == "eraser") {
        eraserOptions.classList.add("show");
    } else {
        pencilOptions.classList.remove("show");
        activeTool = "eraser";
        ctx.strokeStyle = "white";
        // socket.emit("color","white");
        ctx.lineWidth = eraserSize;
    }
})
undo.addEventListener("click", function () {
    undoMaker();
})
redo.addEventListener('click', function () {
    redoMaker();
})
sticky.addEventListener("click", function () {
    createSticky();
})
document.addEventListener('keydown', function (e) {
    const evtobj = e;
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        undoMaker();
    }
})
document.addEventListener('keydown', function (e) {
    const evtobj = e;
    if (evtobj.keyCode == 89 && evtobj.ctrlKey) {
        redoMaker();
    }
})
function handleColor(color) {
    ctx.strokeStyle = color;
    socket.emit("color",color);
}
function setWidth(val) {
    ctx.lineWidth = val;
    if(activeTool == "pencil"){
        pencilSize = ctx.lineWidth;
    }else{
        eraserSize = ctx.lineWidth;
    }
}
