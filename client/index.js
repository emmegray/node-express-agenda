document.addEventListener('DOMContentLoaded', function(){
  loadAllTable();
  loadHTMLTable([]);

  /* DOM loaded */
  const addBtn = document.querySelector('#add-name-btn');

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
  // let tableHtml = "";

  if (data.length === 0){
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
  } else {
    data.forEach(element => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${element.id}</td><td>${element.name}</td><td>${element.date_added}</td>`
      table.appendChild(row);
    });
  }
}