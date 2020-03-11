let baseurl = localStorage.getItem('baseurl');
let token = localStorage.getItem('token');

(async function getRegisters() {
  let opt = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  };
  // Cities
  let ctResp = await fetch(`${baseurl}/CityAsync/`, opt);
  let ctResl = await ctResp.json();
  localStorage.setItem('cities', JSON.stringify(ctResl));
  // Offices
  let ofResp = await fetch(`${baseurl}/OfficeAsync/`, opt);
  let ofResl = await ofResp.json();
  localStorage.setItem('offices', JSON.stringify(ofResl));
  // Contacts
  let conResp = await fetch(`${baseurl}/ContactAsync/`, opt);
  let conResl = await conResp.json();
  localStorage.setItem('contacts', JSON.stringify(conResl));
})();
