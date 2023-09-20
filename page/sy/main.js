// left bar hover event
const yellowArea = document.getElementById("yellowArea");
const infoImage = document.getElementById("infoImage");

yellowArea.addEventListener("mouseover", function (e) {
  infoImage.style.visibility = "visible";
});

yellowArea.addEventListener("mouseout", function (e) {
  infoImage.style.visibility = "hidden";
});

// mouse move event
const maxMovementX = 100;
const maxMovementY = 200;
const container = document.getElementById('container');
let moveCounter = 0;

// background clip path move
const redLine = document.getElementById("redLine");
const movingImage = document.getElementById("movingImage");
let purpleCover = document.querySelector(".purpleCover");
let start;
const totalDuration = 338000;
const delay = 3000;
const buttonDelay = 15000;

function move(timestamp) {
  if (!start) start = timestamp;
  const elapsed = timestamp - start - delay;
  if (elapsed > 0) {
    const progress = Math.min(elapsed / totalDuration, 1);
    let moveBy = Math.floor(progress * (window.innerWidth - 300));
    moveBy = Math.min(moveBy, window.innerWidth - 305);
    redLine.style.transform = `translateX(${moveBy}px)`;

    if (purpleCover) {
      purpleCover.style.width = `${moveBy}px`;
    }
  }
  if (elapsed < totalDuration + delay) {
    window.requestAnimationFrame(move);
  }
}

window.onload = function () {
    window.requestAnimationFrame(move);
};

// preImage
let preImage = document.createElement('img');
const imgWrap = document.querySelector('.img-wrap');
preImage.style.position = 'absolute';
preImage.style.zIndex = 1;
container.appendChild(preImage);

// move event
window.addEventListener("mousemove", function (e) {
  const xRatio = e.clientX / window.innerWidth;
  const yRatio = e.clientY / window.innerHeight;
  movingImage.style.transform = `
    translate(-50%, -50%)
    translate(
        ${maxMovementX * (0.5 - xRatio)}px,
        ${maxMovementY * (0.5 - yRatio)}px
        )`;
  infoImage.style.left = `${e.pageX}px`;
  infoImage.style.top = `${e.pageY}px`;

  let x = e.clientX - container.offsetLeft; // 마우스의 x 위치 계산
  let y = e.clientY - container.offsetTop; // 마우스의 y 위치 계산
  moveCounter++;
  
  if (moveCounter % 30 == 0) { // Add this line
    let randomNumber = Math.floor(Math.random() * 149) + 1; // 랜덤한 이미지를 선택하기 위한 변수
    preImage.src = 'piece/' + randomNumber + '.png';
    preImage.width = preImage.naturalWidth * 0.2;
  }

  preImage.style.left = x + 'px';
  preImage.style.top = y + 'px';
});

// click event
container.addEventListener('click', function(event) {
    let newImage = document.createElement('img');
    newImage.style.left = event.clientX - container.offsetLeft + 'px';
    newImage.style.top = event.clientY - container.offsetTop + 'px';
    newImage.src = preImage.src;
    newImage.style.position = 'absolute';
    newImage.width = newImage.naturalWidth * 0.2;
    imgWrap.appendChild(newImage);
});
