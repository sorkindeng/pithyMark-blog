var mysql = require('../service/mysql');

var _tableName = 'pmb_posts';
/*
    post status:    '0 草稿，1 待审核，2 已拒绝，3 已发布，4 私有不公开，9 删除'
    post posttype:  '0 文章，1 页面，9 系统页面',

*/

// 获取文章总数
let getCounts = async function(isPublic) {
  let _sql = `SELECT COUNT(*) FROM ${_tableName}
              WHERE posttype=0`;
  let strWhere = (isPublic ? " AND status=3":" AND status<>9" );
  _sql += strWhere;

  let ret = await mysql.query( _sql, [] )
  if ((ret!=null) && (ret!=undefined)){
    return ret[0]['COUNT(*)'];
  }
}

function postsFormat(posts){
  posts.forEach((item, index)=>{
    console.log('============postsFormat:'+ index);
    console.log(item);
  }) 
}

// 分页查询， status<>9，后台管理所有文章
let findForPage = function(offset, rows){
  let _sql=`SELECT id,posttype,status,title,pathname,summary,create_time FROM ${_tableName} 
            WHERE status<>9 
            AND posttype=0
            ORDER BY id DESC
            LIMIT ${offset},${rows};`
  return mysql.query(_sql)
}
//分页查询， status=3，前台显示发布状态的文章
let findForPage2 = function(offset, rows){
  let _sql=`SELECT id,posttype,status,title,pathname,summary,create_time FROM ${_tableName} 
            WHERE status=3 
            AND posttype=0
            ORDER BY id DESC
            LIMIT ${offset},${rows};`
  return mysql.query(_sql)
}


// 新增文章
let newRow = function(value) {
  let _sql=`INSERT INTO ${_tableName}(posttype,status,postcate,title,pathname,
            summary,markdown_content,content,
            allow_comment,create_time) 
          VALUES(?,?,?,?,?,?,?,?,?,?);`
  return mysql.query( _sql, value)
}
//修改
let updateRowById = function(value) {
  let _sql=`UPDATE ${_tableName} SET status=?,postcate=?,title=?,pathname=?,
            summary=?,markdown_content=?,content=?,
            allow_comment=?,update_time=?
            WHERE id=?`
  return mysql.query( _sql, value)
}


// 修改文章状态
let updateStatusById = function(value) {
  let _sql=`UPDATE ${_tableName} SET status=? WHERE id=?`
  return mysql.query( _sql, value)
}

// 删除文章
let deleteById = function(postId) {
  let _sql=`DELETE FROM ${_tableName} WHERE id=${postId}`
  return mysql.query( _sql)
}

// 查询文章
let findById = function(postId) {
  let _sql=`SELECT * FROM ${_tableName} WHERE id=${postId}`
  return mysql.query( _sql)
}
// 查询文章
let findByPathname = function(pathname) {
  let _sql=`SELECT id,title,pathname FROM ${_tableName} WHERE pathname="${pathname}"`
  return mysql.query( _sql)
}

// 查询文章
let getByPathname = function(pathname) {
  let _sql=`SELECT * FROM ${_tableName} WHERE pathname="${pathname}"`
  return mysql.query( _sql)
}
// 查询文章 group by
let findAllByCate = function() {
  let _sql=`SELECT postcate, count(*) as counts FROM ${_tableName} GROUP BY postcate;`
  return mysql.query( _sql)
}

// 查询已发布文章
let findAll = function() {
  let _sql=`SELECT id,posttype,status,postcate,title,pathname,create_time FROM ${_tableName} 
            WHERE status=3 
            AND posttype=0
            ORDER BY id DESC;`
  return mysql.query( _sql)
}
// 查询栏目
let findAllCatalog = function() {
  let _sql=`SELECT id,posttype,status,title,pathname FROM ${_tableName}
          WHERE posttype<>0
          ORDER BY id ASC;`
  return mysql.query( _sql)
}
/* add(data, options, replace){
  let values = [];
  let fields = [];
  for(let key in data){
    let val = data[key];
    val = this.parseValue(val);
    if (think.isString(val) || think.isBoolean(val) || think.isNumber(val)) {
      values.push(val);
      fields.push(this.parseKey(key));
    }
  }
  let sql = replace ? 'REPLACE' : 'INSERT';
  sql += ' INTO ' + this.parseTable(options.table) + ' (' + fields.join(',') + ')';
  sql += ' VALUES (' + values.join(',') + ')';
  sql += this.parseLock(options.lock) + this.parseComment(options.comment);
  return this.execute(sql);
} */


module.exports={
  getCounts,
  newRow,
  updateRowById,
  updateStatusById,
  deleteById,
  getByPathname,
  findById,
  findByPathname,
  findAll,
  findAllByCate,
  findAllCatalog,
  findForPage,
  findForPage2
}
  