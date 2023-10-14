//초기 화면 크기 저장
const WindowWidth = window.innerWidth;
const WindowHeight = window.innerHeight;

// 현재 윈도우 크기저장
function saveWindowSize() {
  // 현재 윈도우 크기
  const currentWindowWidth = window.innerWidth;
  const currentWindowHeight = window.innerHeight;

  // 초기 윈도우 크기와 비교하여 값이 변하지 않을 경우에만 저장
  if (
    currentWindowWidth !== WindowWidth ||
    currentWindowHeight !== WindowHeight
  ) {
    WindowWidth = currentWindowWidth;
    WindowHeight = currentWindowHeight;
  }
  //화면 크기 저장 삭제
  window.removeEventListener("load", saveWindowSize);
}
document.addEventListener("DOMContentLoaded", saveWindowSize);

//화면 크기를 이용한 개체 사이즈 조절10%
function setImageSize10() {
  const windowWidth = WindowWidth;
  const ImgSize10 = document.querySelector(".ImgSize10");
  const imageWidth10 = Math.min(windowWidth * 0.1, 1000); // 윈도우 너비의 10% 또는 최대 너비 값

  // 이미지의 너비 설정
  ImgSize10.style.width = imageWidth10 + "px";
}
window.addEventListener("load", setImageSize10);
window.addEventListener("resize", setImageSize10);

//이미지가 배치된 곳의 x좌표 위치 리스트
var imagePositionsX = [0, WindowWidth];

function saveImagePositionX(event) {
  var x = event.clientX;
  imagePositionsX.push(x);

}
document.addEventListener("click", saveImagePositionX);

//이미지가 배치된 곳의 y좌표 위치 리스트
var imagePositionsY = [0, WindowHeight];

function saveImagePositionY(event) {
  var y = event.clientY;
  imagePositionsY.push(y);
}
document.addEventListener("click", saveImagePositionY);

//x리스트의 연속된 값 중에서 가장 편차가 큰 두 값의 평균 함수
function calculateMaxDeviationAverageX(imagePositionsX) {
  var maxDeviation = 0;
  var startIndex = 0;
  var endIndex = 0;

  // 연속된 값 중에서 가장 편차가 큰 두 값 찾기
  for (var i = 1; i < imagePositionsX.length; i++) {
    var currentDeviation = Math.abs(
      imagePositionsX[i] - imagePositionsX[i - 1]
    );
    if (currentDeviation > maxDeviation) {
      maxDeviation = currentDeviation;
      startIndex = i - 1;
      endIndex = i;
    }
  }

  // 평균 계산
  var averageX = (imagePositionsX[startIndex] + imagePositionsX[endIndex]) / 2;
  return averageX;
}
document.addEventListener("click", calculateMaxDeviationAverageX);
//y리스트의 연속된 값 중에서 가장 편차가 큰 두 값의 평균 함수
function calculateMaxDeviationAverageY(imagePositionsY) {
  var maxDeviation = 0;
  var startIndex = 0;
  var endIndex = 0;

  // 연속된 값 중에서 가장 편차가 큰 두 값 찾기
  for (var i = 1; i < imagePositionsY.length; i++) {
    var currentDeviation = Math.abs(
      imagePositionsY[i] - imagePositionsY[i - 1]
    );
    if (currentDeviation > maxDeviation) {
      maxDeviation = currentDeviation;
      startIndex = i - 1;
      endIndex = i;
    }
  }

  // 평균 계산
  var averageY = (imagePositionsY[startIndex] + imagePositionsY[endIndex]) / 2;
  return averageY;
}

document.addEventListener("click", calculateMaxDeviationAverageY);

//마우스 xy좌표 위치
var mousePosition = { x: 0, y: 0 };
document.addEventListener("mousemove", function (event) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
});

//[시간별 애니메이션 작동]
//=채선=

//빈 화면 클릭 시 음악 시작 및 타이틀 및 배경 구름 등장
//음악 재생
function playMusic() {
  var audioElement = document.getElementById("music");
  audioElement.play();
  document.removeEventListener("click", playMusic);
}

document.addEventListener("click", playMusic, { once: true });

// 지속 시간 초기화 함수
var duration = 0;
function resetDuration() {
  duration = 0;
  document.removeEventListener("click", resetDuration);
}

// 1초마다 duration 변수를 1씩 증가시키는 함수
function increaseDuration() {
  duration++;
  // console.log("Duration:", duration);
}

