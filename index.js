const express = require('express');
const path = require('path');
const session = require('express-session');
var bodyParser = require('body-parser');

var con = require('./connection');

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", 'ejs');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended : true}));

app.use('/', require('./routes/web'));

//Run server

app.listen(PORT, ()=>{
    console.log("Server is running jaja");
});