function createBox(){
    //created
    let stickyPad = document.createElement("div");
    let navbar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let container = document.createElement("div");
    // subtree
    stickyPad.appendChild(navbar);
    stickyPad.appendChild(container);
    navbar.appendChild(close);
    navbar.appendChild(minimize);
    // styling
    stickyPad.setAttribute("class", "stickyPad");
    navbar.setAttribute("class", "navbar");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
    container.setAttribute("class", "container");

    document.body.appendChild(stickyPad);

    let initialX = null;
    let initialY = null;
    let isStickyDown = false;
    navbar.addEventListener("mousedown", function (e) {
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown = true;
    })
    board.addEventListener("mousemove", function (e) {
        if (isStickyDown == true) {
            let finalX = e.clientX;
            let finalY = e.clientY;
            console.log(finalX);
            console.log(finalY);
            let dx = finalX-initialX;
            let dy = finalY-initialY;
            let {top,left} = stickyPad.getBoundingClientRect();
            stickyPad.style.left = left + dx + "px";
            stickyPad.style.top = top + dy + "px";
            initialX = finalX;
            initialY = finalY;
        }
    })
    window.addEventListener("mouseup", function () {
        isStickyDown = false;
    })
    close.addEventListener("click",function(){
        stickyPad.remove();
    })
    let flag = true;
    minimize.addEventListener("click",function(){
           if(flag){
               container.style.display = "none";
               flag = false;
           }else{
               container.style.display = "block";
               flag = true;
           }
    })
    return container;

}