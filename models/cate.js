var mysql = require('../service/mysql');

var _tableName = 'pmb_cate';
/*
CREATE TABLE `pmb_cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pid` int(11) NOT NULL DEFAULT '0',
  `pathname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

// 总数
let getCounts = async function() {
  let _sql = `SELECT COUNT(*) FROM ${_tableName};`

  let ret = await mysql.query( _sql, [] )
  if ((ret!=null) && (ret!=undefined)){
    return ret[0]['COUNT(*)'];
  }
}


// 分页查询
let findForPage = function(offset, rows){
  let _sql=`SELECT * FROM ${_tableName} 
            ORDER BY id DESC
            LIMIT ${offset},${rows};`
  return mysql.query(_sql)
}



module.exports={
  getCounts,
  findForPage,
  updateOption
}
  