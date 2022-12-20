const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require ('dotenv');
dotenv.config();

const db = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// CREATE
app.post('/insert', (req, res) => {
  const { name } = req.body;
  db.insertNewName(name)
    .then(data => resSuccess(data, res))
    .catch(err => resError(err, res));
})

// READ
app.get('/getAll', (req, res) => {
  db.getAllData()
    .then(data => resSuccess(data, res))
    .catch(err => resError(err, res));
})

// SEARCH
app.post('/search', (req, res) => {
  const { search } = req.body;
  db.searchName(search)
    .then(data => resSuccess(data, res))
    .catch(err => resError(err, res));
})

// UPDATE
app.put('/put/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  console.log(req.body);

  console.log({ id, name });

  db.editNameById(id, name)
    .then(data => resSuccess(data, res))
    .catch(err => resError(err, res));
});


// DELETE
app.delete('/delete/:id', (req,res) => {
  const { id } = req.params;
  db.deleteRowById(id)
    .then(data => resSuccess(data, res))
    .catch(err => resError(err, res));
})

function resSuccess(data, res) {
  //console.log(data)
  res.status(200).json({ success: true, data });
} 

function resError(error, res) {
  console.error(error);
  res.status(500).json(error);
}

app.listen(process.env.PORT, () => console.log('App is running'));