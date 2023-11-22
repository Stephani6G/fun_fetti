let durationInSeconds;
let timerInterval;
let isPaused = false;

function startTimer() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  if (!timerInterval || isPaused) {
    durationInSeconds = hours * 3600 + minutes * 60 + seconds;
    displayTimeLeft(durationInSeconds);
    timerInterval = setInterval(updateTimer, 1000);
    isPaused = false;
  } else {
    alert('Timer is already running.');
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isPaused = true;
}

function updateTimer() {
  durationInSeconds--;
  if (durationInSeconds < 0) {
    clearInterval(timerInterval);
    document.getElementById('timer').innerHTML = 'Timer expired!';
  } else {
    displayTimeLeft(durationInSeconds);
  }
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 3600);
  let remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  remainingSeconds %= 60;

  const displayHours = hours < 10 ? '0' + hours : hours;
  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  const displaySeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  const display = `${displayHours}:${displayMinutes}:${displaySeconds}`;
  document.getElementById('timer').innerHTML = display;
}
