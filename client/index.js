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
      .then(data => loadAllTable());
  }
});

function loadAllTable() {
  fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function loadSearchTable() {
  const searchValue = document.querySelector("#search-input").value;

  fetch('http://localhost:5000/search', {
    headers: {
      'Content-type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ search: searchValue })
  })
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function deleteRowById(id) {
  fetch('http://localhost:5000/delete/' + id, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    loadAllTable();
  });
}

function editRowById(id) {
  const input = prompt("New text?");

  fetch('http://localhost:5000/put/' + id, {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({ name: input })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    loadAllTable();
  });
}

function loadHTMLTable(data){
  const table = document.querySelector('table tbody');
  table.querySelectorAll("tr").forEach(element => element.remove());

  if (data.length === 0){
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
  } else {
    data.forEach(element => {
      const row = document.createElement("tr");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-row-btn btn-danger";
      deleteButton.onclick = () => deleteRowById(element.id);

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "delete-row-btn btn-primary";
      editButton.onclick = () => editRowById(element.id);

      const date = new Date(element.date_added);
      // const dataLocale = date.toLocaleDateString();

      row.innerHTML = `
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${date.getDay()}/${date.getMonth()}/${date.getFullYear()}</td>
        <td class="delete"></td>
        <td class="edit"></td>`;

      row.querySelector("td.delete").appendChild(deleteButton);
      row.querySelector("td.edit").appendChild(editButton);
    
      table.appendChild(row);
    });
  }
}