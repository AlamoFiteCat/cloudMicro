// Data
let baseurl = localStorage.getItem('baseurl');
let url = `${baseurl}/OfficeAsync/`;
let token = localStorage.getItem('token');

let data = [];

// Selectors
let officeBody = document.querySelector('#office-body');
let officeInput = document.querySelector('#office-name-input');
let cityOptionsSelect = document.querySelector('#city-options');
let newOfficeBtn = document.querySelector('#new-office-btn');
let officeSaveBtn = document.querySelector('#save-office');
let officeSearchInput = document.querySelector('#office-search');
let officeUpdateBtn = document.querySelector('#update-office');

// Functions
let render = data => {
  let inner = '';
  data.forEach(office => {
    let { id, name, city } = office;
    inner += `
    <tr class="">
    <td class="">${name}</td>
    <td class="">${city.value}</td>
    <td><button class="btn btn-outline-danger" id="delb-${id}">
        <i class="fa fa-window-close" id="deli-${id}"></i>
    </button></td>
    <td><button
        class="btn btn-success"
        data-toggle="modal"
        data-target="#officeModal"
        id="upb-${id}">
        <i class="fa fa-pencil-square-o" id="upi-${id}"></i>
      </button></td>
  </tr>
  
      `;
  });
  officeBody.innerHTML = inner;
};

const getOffices = async () => {
  let opt = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  };
  let response = await fetch(url, opt);
  data = await response.json();
  render(data);
};

const saveOffice = async (office, cityStr) => {
  let br = cityStr.indexOf(':');
  let cityID = cityStr.substring(0, br);
  let cityName = cityStr.substring(br + 1, cityStr.length);
  let officeObj = {
    city: { id: parseInt(cityID), value: cityName },
    name: office
  };
  let opt = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(officeObj)
  };
  let response = await fetch(url, opt);
  let result = await response.json();
  getOffices();
};

const deleteOffice = async id => {
  let opt = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  };
  await fetch(`${url}${id}`, opt);
  getOffices();
};

const filterOffices = input => {
  let filtered = data.filter(office =>
    office.name.toLowerCase().includes(input.toLowerCase())
  );
  render(filtered);
};

const optionFill = () => {
  let local = localStorage.getItem('cities');
  let cities = JSON.parse(local);
  let inner = '';
  cities.forEach(city => {
    let { id, name } = city;
    inner += `
    <option value="${id}:${name}">${name}</option>
    `;
  });
  cityOptionsSelect.innerHTML = inner;
};

const updateOffice = async pid => {
  let city = cityOptionsSelect.value.split(':');
  let cityID = city[0];
  let cityName = city[1];
  let office = officeInput.value;
  let officeObj = {
    city: { id: cityID, value: cityName },
    name: office,
    id: pid
  };
  let opt = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(officeObj)
  };
  await fetch(`${url}${pid}`, opt);
  getOffices();
};

// Event Listeners
officeUpdateBtn.addEventListener('click', function(e) {
  e.preventDefault();
  let id = document.querySelector('#office-id').value;
  updateOffice(id);
});

officeSaveBtn.addEventListener('click', function() {
  let office = officeInput.value;
  let city = cityOptionsSelect.value;
  if (office) {
    saveOffice(office, city);
  }
});

newOfficeBtn.addEventListener('click', function() {
  optionFill();
});

officeBody.addEventListener('click', function(e) {
  let action = e.target.id;
  let uID = action.split('-')[1];

  if (action.startsWith('del')) {
    if (confirm('Are you sure?')) {
      deleteOffice(uID);
    }
  } else {
    data.forEach(office => {
      if (office.id === parseInt(uID)) {
        document.querySelector('#office-id').value = office.id;
        officeInput.value = office.name;
        optionFill();
      }
    });
  }
});

officeSearchInput.addEventListener('keyup', function() {
  let input = officeSearchInput.value;
  filterOffices(input);
});

// Init

getOffices();
