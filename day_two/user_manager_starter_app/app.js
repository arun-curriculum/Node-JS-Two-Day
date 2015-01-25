var express = require("express");
var app = express();

app.set("view engine", "ejs")

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/edit/:id", function(req, res) {
	res.render("edit");
});

app.get("/add", function(req, res) {
	res.render("add");
});

app.listen(3000);