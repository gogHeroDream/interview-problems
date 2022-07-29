const mysql = require("mysql")
var client = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "vuelogin"
})
function sqlFn(sql,arr){
  return new Promise((resolve,reject)=>{
    client.query(sql, arr, function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
module.exports = sqlFn