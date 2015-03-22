var express = require("express");
var app = express();
var request = require("request");

var bodyParser = require("body-parser");

var methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	request("http://daretodiscover.herokuapp.com/users", function(error, response, body) {
		res.render("index", {
			users: JSON.parse(body)
		});
	});
});

app.get("/first", function(req, res) {
	request("http://daretodiscover.herokuapp.com/users", function(error, response, body) {
		res.render("first", {
			users: JSON.parse(body)
		});
	});
});

app.get("/last", function(req, res) {
	request("http://daretodiscover.herokuapp.com/users", function(error, response, body) {
		res.render("last", {
			users: JSON.parse(body)
		});
	});
});

app.get("/all", function(req, res) {
	request("http://daretodiscover.herokuapp.com/users", function(error, response, body) {
		res.render("all", {
			users: JSON.parse(body)
		});
	});
});

app.get("/users/new", function(req, res) {
	res.render("new");
});

app.post("/users/new", function(req, res) {
	request({
		method: "POST",
		uri: "http://daretodiscover.herokuapp.com/users",
		formData: {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			age: req.body.age,
			username: req.body.username
		}
	}, function(error, response, body) {
		res.redirect("/all");
	});
});

app.put("/users/:id/edit", function(req, res) {
	request({
		method: "PUT",
		uri: "http://daretodiscover.herokuapp.com/users/" + req.params.id,
		formData: {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			age: req.body.age,
			username: req.body.username
		}
	}, function(error, response, body) {
		res.redirect("/all");
	});
});

app.get("/users/:id/edit", function(req, res) {
	request("http://daretodiscover.herokuapp.com/users/" + req.params.id, function(error, response, body) {
		res.render("edit", {
			userInfo: JSON.parse(body)
		});
	});
});

app.delete("/users/:id/delete", function(req, res) {
	request({
		method: "DELETE",
		uri: "http://daretodiscover.herokuapp.com/users/" + req.params.id
	}, function(error, response, body) {
		res.redirect("/all");
	});
});

app.listen(3000);












