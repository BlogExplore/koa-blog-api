const mysql = require('mysql2')
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = require('../config')
const connection = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
})
connection.getConnection((err, con) => {
  console.log('--11', err)
  console.log('--22', con)
  con.connect((err) => {
    if (err) {
      console.log('mysql connec error')
    } else {
      console.log(`mysql connection success`)
    }
  })
})

module.exports = connection.promise()
