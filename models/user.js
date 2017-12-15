var mysql = require('../service/mysql');
var md5 = require('md5');


//验证创始人密码
let findFounderPassword = function( password ) {
  let _sql = `SELECT * FROM pmb_options_sys WHERE optkey="founder_pass";`
  return mysql.query( _sql )
}

//修改创始人密码
let updateFounderPassword = function( value ) {
  let _sql = `UPDATE pmb_options_sys SET optvalue=? WHERE optkey="founder_pass";`
  return mysql.query( _sql, value)
}

module.exports={
  findFounderPassword,
  updateFounderPassword
}
  