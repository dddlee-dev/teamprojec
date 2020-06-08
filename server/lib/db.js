var mysql = require('mysql');


var db_option = {
  //host     : 'dddlee1234.iptime.org',
  host     : '14.43.214.113',
  user     : 'team',
  password : '111111' ,
  //port     : '7569' , 
  database : 'shopping_mall',
  multipleStatements: true
}


var db = mysql.createConnection(db_option
);
db.connect();




module.exports = {db, db_option };
