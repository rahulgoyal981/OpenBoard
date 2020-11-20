let isPenDown = false;
let points = [];
let redoArr = [];
board.addEventListener("mousedown", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    let top = getPosition();
    console.log(top);
    y = y - top;
    ctx.beginPath(0, 0);
    ctx.moveTo(x, y);
    isPenDown = true;
    let mdp = {
        x: x,
        y: y,
        id: "md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }
    socket.emit("md",mdp);
    points.push(mdp);
})
board.addEventListener("mousemove", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    let top = getPosition();
    y = y - top;
    if (isPenDown) {
        ctx.lineTo(x, y);
        ctx.stroke();
        let mmp = {
            x: x,
            y: y,
            id: "mm",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        socket.emit("mm",mmp);
        points.push(mmp);
    }

})
board.addEventListener("mouseup", function (e) {
    isPenDown = false;
})

function getPosition() {
    let { top } = board.getBoundingClientRect();
    return top;
}
function redraw() {
    for (let i = 0; i < points.length; i++) {
        let { x, y, color, width, id } = points[i];
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        if (id == "md") {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else if (id == "mm") {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}
function undoMaker() {
    let tempArr = [];
    if (points.length >= 2) {
        for (let i = points.length - 1; i >= 0; i--) {
            let { id } = points[i];
            if (id == "md") {
                tempArr.unshift(points.pop());
                break;
            } else {
               tempArr.unshift(points.pop());
            }
        }
        ctx.clearRect(0, 0, board.width, board.height);
        redoArr.push(tempArr);
        redraw();
    }
}
function redoMaker(){
   if(redoArr.length>0){
       let mrPathArr = redoArr.pop();
       points.push(...mrPathArr);
       ctx.clearRect(0, 0, board.width, board.height);
        // redoArr.push(tempArr);
        redraw();
   }
}