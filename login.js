// Selectors
const baseurl = 'http://localhost:44342/api';
// For the swapping effect
const signUpBtn = document.querySelector('#signUp');
const signInBtn = document.querySelector('#signIn');
const container = document.querySelector('#container');

// Inputs
const emailInput = document.querySelector('#email-sign-in');
const passwordInput = document.querySelector('#password-sign-in');
const signInputBtn = document.querySelector('#sign-in-btn');

// Functions

// Event Listeners

signUpBtn.addEventListener('click', function() {
  container.classList.add('right-panel-active');
});

signInBtn.addEventListener('click', function() {
  container.classList.remove('right-panel-active');
});

let login = async creds => {
  let url = `${baseurl}/Token/`;
  let opt = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json-patch+json'
    },
    body: JSON.stringify(creds)
  };
  let response = await fetch(url, opt);
  let result = await response.json();
  if (result.token) {
    // Fill Local Storage with basic data
    localStorage.setItem('token', result.token);
    localStorage.setItem('baseurl', baseurl);
    window.location = 'index.html';
  } else {
    alert(`Nope. Sorry. :( `);
  }
};

signInputBtn.addEventListener('click', function(e) {
  e.preventDefault();
  // Get the value here
  let loginCreds = {
    username: emailInput.value,
    password: passwordInput.value
  };
  login(loginCreds);
});

// 
// 