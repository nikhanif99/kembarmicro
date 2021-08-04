const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());

var connect = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "bd654de4d40d99",
  password: "9a7d78f4",
  database: "heroku_950ce46ea6e24b7"
});

app.get('/', (req, res) => {

  connect.getConnection(function (err, connection) {
    if (err) { res.send('Error Database Connection'); }
    else {
      var sql = "SELECT * FROM client";
      connect.query(sql, function (err, result) {
        if (err) { throw err; }
        else {
          res.send(result);
        }
        connection.release();
      });
    }
  });
});
 var port=4005;
app.listen(process.env.PORT || port, () => {
  console.log('Example app listening to port 4005');
});