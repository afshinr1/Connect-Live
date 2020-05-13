const express = require("express");
const router = express.Router();
const connection = require("../../connection");
const user = require("../../models/user");

router.get("/", (req, res, next) => {
  let message = req.flash("loginMessage");
  let message2 = req.flash("registerMessage");
  console.log("sad", message, message2);
  res.render("web/login", { loginMessage: message, registerMessage: message2 });
});

router.get("/register", (req, res, next) => {
  let message = req.flash("registerMessage");

  res.render("web/register", {registerMessage : message});
});

router.post("/ValidateUser", async (req, res) => {
  let username = req.body.uname;
  let password = req.body.upass;
  let state = await user.validate(username, password);
  if (state === "true") {
    req.session.username = username;
    req.session.loggedIn = true;
    console.log(req.session.username);
    req.flash("loginMessage", "Login Success!");
    res.redirect("/TopicsPage");
  } else {
    req.flash("loginMessage", "Invalid username or password");
    res.redirect("./");
  }
});

router.post("/RegisterUser", async (req, res, next) => {
  let email = req.body.email;
  let username = req.body.uname;
  let password = req.body.upass;
  let state = await user.register(email, username, password);
  if (state === "true") {
    req.flash("registerMessage", "Register Successful!");
    res.redirect("/User");
  } else {
    req.flash("registerMessage", "Username or email already Taken!");
    res.redirect("/User/register");
  }
});

module.exports = router;
