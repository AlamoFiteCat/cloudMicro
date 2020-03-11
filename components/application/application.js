// Data
let url = 'http://localhost:44342/api/ApplicationAsync/';
let token = localStorage.getItem('token');
// Selectors
let appBody = document.querySelector('#application-body');
// Functions
const render = (data) => {
    let inner = '';
    data.forEach(app => {
        inner +=
        `
        <tr>
            <td>${app.id}</td>
            <td>${app.applicationNumber}</td>
            <td>${app.clientContact.value}</td>
            <td>${app.applicationDate}</td>
            <td>${app.status.value}</td>
            <td>${app.requestedAmount}</td>
            <td>${app.requestedInstallments}</td>
        </tr>
        `
    });
    appBody.innerHTML = inner;
}

const getApplications = async () => {
    let opt = {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json-patch+json',
           'Authorization': `Bearer ${token}`
         }
     }
     let response = await fetch(url, opt);
     let result = await response.json();
     render(result);
}
// Init

getApplications();