// 이벤트 리스너로 setInterval 대신 함수를 직접 호출
document.addEventListener("click", () => {
  setInterval(increaseDuration, 1000);
});


//타이틀 구름 이미지 추가
function showImageTitleCloud() {
  var imageElement = document.createElement("img");
  imageElement.src = "./img/01_chae/cloud.svg";
  imageElement.classList.add("TitleCloud");
  imageElement.classList.add("TitleCloudAni");
  imageElement.classList.add("ImgSize15");
  imageElement.classList.add("show");
  document.body.appendChild(imageElement);

  document.removeEventListener("click", showImageTitleCloud);
  imageElement.addEventListener("click", TitleCloudClickedPosition),
    { once: true };

  // 이미지 로드 후에 애니메이션 정지 클릭 리스너 추가 및 클릭 횟수 초기화 리스너 추가
  imageElement.addEventListener("load", function () {
    imageElement.addEventListener("click", stopAnimation);
  });

  //지속시간 초기화
  document.addEventListener("click", resetDuration);
}
document.addEventListener("click", showImageTitleCloud);

var clickCount = 100;
// console.log("클릭 횟수:" + clickCount);

// 애니메이션을 정지시키는 작업 수행
function stopAnimation(event) {
  event.target.style.animationPlayState = "paused";
  clickCount = -2;
  // console.log("Click:" + clickCount)
  document.addEventListener("click", CickCount);
  document.removeEventListener("click", stopAnimation);
}

//클릭 횟수 카운트
function CickCount() {
  document.addEventListener("click", showImageBgCloud);
  clickCount++;
  // console.log("Click:" + clickCount)
}

//배경 구름 등장 함수
function getImageSrcBgCloud() {
  var imageSrc = "./img/01_chae/cloud02.svg";
  return imageSrc;
  // console.log("Click:" + clickCount);
}

function showImageBgCloud() {
  var imageElement = document.createElement("img");
  imageElement.src = getImageSrcBgCloud();
  imageElement.classList.add("BgCloud");
  imageElement.classList.add("BgCloudAni");
  imageElement.classList.add("ImgSize10");
  imageElement.classList.add("show");
  document.body.appendChild(imageElement);
}

document.addEventListener("click", showImageBgCloud);

//타이틀구름 클릭 시 이미지 전개

//이미지 위치 계산
function TitleCloudClickedPosition(event) {
  var clickX = event.clientX;
  var clickY = event.clientY;

  var image01 = document.querySelector(".ChaImg01");
  image01.style.left = clickX + "px";
  image01.style.top = clickY + 50 + "px";

  var text01 = document.querySelector(".ChaTxt01");
  text01.style.left = clickX + 10 + "px";
  text01.style.top = clickY + 30 + "px";

  var image02 = document.querySelector(".ChaImg02");
  image02.style.left = clickX - 300 + "px";
  image02.style.top = clickY + 150 + "px";

  var text02 = document.querySelector(".ChaTxt02");
  text02.style.left = clickX - 300 + "px";
  text02.style.top = clickY + 180 + "px";

  var image03 = document.querySelector(".ChaImg03");
  image03.style.left = clickY + "px";
  image03.style.top = clickX + 200 + "px";

  var text03 = document.querySelector(".ChaTxt03");
  text03.style.left = clickY + "px";
  text03.style.top = clickX + 190 + "px";

  document.addEventListener("click", showChaImg01);

  // console.log("Clicked positions:" + clickX, clickY);
  document.removeEventListener("click", TitleCloudClickedPosition);

  //document.body.appendChild(imageElement);

  //var imageSrc = getChaImgSrc();
  //imageElement.src = imageSrc;
}


// !--------------------------

function showChaImg01() {
  var imageElement = document.querySelector(".ChaImg01");
  imageElement.style.display = "block";
  imageElement.classList.add("ImgSize20");
  document.addEventListener("click", showChaTxt01);
}

function showChaTxt01() {
  var imageElement = document.querySelector(".ChaTxt01");
  imageElement.style.display = "block";
  imageElement.classList.add("ImgSize20");
  document.addEventListener("click", showChaImg02);
}

