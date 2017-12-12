var mysql = require('../service/mysql');
var md5 = require('md5');


//验证创世人密码
let findFounderPassword = function( password ) {
  let _sql = `SELECT * FROM pmb_options_sys WHERE optkey="founder_pass";`
  return mysql.query( _sql )
}


module.exports={
  findFounderPassword
}
  