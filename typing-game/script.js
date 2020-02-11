const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of Words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// Init word
let randomWord;

// Init Score
let score = 0;

// Init Time
let time = 10;

// focus on text on start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// Set difficulty to value in local storage or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// get random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// console.log(getRandomWord());

// add word to DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update Score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

// game over, show end screen
function gameOver() {
  endGameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Play Again?</button>
  `;

  endGameEl.style.display = 'flex';
}

addWordToDom();

// Event Listeners

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  //   console.log(insertedText);

  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();
    // Clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 1;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  //   console.log(difficulty);
  localStorage.setItem('difficulty', difficulty);
});
