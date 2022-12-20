const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
})

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  // console.log('db' + connection.state);
});

module.exports = {
  getAllData: function () {
    try {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM names";
  
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        })
      });
  
    } catch (error) {
      console.log(error);
    }
  },
  
  insertNewName: function (name) {
    try {
      const dateAdded = new Date();
      return new Promise((resolve,reject) => {
        const query = "INSERT INTO names (name, date_added) VALUES (?,?);";
  
        connection.query(query, [name, dateAdded], (err, result) => {
          if (err) reject(new Error(err.message));
          console.log(result.insertId);
          resolve(result.insertId);
        })
      });
    } catch (err) {
      console.log(err);
    }
  }
};