function showChaImg02() {
  // console.log('cha02');
  const currentWindowHeight = window.innerHeight;
  var imageElement = document.querySelector(".ChaImg02");
  imageElement.style.display = "block";
  imageElement.style.top = "0px";
  imageElement.style.left = "0px";
  imageElement.style.height = currentWindowHeight + "px";
  //imageElement.style.z-index = '-100';
  document.addEventListener("click", showChaTxt02);
  //이미지 점점 사라지게하기
}

function showChaTxt02() {
  // console.log('cha02-txt');
  var imageElement = document.querySelector(".ChaTxt02");
  imageElement.style.display = "block";
  imageElement.classList.add("ImgSize20");
  document.addEventListener("click", showChaImg03);
}

function showChaImg03() {
  var imageElement = document.querySelector(".ChaImg03");
  imageElement.style.display = "block";
  imageElement.classList.add("ImgSize20");
  document.addEventListener("click", showChaTxt03);
}

function showChaTxt03() {
  var imageElement = document.querySelector(".ChaTxt03");
  imageElement.classList.add("ImgSize20");
  imageElement.style.display = "block";
  setTimeout(showImageWithDelaySH, 2500);
  document.removeEventListener("click", showChaTxt03);
}

//이미지3 애니메이션(css)

//=성훈=
function getImageSrcTitleSH() {
  var imageSrc = "./img/03_sh/text01.png";
  return imageSrc;
}

//타이틀 이미지 생성
function showImageWithDelaySH() {
  // 이미지 생성 및 위치 설정
  var imageElement = document.createElement("img");
  var averageX = calculateMaxDeviationAverageX(imagePositionsX);
  var averageY = calculateMaxDeviationAverageY(imagePositionsY);
  imageElement.src = getImageSrcTitleSH();
  imageElement.classList.add("ImgSize30");
  imageElement.classList.add("SHTitle");
  //imageElement.classList.add('SHTitleAni');
  imageElement.style.position = "absolute";
  imageElement.style.left = averageX + "px";
  imageElement.style.top = averageY + "px";
  document.body.appendChild(imageElement);
  // console.log('clcik');
  document.removeEventListener("click", showImageWithDelaySH);
  imageElement.addEventListener("click", ClickSHTitle);
  AddGif03();
}

//성훈 타이틀 클릭 시 애니메이션 중지
function ClickSHTitle() {
  // console.log('clcik-');
  var imageElement = document.querySelector(".SHTitle");

  // CSS 클래스 제거
  imageElement.classList.remove("SHTitleAni");
  imageElement.classList.add("SHTitleAniPaused");

  document.addEventListener("click", SH);
  document.addEventListener("click", resetDurationSH);
  AddGif04();
  AddGif04_1();
}

var durationSH = 0;
// 지속 시간 초기화 함수
function resetDurationSH() {
  durationSH = 0;
  document.removeEventListener("click", resetDurationSH);
}

// 1초마다 duration 변수를 1씩 증가시키는 함수
function increaseDurationSH() {
  durationSH++;
  // console.log("DurationSH:", durationSH);
}

// 이벤트 리스너로 setInterval 대신 함수를 직접 호출
document.addEventListener("click", () => {
  setInterval(increaseDurationSH, 1000);
});


//이미지 전개
function showImageSH() {
  setTimeout(function () {
    var imageElement = document.createElement("img");
    imageElement.src = "./img/03_sh/03_sunghoon_img.gif";
    imageElement.classList.add("ImgSize20");
    imageElement.classList.add("SHImg01");
    document.body.appendChild(imageElement);
    // console.log('ㄱ서ㅇ훈');
    document.removeEventListener("click", SH);
  }, 1000);
}

//이미지 전개
function showTextSH() {
  setTimeout(function () {
    var imageElement = document.createElement("img");
    imageElement.src = "./img/03_sh/03_sunghoon_txt.gif";
    imageElement.classList.add("ImgSize20");
    imageElement.classList.add("show");
    imageElement.classList.add("SHTxt01");
    document.body.appendChild(imageElement);
  }, 3000);
}

//이미지 전개2
function showImageSH02() {
  setTimeout(function () {
    var imageElement = document.createElement("img");
    imageElement.src = "./img/03_sh/03_sunghoon_img_128nodither.gif";
    imageElement.classList.add("ImgSize20");
    imageElement.classList.add("show");
    imageElement.classList.add("SHImg02");
    document.body.appendChild(imageElement);
  }, 5000);
}

