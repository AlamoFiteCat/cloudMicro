// Helper Variables
let baseurl = localStorage.getItem('baseurl');
let url = `${baseurl}/ContactAsync/`;
let data = [];
let token = localStorage.getItem('token');
// Selectors
let contactBody = document.querySelector('#contact-body');

let contactSearchSelect = document.querySelector('#contact-search-select');
let contactSearchInput = document.querySelector('#contact-search-input');
let cityOptionsSelect = document.querySelector('#city-select');

let newContactBtn = document.querySelector('#new-contact-btn');
let saveContactBtn = document.querySelector('#save-contact-btn');

// [Input Selectors] //


//Functions
const render = data => {
  let tableInner = '';
  data.forEach(contact => {
    tableInner += `
      <tr>
         <td>${contact.id}</td>
         <td>${contact.name} ${contact.surname}</td>
         <td>${contact.uid}</td>
         <td>${contact.idcardNumber}</td>
         <td>${contact.email}</td>
      </tr>
      `;
  });
  contactBody.innerHTML = tableInner;
};

const getContacts = async () => {
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

const filterContacts = (input, type) => {
  let filtered = [];
  switch (type) {
    case 'name':
      filtered = data.filter(contact => {
        let { name, surname } = contact;
        let fullName = `${name} ${surname}`;
        if (fullName.toLowerCase().includes(input.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      break;
    case 'uid':
      filtered = data.filter(contact => contact.uid.includes(input));
      break;
    case 'email':
      filtered = data.filter(contact =>
        contact.email.toLowerCase().includes(input.toLowerCase())
      );
  }
  render(filtered);
};

// [Testing] //
const getInputValue = () => {
  let inputForm = document.querySelector('.modal-body');
  let inputFields = inputForm.children;
  let inputFieldsArray = [...inputFields];

  let finalObj = {};

  inputFieldsArray.forEach(field => {
    let {value} = field;
    let id = field.id;
    let objType = field.type;
    let obj = {}
    obj[id] = value;
    finalObj = Object.assign(finalObj, obj);
  })
  console.log(finalObj);
}


// Event Listeners
contactSearchInput.addEventListener('keyup', function() {
  let type = contactSearchSelect.value;
  let input = contactSearchInput.value;
  filterContacts(input, type);
});

newContactBtn.addEventListener('click', function(){
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
})

saveContactBtn.addEventListener('click', getInputValue);


// Init
getContacts();



// testing

