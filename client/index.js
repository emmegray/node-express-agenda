document.addEventListener('DOMContentLoaded', function(){
  loadAllTable();
  loadHTMLTable([]);

 /* DOM loaded */
const addBtn = document.querySelector('#add-name-btn');

document.querySelector('table tbody').addEventListener('click', function(event) {
  if(event.target.className === "delete-row-btn") {
    deleteRowById(event.target.dataset.id);
  }
});

function deleteRowById(id) {
  fetch('http://localhost:5000/delete/' + id, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => console.log(data));
}

  addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');

    const name = nameInput.value;
    nameInput.value = "";

    fetch('http://localhost:5000/insert', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name : name })
    })
      .then(response => response.json())
      .then(data => insertRowIntoTable(data['data']));
  }
});

function loadAllTable() {
  fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function insertRowIntoTable(data) {
  loadAllTable();
}

function loadHTMLTable(data){
  const table = document.querySelector('table tbody');
  table.querySelectorAll("tr").forEach(element => element.remove());

  if (data.length === 0){
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
  } else {
    data.forEach(element => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.date_added}</td>
      <td><button class="delete-row-btn btn-danger" data-id=${element.id}>Delete</td>
      <td><button class="edit-row-btn btn-primary" data-id=${element.id}>Edit</td>`
      table.appendChild(row);
    });
  }
}