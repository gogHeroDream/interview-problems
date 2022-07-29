const express = require("express")
const app = express()
const users = require("./routes/users.js")
const auth = require("./routes/auth.js")
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use("/api/users", users);
app.use("/api/auth", auth);
app.listen(3030, (req,res)=>{
  console.log("服务器在运行：3030")
})