const express = require("express");

const isEmpty = require("lodash/isEmpty")
const validator = require("validator") 
const sqlFn = require("../mysql")
const router = express.Router();


const validatorInput = (data)=>{
  let errors= {}
  if(validator.isEmpty(data.username)) {
    errors.username = "请填写用户名"
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "请填写邮箱"
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "请填写密码"
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "请确认密码"
  } else if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "两次密码不同"
  }
  return {
    errors,
    isValid:isEmpty(errors)
  }
}
router.post("/", (req, res) => {
  console.log(req.body)
  const {errors, isValid} = validatorInput(req.body);

  const sql = "insert into user values (null, ?,?,?)";
  const arr = [req.body.email, req.body.username, req.body.password]
  if(isValid) {
    // res.send({ success: true })
    sqlFn(sql,arr)
    .then(data=>{
      console.log(data)
      console.log(data.affectedRows)
      if (data.affectedRows) {
        res.send({ success: true })
      } else {
        res.status(400).json({ error: "插入失败" });
      }
    })
  } else {
    res.status(400).json(errors);
  }
  // res.send({
  //   msg: "hello!"
  // })
})
router.get("/check", (req, res) => {
  let sqlStr;
  switch(req.query.searchKey) {
    case "username":
      sqlStr= `username = ?`
      break;
    case "email":
      sqlStr = `email = ?`
      break;
    case "password":
      sqlStr = `password = ?`
      break;
    default:
      sqlStr = ""
  }
  if (sqlStr === "" || req.query.body===undefined) {
    res.status(400).json({ error: "查询项有误" });
  } else {
    const sql = `select * from user where ${sqlStr}`
    const arr = [req.query.body]
    sqlFn(sql, arr)
    .then(data=>{
      if (data) {
        res.send(data)
      } else {
        res.status(400).json({ error: "服务器错误" })
      }
    })
  }
})
module.exports = router