//이미지 전개2
function showTextSH02() {
  setTimeout(function () {
    var imageElement = document.createElement("img");
    imageElement.src = "./img/03_sh/03_sunghoon_txt_128nodither.gif";
    imageElement.classList.add("ImgSize20");
    imageElement.classList.add("show");
    imageElement.classList.add("SHTxt02");
    document.body.appendChild(imageElement);
  }, 7000);
}

//이미지 전개3
function showImageSH03() {
  setTimeout(function () {
    var imageElement = document.createElement("img");
    imageElement.src = "./img/03_sh/03_sunghoon_img_restrictive.gif";
    imageElement.classList.add("ImgSize20");
    imageElement.classList.add("show");
    imageElement.classList.add("SHImg03");
    document.body.appendChild(imageElement);
  }, 9000);
}

//이미지 전개3
function showTextSH03() {
  setTimeout(function () {
    var imageElement = document.createElement("img");
    imageElement.src = "./img/03_sh/03_sunghoon_txt_restrictive.gif";
    imageElement.classList.add("ImgSize20");
    imageElement.classList.add("show");
    imageElement.classList.add("SHTxt03");
    document.body.appendChild(imageElement);
  }, 11000);
}

//이미지 전개4
function showImageSH04() {
  setTimeout(function () {
    var imageElement = document.createElement("img");
    imageElement.src = "./img/03_sh/03_sunghoon_img_color16.gif";
    imageElement.classList.add("ImgSize20");
    imageElement.classList.add("show");
    imageElement.classList.add("SHImg04");
    document.body.appendChild(imageElement);
  }, 13000);
}

//이미지 전개4
function showTextSH04() {
  setTimeout(function () {
    var imageElement = document.createElement("img");
    imageElement.src = "./img/03_sh/03_sunghoon_txt_color16.gif";
    imageElement.classList.add("ImgSize20");
    imageElement.classList.add("show");
    imageElement.classList.add("SHTxt04");
    document.body.appendChild(imageElement);
  }, 13000);
  setTimeout(function () {
    startSuyeon();
  }, 13000);
}

function SH() {
  showImageSH();
  showTextSH();
  showImageSH02();
  showTextSH02();
  showImageSH03();
  showTextSH03();
  showImageSH04();
  showTextSH04();
  durationSY = 0;
  ShowSphere24();
}

//=수연=
//음악 재생 이후 일정 시간 이후 마우스에 오렌지이미지 등장

var durationSY = 0;

// durationSY 값이 증가하는 예시 (시간이 흐르면서 durationSY가 증가해야 함)
setInterval(function () {
  durationSY++; // durationSY 값을 1씩 증가
}, 1000); // 1초마다 durationSY 값 증가 (실제로는 시간에 맞게 설정)

function startSuyeon() {
  if (durationSY >= 8) {
    // 8 이상일 때 실행할 작업을 여기에 추가
    getOrangeDropImg();
    ShowSYBar();
    // 페이지 로드 후 1초마다 랜덤 이미지 표시
    setInterval(showOrangeDropImg, 8000);
    setTimeout(function () {
      ShowtitleJW();
    }, 3000);
  }

  // durationSY가 8 미만인 경우 아래의 함수들을 호출
  showOrangeJuice();
  if (18 >= durationSY) {
    document.addEventListener("click", showOrangeJuice);
  }
  if (24 >= durationSY) {
    document.addEventListener("click", ShowSYBar);
  }
  if (28 >= durationSY) {
    document.addEventListener("click", showOrangeDropImg);
  }
}

function getImageSrcSY() {
  var imageSrc = "./img/02_sy/orangejuice.jpg";
  return imageSrc;
}

//마우스위치에 따른 오렌지 이미지 위치 반응
function showOrangeJuice() {
  var orangeJuice = document.querySelector(".juice");
  orangeJuice.style.display = "block";
  orangeJuice.classList.add("container");

  document.addEventListener("mousemove", moveOrangeJuice);
  document.addEventListener("click", fixOrangeJuice);
  showOrangeJuiceRe();
  AddGif02();
}

function moveOrangeJuice() {
  let juice = document.querySelector(".juice");

  document.addEventListener("mousemove", (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    juice.style.left = mouseX + "px";
    juice.style.top = mouseY + "px";
  });
}

