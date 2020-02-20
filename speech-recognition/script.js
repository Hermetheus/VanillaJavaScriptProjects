const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start Recognition
recognition.start();

function onSpeak(e) {
  console.log(e);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak Result
recognition.addEventListener('result', onSpeak);
