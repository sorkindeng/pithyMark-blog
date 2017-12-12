var mysql = require('../service/mysql');

var _tableName = 'pmb_options';

// 查询所有配置
let findAllOptions = function( ) {
  let _sql = `SELECT * FROM pmb_options;`
  return mysql.query( _sql )
 }

 // 更新配置
let updateOption = function(value) {
  let _sql=`UPDATE ${_tableName} SET optvalue=?,optdesc=? WHERE optkey=?;`
  return mysql.query( _sql, value)
 }


module.exports={
  findAllOptions,
  updateOption
}
  