//반대로 따라다니는 이미지(위치 계산)
function showOrangeJuiceRe() {
  var orangeJuice = document.querySelector(".Reversejuice");
  orangeJuice.style.display = "block";

  document.addEventListener("mousemove", moveOrangeJuiceRe);
  document.addEventListener("click", fixOrangeJuiceRe);
  AddGif02();
}

function moveOrangeJuiceRe(event) {
  var imageElement = document.querySelector(".Reversejuice");
  var containerElement = document.querySelector(".container");

  // 마우스의 현재 위치
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  // 컨테이너 요소의 가로, 세로 중앙 위치
  var containerCenterX = containerElement.offsetWidth / 2;
  var containerCenterY = containerElement.offsetHeight / 2;

  // 이미지 위치 계산
  var ReverseX = containerCenterX - (mouseX - containerCenterX);
  var ReverseY = containerCenterY - (mouseY - containerCenterY);

  // 이미지 위치 설정
  imageElement.style.left = ReverseX + "px";
  imageElement.style.top = ReverseY + "px";
}

//클릭 시 오렌지 이미지 드롭
function fixOrangeJuice(event) {
  var imageElement = document.createElement("img");
  var offsetX = event.clientX;
  var offsetY = event.clientY;
  imageElement.src = getImageSrcSY();
  imageElement.classList.add("ImgSize10");
  imageElement.style.position = "fixed";
  imageElement.style.left = offsetX + "px";
  imageElement.style.top = offsetY + "px";
  document.body.appendChild(imageElement);
}

function fixOrangeJuiceRe(event) {
  var imageElement = document.createElement("img");
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  var ReverseX = WindowHeight - mouseX;
  var ReverseY = WindowWidth - mouseY;
  imageElement.src = getImageSrcSY();
  imageElement.classList.add("ImgSize10");
  imageElement.style.position = "fixed";
  imageElement.style.left = ReverseX + "px";
  imageElement.style.top = ReverseY + "px";
  document.body.appendChild(imageElement);
}

//음악 재생 이후 일정 시간 이후 마우스가 움직이는 동선을 따라 오렌지 방울 드롭
const OrangeDropImg = [];

for (let i = 1; i <= 27; i++) {
  const imagePath = `./img/02_sy/assets/sy_drop${i}.png`;
  OrangeDropImg.push(imagePath);
}

function getOrangeDropImg() {
  // 이미지 배열에서 랜덤한 인덱스 선택
  const randomIndex = Math.floor(Math.random() * OrangeDropImg.length);

  // 선택한 이미지 경로 가져오기
  const randomOrangeDropImg = OrangeDropImg[randomIndex];
  return randomOrangeDropImg;
}

function showOrangeDropImg() {
  // 랜덤 이미지 경로 가져오기
  const OrangeDropImg = getOrangeDropImg();

  // 이미지 요소 생성 및 스타일 설정

  var RandomX = getRandomPosition(0, WindowWidth);
  var RandomY = getRandomPosition(0, WindowHeight);

  const imageElement = document.createElement("img");
  imageElement.src = OrangeDropImg;
  imageElement.alt = "Random Image";
  imageElement.classList.add("random-image");
  imageElement.classList.add("OrangeDrop");
  imageElement.style.left = RandomX + "px";
  imageElement.style.top = RandomY + "px";

  // 이미지를 페이지에 추가
  document.body.appendChild(imageElement);
}

var imageElement = document.querySelector(".OrangeDrop");
var containerElement = document.querySelector(".containerDrop");

//음악 재생 이후 일정 시간 이후 클릭 시 랜덤 위치에 바 드롭
const randombar = [];
for (let i = 1; i <= 6; i++) {
  const imagePath = `./img/02_sy/assets/sy_bar${i}.png`;
  randombar.push(imagePath);
}

