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

// 
let findAll = function(){
  let _sql=`SELECT id,name FROM ${_tableName};`
  return mysql.query(_sql)
}


// 分页查询
let findForPage = function(offset, rows){
  let _sql=`SELECT * FROM ${_tableName} 
            ORDER BY id DESC
            LIMIT ${offset},${rows};`
  return mysql.query(_sql)
}

// 新增
let newRow = function(value) {
  let _sql=`INSERT INTO ${_tableName}(name) VALUES(?);`
  return mysql.query( _sql, value)
}

// 删除
let deleteById = function(rowId) {
  let _sql=`DELETE FROM ${_tableName} WHERE id=${rowId}`
  return mysql.query( _sql)
}

// 查询 group by
//select id,name,count from pmb_cate as a left join
//(select postcate, count(*) as count from pmb_posts group by postcate) as b
//on a.name = b.postcate
let findAllAndPostCount = function() {
  let _sql=`SELECT id,name,count FROM pmb_cate AS a LEFT JOIN
          (SELECT postcate,count(*) AS count FROM pmb_posts GROUP BY postcate) AS b
          ON a.name=b.postcate;`
  return mysql.query( _sql)
}

module.exports={
  getCounts,
  newRow,
  deleteById,
  findForPage,
  findAllAndPostCount,
  findAll
}
  