var express = require("express");

//Require DB module and import models
var pg = require("pg");
var models = require("./models/index.js");

var bodyParser = require("body-parser");

var methodOverride = require("method-override");

//Start the app
var app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

//Show all users
app.get("/", function(req, res) {
	models.User.findAll().success(function(users) {
		res.render("index", {
			allUsers: users
		});
	});
});

//Show specific user information
app.get("/edit/:id", function(req, res) {
	models.User.find(req.params.id).success(function(user) {
		res.render("edit", {
			userInfo: user
		});
	});
});

//Submit new user
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

//Process user update
app.put("/edit/:id", function(req, res) {
	models.User.find(req.params.id).success(function(user) {
		user.updateAttributes({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			age: req.body.age
		}).success(function() {
			res.redirect("/");
		});
	});
});

app.delete("/delete/:id", function(req, res) {
	models.User.find(req.params.id).success(function(user) {
		user.destroy().success(function() {
			res.redirect("/");
		});
	});
});

app.listen(3000);