function getRandomPosition(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ShowSYBar() {
  let SYbar01 = document.querySelector(".SYbar01");
  SYbar01.style.display = "block";
  setTimeout(function () {
    ShowSYBar02();
  }, 2000);
}

function ShowSYBar02() {
  let SYbar02 = document.querySelector(".SYbar02");
  SYbar02.style.display = "block";
  setTimeout(function () {
    ShowSYBar03();
  }, 4000);
  setTimeout(function () {
    ShowSYBar02();
  }, 2000);
}

function ShowSYBar03() {
  let SYbar03 = document.querySelector(".SYbar03");
  SYbar03.style.display = "block";
  setTimeout(function () {
    ShowSYBar04();
  }, 3000);
  setTimeout(function () {
    ShowSYBar02();
  }, 2000);
}

function ShowSYBar04() {
  let SYbar04 = document.querySelector(".SYbar04");
  SYbar04.style.display = "block";
  setTimeout(function () {
    ShowSYBar05();
  }, 1500);
}

function ShowSYBar05() {
  let SYbar05 = document.querySelector(".SYbar05");
  SYbar05.style.display = "block";
  setTimeout(function () {
    ShowSYBar06();
  }, 4000);
  setTimeout(function () {
    ShowSYBar03();
  }, 4000);
}

function ShowSYBar06() {
  let SYbar06 = document.querySelector(".SYbar06");
  SYbar06.style.display = "block";
}

//타이틀 클릭 위치 바로 아래에서 처음 이미지 전개
function ShowtitleJW() {
  //var caculatedX = calculateMaxDeviationAverageX();
  //var caculatedY = calculateMaxDeviationAverageY();
  var RandomX = getRandomPosition(0, WindowWidth);
  var RandomY = getRandomPosition(0, WindowHeight);

  var imageElement = document.createElement("img");
  imageElement.src = "./img/04_JW/img02-01.png";
  imageElement.classList.add("ImgSize20");
  document.body.appendChild(imageElement);
  // 이미지 위치 설정
  imageElement.style.left = RandomX + "px";
  imageElement.style.top = RandomY + "px";
  imageElement.addEventListener("click", ShowImgJW);
}

const ImgSrcJW = [
  "./img/04_jw/img00.png",
  "./img/04_jw/img01.png",
  "./img/04_jw/img01-01.png",
  "./img/04_jw/img01-02.png",
  "./img/04_jw/img01-03.png",
  "./img/04_jw/img01-04.png",
  "./img/04_jw/img01-05.png",
  "./img/04_jw/img01-06.png",
  "./img/04_jw/img02-01.png",
  "./img/04_jw/img02-02.png",
  "./img/04_jw/text01.svg",
  "./img/04_jw/text02.svg",
];

//타이틀 클릭 위치 함수에서 계산하여 위치 이동(화면 밖을 벗어나지 않도록)
function ShowImgJW() {
  for (let i = 0; i < ImgSrcJW.length; i++) {
    setTimeout(function () {
      var RandomX = getRandomPosition(0, WindowWidth);
      var RandomY = getRandomPosition(0, WindowHeight);

      imageElement = document.createElement("img");
      imageElement.src = ImgSrcJW[i];
      imageElement.classList.add("ImgSize15");
      document.body.appendChild(imageElement);
      // 이미지 위치 설정
      imageElement.style.left = RandomX + "px";
      imageElement.style.top = RandomY + "px";
    }, 1000);
  }
  setTimeout(function () {
    ShowTxtJW();
  }, 2000);
  setTimeout(function () {
    ShowTxtHJ();
  }, 3000);
  document.removeEventListener("click", ShowtitleJW);
}

function ShowTxtJW() {
  setTimeout(function () {
    var RandomX = getRandomPosition(0, WindowWidth);
    var RandomY = getRandomPosition(0, WindowHeight);

    imageElement = document.createElement("img");
    imageElement.src = "./img/04_jw/text03.svg";
    document.body.appendChild(imageElement);
    // 이미지 위치 설정
    imageElement.style.left = RandomX + "px";
    imageElement.style.top = RandomY + "px";
    imageElement.style.height = "100%";
  }, 1000);
  setTimeout(function () {
    ShowTxtHJ();
  }, 3000);
  document.removeEventListener("click", ShowtitleJW);
}

function ShowTxtHJ() {
  const currentWindowWidth = window.innerWidth;
  var RandomX = getRandomPosition(0, WindowWidth);
  var RandomY = getRandomPosition(0, WindowHeight);

  imageElement = document.createElement("img");
  imageElement.src = "./img/05_hj/05_hwanjun_02.png";
  imageElement.style.width = currentWindowWidth / 3 + "px";
  document.body.appendChild(imageElement);

  // 이미지 위치 설정
  imageElement.style.left = RandomX + "px";
  imageElement.style.top = RandomY + "px";

  imageElement.classList.add("TitleCloudAni");

  setTimeout(function () {
    ShowImgMJ();
  }, 5000);
  document.removeEventListener("click", ShowTxtHJ);
}

//=민제=
const ImgSrcMJ = [
  "./img/06_mj/img01.png",
  "./img/06_mj/img02.png",
  "./img/06_mj/img03.png",
  "./img/06_mj/img04.png",
  "./img/06_mj/img05.png",
  "./img/06_mj/img06.png",
  "./img/06_mj/img07.png",
  "./img/06_mj/img08.png",
  "./img/06_mj/img09.png",
  "./img/06_mj/img10.png",
  "./img/06_mj/img11.png",
  "./img/06_mj/img12.png",
  "./img/06_mj/img13.png",
  "./img/06_mj/img14.png",
  "./img/06_mj/img15.png",
  "./img/06_mj/img16.png",
  "./img/06_mj/img17.png",
  "./img/06_mj/img18.png",
  "./img/06_mj/img19.png",
];

//타이틀 클릭 위치 함수에서 계산하여 위치 이동(화면 밖을 벗어나지 않도록)
function ShowImgMJ() {
  for (let i = 0; i < ImgSrcMJ.length; i++) {
    setTimeout(function () {
      var RandomX = getRandomPosition(0, WindowWidth);
      var RandomY = getRandomPosition(0, WindowHeight);

      imageElement = document.createElement("img");
      imageElement.src = ImgSrcMJ[i];
      imageElement.classList.add("ImgSize10");
      document.body.appendChild(imageElement);
      // 이미지 위치 설정
      imageElement.style.left = RandomX + "px";
      imageElement.style.top = RandomY + "px";
    }, 5000);
  }
  AddGif01();
  Ending();
}

function AddGif01() {
  var imageElement = document.createElement("img");
  imageElement.src = "./img/07_etc/drop.gif";
  imageElement.classList.add("ImgSize20");
  imageElement.classList.add("show");
  document.body.appendChild(imageElement);
}

function AddGif02() {
  var imageElement = document.createElement("img");
  imageElement.src = "./img/07_etc/orange.gif";
  imageElement.classList.add("ImgSize10");
  imageElement.classList.add("show");
  imageElement.style.bottom = "0px";
  imageElement.style.right = "0px";
  document.body.appendChild(imageElement);
}

function AddGif03() {
  var imageElement = document.createElement("img");
  imageElement.src = "./img/07_etc/orangespiral.gif";
  imageElement.classList.add("ImgSize20");
  imageElement.classList.add("show");
  document.body.appendChild(imageElement);
}

function AddGif04() {
  var imageElement = document.createElement("img");
  imageElement.src = "./img/07_etc/qoo.gif";
  imageElement.classList.add("ImgSize10");
  imageElement.classList.add("show");
  imageElement.style.top = "700px";
  imageElement.style.left = "360px";
  document.body.appendChild(imageElement);
}

function AddGif04_1() {
  var imageElement = document.createElement("img");
  imageElement.src = "./img/07_etc/qoo.gif";
  imageElement.classList.add("ImgSize10");
  imageElement.classList.add("show");
  imageElement.style.top = "700px";
  imageElement.style.left = "820px";
  document.body.appendChild(imageElement);
}

function AddGif05() {
  var imageElement = document.createElement("img");
  imageElement.src = "./img/07_etc/yell-orange.gif";
  imageElement.classList.add("ImgSize20");
  imageElement.classList.add("show");
  document.body.appendChild(imageElement);
}

const ImgSrcSphere = [
  "./img/08_sphere/Sphere01.png",
  "./img/08_sphere/Sphere02.png",
  "./img/08_sphere/Sphere03.png",
  "./img/08_sphere/Sphere04.png",
  "./img/08_sphere/Sphere05.png",
  "./img/08_sphere/Sphere06.png",
  "./img/08_sphere/Sphere07.png",
];

function ShowSphere24() {
  for (let i = 0; i < ImgSrcSphere.length; i++) {
    setTimeout(function () {
      var RandomX = getRandomPosition(0, WindowWidth);
      var RandomY = getRandomPosition(0, WindowHeight);

      imageElement = document.createElement("img");
      imageElement.src = ImgSrcSphere[i];
      imageElement.classList.add("ImgSize10");
      document.body.appendChild(imageElement);
      // 이미지 위치 설정
      imageElement.style.left = RandomX + "px";
      imageElement.style.top = RandomY + "px";
    }, 100000);
  }
}

function Ending() {
  var imageElement = document.querySelector(".caption02");
  imageElement.style.display = "block";
}
