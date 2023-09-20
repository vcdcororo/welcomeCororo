let cube = document.querySelectorAll(".cube");
let scene = document.querySelectorAll(".scene");
const screen = document.querySelector(".cube__face--back");
const blkbox = document.querySelector(".black-box");

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
    addDelClass(163, 262, screen, "blc-05");
    addDelClass(163, 262, screen, "blc-05-light");
    setComp(145, 262, sceneSetting[4].comp, "disblock", "disnone" );

    addDelClass(262, 309, screen, "blc-06-light");
    setComp(262, 309, sceneSetting[5].comp, "disblock", "disnone" );
}

// function loadFunction() {
//   // 0 ~ 47 sh
//   addDelClass(0, 5, blkbox, "anim-blackbox-01");
//   setComp(4, 46, blkbox, "disnone" );
//   setComp(0, 46, comp[0], "disblock" );
//   setComp(47, 309, comp[0], "disnone" );
//   setComp(46, 49, blkbox, "disblock" );

//   // 0:47 ~ 1:14 jw
//   addDelClass(48, 50, blkbox, "anim-blackbox-02");
//   setComp(49, 74, blkbox, "disnone" );
//   setComp(47, 74, comp[1], "disblock" );
//   setComp(0, 47, comp[1], "disnone" );
//   setComp(74, 309, comp[1], "disnone" );

//   // 1:14 ~ 2:00 hj
//   setComp(0, 74, comp[2], "disnone" );
//   setComp(74, 120, comp[2], "disblock" );
//   setComp(120, 309, comp[2], "disnone" );
//   setComp(118, 122, blkbox, "disblock" );

//   // 2:00 ~ 2:25 mj
//   addDelClass(120, 122, blkbox, "anim-blackbox-03");
//   setComp(121, 145, blkbox, "disnone" );
//   setComp(0, 120, comp[3], "disnone" );
//   setComp(120, 145, comp[3], "disblock" );
//   setComp(145, 309, comp[3], "disnone" );

//   // 2:25 ~ 4:23 cs
//   setComp(0, 145, comp[4], "disnone");
//   setComp(145, 262, comp[4], "disblock" );
//   setComp(263, 309, comp[4], "disnone");

//   // 2:43 ~ 2:45
//   addDelClass(165, 166, blkbox, "anim-blackbox-04");
//   setComp(163, 168, blkbox, "disblock" );
//   setComp(166, 168, blkbox, "disnone" );

//   // 4:23 ~ 309
//   setComp(0, 262, comp[5], "disnone" );
//   setComp(262, 309, comp[5], "disblock" );
// }
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

console.log(sceneSetting[0].objs);