var mysql = require('mysql');
var config = require('../config/config.js')


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
        resolve( err )
      } else {
        console.log('>>>>>SQL：'+ sql )
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'+ values)
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
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