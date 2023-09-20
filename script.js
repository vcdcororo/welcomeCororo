const cube = document.querySelector(".cube");
const btnTop = document.querySelector(".btn-top");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");

const togglePage = document.querySelector("#toggle-page");
const pageIframe = document.querySelectorAll(".page-iframe");
const playerObj = document.querySelectorAll(".obj");

for(let i = 0; i < 6; i++){
    playerObj[i].addEventListener("click", function() {
        togglePage.style.display = "flex";
        pageIframe[i].src = pageIframe[i].src;
        pageIframe[i].style.display = "block";
    });
    togglePage.addEventListener("click", function() {
        togglePage.style.display = "none";
        pageIframe[i].src = pageIframe[i].src;
        pageIframe[i].style.display = "none";
    });
}


let currentFace = 0;
let currentDeg = 0;
let toggleTop = false;
let faceInfo = [
    // 0 : front
    "translateZ(500px) translateX(0px)",

    // 1 : right
    "translateZ(250px) translateX(-250px)",

    // 2 : back
    "translateZ(0px) translateX(0px)",

    // 3 : left
    "translateZ(250px) translateX(250px)",
];

btnLeft.addEventListener("click", () => {
    currentFace -= 1;
    currentDeg -= 90;
    toggleTop = false;
    if (currentFace < 0) {
        currentFace = 3;
    }
    cube.style.transform = `rotateY(${currentDeg}deg) ${faceInfo[currentFace]}`;
});

btnRight.addEventListener("click", () => {
    currentFace += 1;
    currentDeg += 90;
    toggleTop = false;
    if (currentFace > 3) {
        currentFace = 0;
    }
    cube.style.transform = `rotateY(${currentDeg}deg) ${faceInfo[currentFace]}`;
});

btnTop.addEventListener("click", () => {
    currentFace = 0;
    currentDeg = 0;
    if(toggleTop === false){
        cube.style.transform = `rotateY(0deg) rotateX(90deg) translateX(0px) translateY(250px) translateZ(250px)`;
        toggleTop = true;
    }else if(toggleTop === true){
        cube.style.transform = `rotateY(${currentDeg}deg) ${faceInfo[currentFace]}`;
        toggleTop = false;
    }
    });