// Data
let baseurl = localStorage.getItem('baseurl');
let url = `${baseurl}/CityAsync/`;
let token = localStorage.getItem('token');
let cities = [];

// Selectors
let cityBody = document.querySelector('#city-body');
let saveBtn = document.querySelector('#city-modal-save');
let updateBtn = document.querySelector('#city-modal-update');
let cityNameInput = document.querySelector('#new-city-input');
let citySearchInput = document.querySelector('#city-search');

// Functions
const saveCity = async () => {
  let returnMessage;
  let Name = cityNameInput.value;
  if (!Name) {
    returnMessage = `Invalid Entry!`;
  } else {
    let cityObj = { name: Name };
    let opt = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(cityObj)
    };
    let response = await fetch(url, opt);
    let result = await response.json();
    console.log(result);
    returnMessage = 'Succesful Operation!';
    getCities();
  }
  console.log(returnMessage);
};

const render = data => {
  let inner = '';
  data.forEach(city => {
    let { id, name } = city;
    inner += `
      <tr>
         <td>${name}</td>
         <td><button class="btn btn-outline-danger" id="delb-${id}">
         <i class="fa fa-window-close" id="deli-${id}"></i>
         </button></td>
         <td><button class="btn btn-success" data-toggle="modal" data-target="#cityModal" id="upb-${id}">
         <i class="fa fa-pencil-square-o" id="upi-${id}"></i>
         </button></td>
      </tr>
      `;
  });
  cityBody.innerHTML = inner;
};

const getCities = async () => {
  let opt = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  };
  let response = await fetch(url, opt);
  cities = await response.json();
  render(cities);
};

const filterCities = (data, input) => {
  let filtered = data.filter(city =>
    city.name.toLowerCase().includes(input.toLowerCase())
  );
  render(filtered);
};

const deleteCity = async id => {
  let opt = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  };
  await fetch(`${url}${id}`, opt);
  getCities();
};

const updateCity = async id => {
  let returnMessage;
  let Name = cityNameInput.value;
  if (!Name) {
    returnMessage = `Invalid Entry!`;
  } else {
    let cityObj = { id: id, name: Name };
    let opt = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(cityObj)
    };
    await fetch(`${url}${id}`, opt);
    returnMessage = 'Succesful Operation!';
    getCities();
  }
  console.log(returnMessage);
};

// Event Listeners
saveBtn.addEventListener('click', saveCity);

citySearchInput.addEventListener('keyup', function() {
  let input = citySearchInput.value;
  filterCities(cities, input);
});

cityBody.addEventListener('click', function(e) {
  let action = e.target.id;
  let uID = action.split('-')[1];

  if (action.startsWith('del')) {
    if (confirm('Are you sure?')) {
      deleteCity(uID);
    }
  } else {
    cities.forEach(city => {
      if (city.id === parseInt(uID)) {
        cityNameInput.value = city.name;
        saveBtn.classList.add('d-none');
        updateBtn.classList.remove('d-none');
        document.querySelector('#city-id').value = uID;
      }
    });
  }
});

updateBtn.addEventListener('click', function(e) {
  e.preventDefault();
  let putId = document.querySelector('#city-id').value;
  updateCity(putId);
});

document.querySelector('#new-city').addEventListener('click', function(e) {
  e.preventDefault();
  updateBtn.classList.add('d-none');
  saveBtn.classList.remove('d-none');
  cityNameInput.value = '';
});

// Init
getCities();
