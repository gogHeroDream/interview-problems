const express = require("express");
const sqlFn = require("../mysql");
const jwt = require("jsonwebtoken")
const config = require("../config")
const router = express.Router();
router.post('/', (req, res) => {
  const { username, password } = req.body;
  const sql = "select * from user where `username`=? AND `password`=?";
  const arr = [username, password];
  sqlFn(sql, arr)
    .then(data => {
      if (data.length > 0) {
        const token = jwt.sign({
          id: data[0].id,
          username: data[0].username
        },config.jwtSecret)
        res.send({token})
        // res.json({ success: true })
      } else {
        res.status(401).json({ errors: { form: "用户名密码错误" } })
      }
    })
})
module.exports = router