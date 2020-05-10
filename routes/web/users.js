const express = require('express');
const router = express.Router();
const connection = require("../../connection");
const user = require('../../models/user');

router.get('/', (req, res, next)=>{
    res.render('web/login');
});


router.get('/register', (req, res, next)=>{
    res.render('web/register');
});


router.post("/ValidateUser", async (req, res) => {
  
    let username = req.body.uname;
    let password = req.body.upass;
    if (username && password) {
        let state = await user.validate(username, password);
        if(state === 'true'){
            req.session.username = username;
            req.session.loggedIn = true;
            console.log(req.session.username);
              res.redirect("/TopicsPage");
        }else{
            res.redirect("/");

        }
    } else {
      res.redirect("/");
    }
  });
  

  
router.post("/RegisterUser", async (req, res, next) => {
    let email = req.body.email;
    let username = req.body.uname;
    let password = req.body.upass;
    if (username && password && email) {
        let state = await user.register(email, username, password);
        if(state === 'true'){
              res.redirect("/User");
          }else{
              res.redirect("/");
        }

    } else {
      res.redirect("/");
    }
  });
  
    


module.exports = router;