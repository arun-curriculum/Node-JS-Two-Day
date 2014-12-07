var express = require("express");

//Require DB module and import models
var pg = require("pg");
var models = require("./models/index.js");

var bodyParser = require("body-parser");

//Start the app
var app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/edit/:id", function(req, res) {
	res.render("edit");
});

app.post("/new", function(req, res) {
	models.User.create({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		age: req.body.age
	}).success(function() {
		res.redirect("/");
	});
});

app.listen(3000);













