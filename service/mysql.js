var mysql = require('mysql');
var config = require('../config/config')


var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
});


let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log('MYSQL>>>>>>>>>>>>>>>>>>>>pool.getConnection Error:')
        console.log(err)
        reject( err )
      } else {
        console.log('>>>>>SQL：'+ sql )
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>参数：'+ values)
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            console.log('MYSQL>>>>>>>>>>>>>>>>>>>>pool.getConnection Error:')
            console.log(err)
            reject( err )
          } else {
            console.log(rows)
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

let createTable = function( sql ) {
  return query( sql, [] )
}

module.exports={
  query,
  createTable
}