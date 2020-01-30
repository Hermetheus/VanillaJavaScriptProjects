const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show Input Error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show Success Outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check if email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Get field name
function getFieldName(input) {
  //   console.log(input);
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    // console.log(input);
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less then ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//check passwords match

function checkPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPassword(password, password2);
});

/* 
  if (username.value === '') {
    // alert('userName is required');
    showError(username, 'Username is required');
  } else {
    showSuccess(username);
  }
  if (email.value === '') {
    // alert('userName is required');
    showError(email, 'Email is required');
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Email is not valid');
  } else {
    showSuccess(email);
  }
  if (password.value === '') {
    // alert('userName is required');
    showError(password, 'Password is required');
  } else {
    showSuccess(password);
  }
  if (password2.value === '') {
    // alert('userName is required');
    showError(password2, 'Confirm Password');
  } else {
    showSuccess(password2);
  }
  console.log(username.value);
  */
