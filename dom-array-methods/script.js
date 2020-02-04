const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortByRichestBtn = document.getElementById('sort-by-richest');
const sortByPoorestBtn = document.getElementById('sort-by-poorest');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const removeUserBtn = document.getElementById('remove-user');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  console.log(data);

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  console.log(newUser);

  addData(newUser);
}

// Double Money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
}

// Sort Users

function sortRichestUsers() {
  data.sort((a, b) => b.money - a.money);

  updateDom();
}
function sortPoorestUsers() {
  data.sort((a, b) => {
    return a.money - b.money;
  });

  updateDom();
}

function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDom();
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  console.log(formatMoney(wealth));

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

function removeUser() {
  data.pop();

  updateDom();
}

// Add new object to Array

function addData(obj) {
  data.push(obj);

  updateDom();
}

function updateDom(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    // console.log(item);
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortByRichestBtn.addEventListener('click', sortRichestUsers);
sortByPoorestBtn.addEventListener('click', sortPoorestUsers);
showMillionaireBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
removeUserBtn.addEventListener('click', removeUser);
