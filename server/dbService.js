const mysql = require('mysql');
const dotenv = require('dotenv');
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

  searchName: function (search) {
    try {
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM names WHERE name LIKE '%${search}%'`;
  
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
  },

  editNameById: function (id, text) {
    try {
      id = parseInt(id, 10);
      return new Promise((resolve,reject) => {
        let query = `UPDATE names
           SET name = ?
           WHERE id = ?`;

        let data = [text, id];
  
        connection.query(query, data, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        })
      });
    } catch (err){
      console.log(err);
    }
  },

  deleteRowById: function (id) {
    try{
      id = parseInt(id, 10);
      return new Promise((resolve,rejecet) => {
        const query = "DELETE FROM names WHERE id = ?";
  
        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        })
      });
    } catch (err){
      console.log(err);
    }
  }

};