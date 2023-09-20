let cube = document.querySelectorAll(".cube");
let scene = document.querySelectorAll(".scene");
const screen = document.querySelector(".cube__face--back");
const blkbox = document.querySelector(".black-box");
const overlay = document.querySelector(".overlay");

scene[0].addEventListener("mousemove", function (event) {
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  let sceneWidth = scene[0].offsetWidth;
  let sceneHeight = scene[0].offsetHeight;

  let rotationY = (mouseX / sceneWidth - 0.5) * 8; // 마우스 X 좌표에 따른 회전 각도 계산
  let rotationX = (mouseY / sceneHeight - 0.5) * -4; // 마우스 Y 좌표에 따른 회전 각도 계산

  let rotateStyle = 
    "rotateY(" +
    rotationY +
    "deg) rotateX(" +
    rotationX +
    "deg) translateZ(300px) translateY(-300px)";

  cube[0].style.transform = rotateStyle;
  cube[1].style.transform = rotateStyle;
});

//audio import
let audio = document.getElementById("myAudio");
audio.src = "./src/music.mp3";

let playButton = document.getElementById("playButton");
let progressBar = document.getElementById("progressBar");
let progressBarFill = document.getElementById("progressBarFill");
let progressBarHandle = document.getElementById("progressBarHandle");
let currentTime = document.getElementById("currentTime");

let isDragging = false;
let currentSeconds = 0;

//재생 버튼을 누르면 오디오를 시작하고, 시작되어있는 상태면 멈춤.
playButton.addEventListener("click", function () {
  overlay.style.display = "none";
  playButton.style.display = "none";
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

// progressBar.addEventListener('click', function(event) {
//   let progressBarWidth = progressBar.offsetWidth;
//   let clickPosition = event.offsetX;
//   let newPosition = (clickPosition / progressBarWidth) * audio.duration;
//   audio.currentTime = newPosition;
// });

// 마우스를 누르는 시점에 커서를 그랩으로 바꾸고 isDragging을 업데이트
progressBarHandle.addEventListener("mousedown", function () {
  progressBarHandle.style.cursor = "grabbing";
  isDragging = true;
});

// 마우스가 떼지는 시점에 isDragging을 false로 업데이트
document.addEventListener("mouseup", function () {
  if (isDragging) {
    progressBarHandle.style.cursor = "grab";
    isDragging = false;
  }
});

//isDragging이 true일 때 움직이면 마우스의 위치를 받아와 진행 막대를 움직임.
document.addEventListener("mousemove", function (event) {
  if (isDragging) {
    let progressBarWidth = progressBar.offsetWidth;
    let dragPosition = event.pageX - progressBar.getBoundingClientRect().left;
    let newPosition = (dragPosition / progressBarWidth) * audio.duration;
    audio.currentTime = newPosition;
  }
});

//오디오가 재생되며 시간이 업데이트 될 때 실행되는 이벤트 함수
audio.addEventListener("timeupdate", function () {
  let progress = (audio.currentTime / audio.duration) * 100;
  progressBarHandle.style.left = progress + "%";
  currentSeconds = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
  console.log(currentSeconds);
  loadFunction();
});

//초를 분:초로 반환
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  return minutes + ":" + remainingSeconds;
}

function setComp(min, max, target, newName, prevName) {
  let tgt = target;
  if (currentSeconds > min && currentSeconds < max) {
    tgt.setAttribute("id", newName);
  } else {
    tgt.setAttribute("id", prevName);
  }
}

function addDelClass(min, max, target, className) {
  let tgt = target;
  if (currentSeconds > min && currentSeconds < max) {
    tgt.classList.add(className);
  } else {
    tgt.classList.remove(className);
  }
}
// const comp = document.querySelectorAll(".comp");
function loadFunction(){
    addDelClass(0, 46, screen, "blc-01");
    addDelClass(3, 46, screen, "blc-01-light");
    setComp(0, 46, sceneSetting[0].comp, "disblock", "disnone" );

    addDelClass(46, 74, screen, "blc-02")
    addDelClass(49, 74, screen, "blc-02-light");
    setComp(49, 73, sceneSetting[1].comp, "disblock", "disnone" );

    addDelClass(73, 118, screen, "blc-03-light");
    setComp(73, 118, sceneSetting[2].comp, "disblock", "disnone" );
    
    addDelClass(118, 145, screen, "blc-04");
    addDelClass(121, 145, screen, "blc-04-light");
    setComp(121, 145, sceneSetting[3].comp, "disblock", "disnone" );

    setComp(163, 166, blkbox, "disblock", "disnone" );
    addDelClass(145, 262, screen, "blc-05-light");
    setComp(145, 262, sceneSetting[4].comp, "disblock", "disnone" );

    addDelClass(262, 309, screen, "blc-06-light");
    setComp(262, 309, sceneSetting[5].comp, "disblock", "disnone" );
}

let sceneSetting = [
  {
    //      ~ 0:47 sh 성훈
    comp: document.querySelectorAll(".comp")[0],
    objs: document.querySelectorAll(".img-sh")
  },
  {
    // 0:47 ~ 1:14 jw 지원
    comp: document.querySelectorAll(".comp")[1],
    objs: document.querySelectorAll(".img-jw")
  },
  {
    // 1:14 ~ 2:00 hj 환준
    comp: document.querySelectorAll(".comp")[2],
    objs: document.querySelectorAll(".img-hj")
  },
  {
    // 2:00 ~ 2:25 mj 민제
    comp: document.querySelectorAll(".comp")[3],
    objs: document.querySelectorAll(".img-mj")
  },
  {
    // 2:25 ~ 4:23 cs 채선
    comp: document.querySelectorAll(".comp")[4],
    objs: document.querySelectorAll(".img-cs")
  },
  {
    // 2:43 ~ 4:23 sy 수연
    comp: document.querySelectorAll(".comp")[5],
    objs: document.querySelectorAll(".img-sy")
  }
]

// console.log(sceneSetting[0].objs);