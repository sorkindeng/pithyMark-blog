var mysql = require('../service/mysql');

// 注册用户
let insertUser = function( value ) {
  let _sql = "insert into users(name,pass) values(?,?);"
  return mysql.query( _sql, value )
}

let findUserByName = function( name ) {
  let _sql = `select * from users where name="${name}";`
  return mysql.query( _sql )
}

module.exports={
  insertUser,
  findUserByName
}
  