const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');

const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');

let lastHour,
  lastMin,
  lastSec,
  isPaused = false;

startBtn.addEventListener('click', () => {
  if (hour.value == 0 && minute.value == 0 && second.value == 0) return;

  startBtn.style.display = 'none';
  pauseBtn.style.display = 'initial';

  if (second.value >= 60) {
    minute.value++;
    second.value -= 60;
  }
  if (minute.value >= 60) {
    hour.value++;
    minute.value -= 60;
  }

  if (!isPaused) {
    if (minute.value)
      minute.value = `${minute.value <= 10 ? '0' : ''}${minute.value}`;
    if (hour.value) hour.value = `${hour.value <= 10 ? '0' : ''}${hour.value}`;
    if (second.value)
      second.value = `${second.value <= 10 ? '0' : ''}${second.value}`;
  }

  //start decrementing time
  function countDown() {
    loop = setInterval(() => {
      timer();
    }, 1000);
  }

  countDown();
});

function timer() {
  if (hour.value == 0 && minute.value == 0 && second.value == 0) {
    hour.value = '';
    minute.value = '';
    second.value = '';

    isPaused = false;

    startBtn.style.display = 'initial';
    pauseBtn.style.display = 'none';

    clearInterval(loop);
  }

  if (second.value > 0)
    second.value = `${second.value <= 10 ? '0' : ''}${second.value - 1}`;
  else if (minute.value > 0 && second.value == 0) {
    minute.value = `${minute.value <= 10 ? '0' : ''}${minute.value - 1}`;
    second.value = 59;
  } else if (hour.value > 0 && minute.value == 0 && second.value == 0) {
    hour.value = `${hour.value <= 10 ? '0' : ''}${hour.value - 1}`;
    minute.value = 59;
    second.value = 59;
  }
}

resetBtn.addEventListener('click', () => {
  startBtn.style.display = 'initial';
  pauseBtn.style.display = 'none';

  hour.value = '';
  minute.value = '';
  second.value = '';

  isPaused = false;
  startBtn.innerHTML = 'Start';

  clearInterval(loop);
});

pauseBtn.addEventListener('click', () => {
  lastHour = hour.value;
  lastMin = minute.value;
  lastSec = second.value;

  isPaused = true;

  console.log(lastHour + ' ' + lastMin + ' ' + lastSec);
  startBtn.style.display = 'initial';
  startBtn.innerHTML = 'Resume';
  pauseBtn.style.display = 'none';

  clearInterval(loop);
});
