const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

var con = require('./connection');

const app = express();
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", 'ejs');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended : true}));

app.use('/', require('./routes/web'));

//Run server

app.listen(PORT, ()=>{
    console.log("Server is running jaja");
});