const currencyEle_one = document.getElementById('currency-one');
const currencyEle_two = document.getElementById('currency-two');
const amountEle_one = document.getElementById('amount-one');
const amountEle_two = document.getElementById('amount-two');

const rateEle = document.getElementById('rate');
const swap = document.getElementById('swap');

// !!Fetch Exchange Rates and Update the DOM
function calculate() {
  const currency_one = currencyEle_one.value;
  const currency_two = currencyEle_two.value;

  localStorage.setItem('selectedCurrencyOne', JSON.stringify(currency_one));
  localStorage.setItem('selectedCurrencyTwo', JSON.stringify(currency_two));

  //   console.log(currency_one, currency_two);

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.rates[currency_two];

      //   console.log(rate);

      rateEle.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEle_two.value = (amountEle_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyEle_one.addEventListener('change', calculate);
currencyEle_two.addEventListener('change', calculate);
amountEle_one.addEventListener('input', calculate);
amountEle_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEle_one.value;
  currencyEle_one.value = currencyEle_two.value;
  currencyEle_two.value = temp;
  calculate();
});

calculate();
