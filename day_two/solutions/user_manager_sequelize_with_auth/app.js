var express = require("express");

//Require DB module and import models
var pg = require("pg");
var models = require("./models/index.js");

var bodyParser = require("body-parser");

var methodOverride = require("method-override");

//Passport modules
var passport = require("passport"),
    localStrategy = require("passport-local").Strategy,
    flash = require('connect-flash'),
    session = require("cookie-session");

//Start the app
var app = express();

//Middleware

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.use(session( {
  secret: 'thisismysecretkey',
  name: 'chocolate chip',
  maxage: 3600000
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    models.User.find({
        where: {
            id: id
        }
    }).done(function(error,user){
        done(error, user);
    });
});

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
	if (req.isAuthenticated()) {
		models.User.find(req.params.id).success(function(user) {
			res.render("edit", {
				userInfo: user
			});
		});
	} else {
		res.redirect("/login");
	}
});

//Submit new user
app.post("/new", function(req, res) {
	models.User.createNewUser({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		age: req.body.age,
		password: req.body.password
	}, function() {
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

//Show login form
app.get("/login", function(req, res) {
	res.render("login");
});

//Log out a user
app.get("/logout", function(req, res) {
	req.logout();

	res.redirect("/");
});

//Login a user
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

app.listen(3000);













