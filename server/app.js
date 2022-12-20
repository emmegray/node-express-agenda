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

  const result = db.insertNewName(name);

  result
    .then(data => res.json({ success: true, data }))
    .catch(err => console.log(err));
})

// READ
app.get('/getAll', (req,res) => {

  const result = db.getAllData();

  result
  .then(data => res.json({data : data}))
  .catch(err => console.log(err));
  
})

// UPDATE

// DELETE
app.delete('/delete/:id', (req,res) => {
  const { id } = req.params;
  const result = db.deleteRowById(id)

  result
    .then(data => res.json({ success: true }))
    .catch(err => console.log(err));

})

app.listen(process.env.PORT, () => console.log('App is running'));