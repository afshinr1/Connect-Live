var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kuraikami",
  database : 'nodejs'
});

con.connect((err)=> {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;