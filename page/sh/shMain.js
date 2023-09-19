let indexNow = 0;

const imageSets = document.querySelectorAll('.image-set');
const imageButtons = document.querySelectorAll('.image-button');

let dum = null;
let keyupListener = null;

function selectImage(index) {

  imageSets.forEach(set => {
    set.style.display = 'none';
  });

  imageButtons.forEach(button => {
    button.classList.add('disabled');
    button.classList.remove('active');
  });

  imageSets[index].style.display = 'block';
  imageButtons[index].classList.add('active');
  imageButtons[index].classList.remove('disabled');


  indexNow = index;
  performAdditionalActions(indexNow);
}

document.querySelectorAll('.image-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    selectImage(index);
  });
});

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}

function shakeImage(image) {
  image.classList.add('shake');

  image.addEventListener('animationend', () => {
    image.classList.remove('shake');
  });
}

function toggleKeyboardActive(keyboard, isActive) {
  if (isActive) {
    keyboard.classList.add('active');
  } else {
    keyboard.classList.remove('active');
  }
}

function performAdditionalActions(index) {
  switch (index) {
    case 0:
      action(0);
      break;
    case 1:
      action(1);
      break;
    case 2:
      action(2);
      break;
    case 3:
      action(3);
      break;
    case 4:
      action(4);
      break;
    case 5:
      action(5);
      break;
  }
}

function action(index) {
  const selectedSet = imageSets[index];
  const audioElements = selectedSet.querySelectorAll('audio');
  const imageElements = selectedSet.querySelectorAll('img');
  const keyboards = document.querySelectorAll('.keyboard-key');

  // 이전 이벤트 리스너 제거
  if (dum) {
    document.removeEventListener('keydown', dum);
  }
  if (keyupListener) {
    document.removeEventListener('keyup', keyupListener);
  }

  dum = function (event) {
    const key = event.key;
    audioElements.forEach((audio, index) => {
      const dataIndex = audio.getAttribute('data-index');
      if (dataIndex === key) {
        playAudio(audio);
        toggleKeyboardActive(keyboards[index], true);
      }
    });

    imageElements.forEach((img) => {
      const dataIndex = img.getAttribute('data-index');
      if (dataIndex === key) {
        shakeImage(img);
      }
    });
  };

  keyupListener = function (event) {
    const key = event.key;
    audioElements.forEach((audio, index) => {
      const dataIndex = audio.getAttribute('data-index');
      if (dataIndex === key) {
        toggleKeyboardActive(keyboards[index], false);
      }
    });
  };

  document.addEventListener('keydown', dum);
  document.addEventListener('keyup', keyupListener);

  function imageClickHandler(index) {
    playAudio(audioElements[index]);
    shakeImage(imageElements[index]);
    toggleKeyboardActive(keyboards[index], true);

    imageElements[index].addEventListener('animationend', () => {
      toggleKeyboardActive(keyboards[index], false);
    });
  }

  imageElements.forEach((image, index) => {
    image.addEventListener('click', () => {
      imageClickHandler(index);
    });
  });
}


window.addEventListener('load', function() {
  alert("드럼머신이 준비되었습니다! 자판이 영어로 설정되어 있는지 확인해주세요 :)");
  var overlay = document.querySelector('.overlay');
  overlay.style.display = 'none';
  selectImage(0);
  const modalButton = document.querySelector('.modal-button');
  const dialog = document.querySelector('.modal')

  modalButton.addEventListener('click', () => {
  dialog.showModal();
});
});



// 환준이형 코드
//audio import
let audio = document.getElementById("myAudio");

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
  progressBarFill.style.width = progress + "%";
  currentSeconds = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
  console.log(currentSeconds);
  if(currentSeconds <= 39) {
    selectImage(0);
  } 
  if(currentSeconds > 39 && currentSeconds <= 73 ) {
    selectImage(1);
  }
  if(currentSeconds > 73 && currentSeconds <= 103 ) {
    selectImage(2);
  }
  if(currentSeconds > 103 && currentSeconds <= 143 ) {
    selectImage(3);
  }
  if(currentSeconds > 143 && currentSeconds <= 172 ) {
    selectImage(4);
  }
  if(currentSeconds > 172 && currentSeconds <= 207 ) {
    selectImage(5);
  }
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