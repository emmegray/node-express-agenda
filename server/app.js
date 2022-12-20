const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require ('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// CREATE
app.post('/insert', (req,res) => {

})
// READ
app.get('/getAll', (req,res) => {
  res.json({
    success: true
  });
})

// UPDATE

// DELETE

app.listen(process.env.PORT, () => console.log('App is running'));