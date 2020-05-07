const express = require("express");
const router = express.Router();
const path = require("path");
const connection = require("../../connection");

router.get("/", (req, res) => {
  res.render("web/index");
});

router.post("/ValidateUser", (req, res) => {
  let username = req.body.uname;
  let password = req.body.upass;
  if (username && password) {
    connection.query('SELECT * FROM users WHERE username=? AND password=?', [username, password], (error, results, fields)=>{
        if(results.length >0){
         
            res.redirect("./TopicsPage");
        }else{
            res.redirect("/");

        }
    });
  } else {
    res.redirect("/");
  }
});

  

router.get('/about', (req, res)=>{
res.render('web/about');
});

module.exports = router;
