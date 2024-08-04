let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dev',
  password : 'devmaster!!',
  database : 'project_manager',
  multipleStatements: true
});
connection.connect()
module.exports = connection