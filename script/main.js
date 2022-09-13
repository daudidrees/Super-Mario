const speed = 10
let currentLeft = 0
let currentBottom = 25;
let jump = 50 + 20;
const mario = document.querySelector('.mario-icon');
const Eltimer = document.querySelector('.timer');
const dateTime = document.querySelector('.date-time');
const startBtn = document.querySelector('.startBtn');
const modal = document.querySelector('.Modal');
const overlay = document.querySelector('.overlay');
const quitBtn = document.querySelector('.quitBtn');
const obstacle = document.querySelector('.obstacle');

//Collision
let boxCollider1;
let boxCollider2;

let boxWidth = obstacle.getBoundingClientRect().width;
let boxHeight = obstacle.getBoundingClientRect().height;
let marioWidth = mario.getBoundingClientRect().width;
let marioHeight = mario.getBoundingClientRect().height;

//End Game
const endGame = function () {
  startBtn.textContent = 'Try Again';
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  mario.style.transform = `scaleX(1)`;
  mario.style.display = 'none';
  setTimeout(() => {
    mario.style.display = 'block';
  }, 100);
  setTimeout(() => {
    mario.style.display = 'none';
  }, 200);
  setTimeout(() => {
    mario.style.display = 'block';
  }, 300);
  setTimeout(() => {
    mario.style.display = 'none';
  }, 400);
  setTimeout(() => {
    mario.style.display = 'block';
  }, 500);
  setTimeout(() => {
    mario.style.display = 'none';
  }, 600);
  setTimeout(() => {
    mario.style.display = 'block';
  }, 700);
  setTimeout(() => {
    mario.style.display = 'none';
  }, 800);
  setTimeout(() => {
    mario.style.display = 'block';
  }, 900);
  currentLeft = 0
  mario.style.left = `0px`;
  mario.style.transform = `scaleX(1)`;
  mario.style.display = 'none';
}
//Hidding out Mario Character
mario.style.display = 'none';

//key Movement
const keyMovement = function () {
  mario.style.left = '0px'
  // currentLeft = 0;
  document.addEventListener('keydown', ({ key }) => {
    switch (key) {
      case 'ArrowRight':
        currentLeft += 10;
        mario.style.left = currentLeft + 'px';
        mario.style.transform = `scaleX(1)`;
        break;
      case 'ArrowUp':
        mario.style.bottom = currentBottom + jump + 'px';
        setTimeout(() => {
          mario.style.bottom = 40 + 'px';
        }, 300);
        break;
      case 'ArrowLeft':
        currentLeft -= speed
        mario.style.left = currentLeft + 'px';
        mario.style.transform = `scaleX(-1)`;
        break;
      default:
        break;
    }

    boxCollider1 = {
      x: obstacle.offsetLeft - obstacle.scrollLeft,
      y: obstacle.offsetTop - obstacle.scrollTop,
      width: boxWidth,
      height: boxHeight
    }

    boxCollider2 = {
      x: mario.offsetLeft - mario.scrollLeft,
      y: mario.offsetTop - mario.scrollTop,
      width: marioWidth,
      height: marioHeight
    }

    if (boxCollider1.x > boxCollider2.x + boxCollider2.width ||
      boxCollider1.x + boxCollider1.width < boxCollider2.x ||
      boxCollider1.y > boxCollider2.y + boxCollider2.height ||
      boxCollider1.y + boxCollider1.height < boxCollider2.y) {
      return;
    } else {
      endGame();
    }

  });

  // Speed Key
  document.addEventListener('keydown', (key) => {
    if (key.shiftKey && key.key == 'ArrowRight') {
      currentLeft += 12;
      mario.style.left = currentLeft + 'px';
      mario.style.transform = `scaleX(1)`;
    }

    if (key.shiftKey && key.key == 'ArrowLeft') {
      currentLeft -= 12;
      mario.style.left = currentLeft + 'px';
      mario.style.transform = `scaleX(-1)`;
    }

    if (key.ctrlKey) {
      if (key.key == 'ArrowRight') {
        currentLeft += 70;
        mario.style.transform = `scaleX(1)`;
      }
      else if (key.key == 'ArrowLeft') {
        currentLeft -= 70;
        mario.style.transform = `scaleX(-1)`;
      }
      mario.style.bottom = currentBottom + 100 + 'px';
      mario.style.left = currentLeft + 'px';
      setTimeout(() => {
        mario.style.bottom = 40 + 'px';
      }, 300);
    }
  });
}

//Game End Timer
const timer = function () {
  let time = 600;

  const ELinterval = () => {
    const min = Math.trunc(time / 60).toString().padStart(2, '0');
    const sec = Math.trunc(time % 60).toString().padStart(2, '0');
    Eltimer.textContent = `${min} : ${sec}`;
    if (time === 0) {
      clearInterval(tick);
      //Update UI
      endGame();
    }
    time--
  };

  ELinterval();
  const tick = setInterval(ELinterval, 1000);
  return tick;
}

// Date Intialation
const now = new Date();
const option = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long'
}
const locale = navigator.language;

//Modal
modal.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('startBtn')) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');

    //Timer Insertion
    timer();

    //Update Date
    dateTime.textContent = new Intl.DateTimeFormat(locale, option).format(now);
    //Activating Mario
    mario.style.display = 'block';
    //key movement
    keyMovement();
  };

  if (e.target.classList.contains('quitBtn')) {
    window.close();
  }
});