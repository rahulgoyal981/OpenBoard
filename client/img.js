let upload = document.querySelector("#upload");
let download = document.querySelector("#download");
upload.addEventListener("change", function (e) {
    let uInp = document.querySelector("input[type='file']");
    // uInp.click();
    // console.log(upload);
    let file = uInp.files[0];
    let img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    let container = createBox();
    container.appendChild(img);
    img.setAttribute("class", "upload-img");
    uInp.value = null;
})
download.addEventListener("click", function () {
    let a = document.createElement("a");
    a.download = "file.png";
    a.href = board.toDataURL('image/png');
    console.log(a);
    a.click();
    a.remove();
})
