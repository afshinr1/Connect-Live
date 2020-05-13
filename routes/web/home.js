const express = require("express");
const router = express.Router();
const path = require("path");

const connection = require("../../connection");

router.get("/", (req, res) => {
  res.render("web/index");
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/about", (req, res) => {
  res.render("web/about");
});

router.get('/contact', (req, res, next)=>{
  res.render('web/contact');
});
module.exports = router;
