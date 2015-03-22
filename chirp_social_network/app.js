//Require modules and models

var express = require("express");
var models = require("./models/index");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

//Set view engine

app.set("view engine", "ejs");

//Middleware

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

//Get all chirps
app.get("/", function(req, res) {
	models.Chirp.findAll({ order: '"createdAt" DESC' }).done(function(error, chirps) {
		res.render("index", {
			chirps: chirps
		});
	});
});

//Create new chirp
app.post("/new", function(req, res) {
	models.Chirp.create({
		chirp: req.body.chirp
	}).done(function() {
		res.redirect("/");
	});
});

//Get specific chirp
app.get("/edit/:id/:bird", function(req, res) {
	models.Chirp.find(req.params.id).done(function(error, chirp) {
		res.render("edit", {
			chirp: chirp,
			bird: req.params.bird
		});
	});
});

//Edit or delete a chirp based on input
app.put("/edit/:id", function(req, res) {
	models.Chirp.find(req.params.id).done(function(error, chirp) {
		if (req.body.deletechirp === "delete-chirp") {
			chirp.destroy().done(function() {
				res.redirect("/");
			});
		} else {
			chirp.updateAttributes({
				chirp: req.body.chirp
			}).done(function() {
				res.redirect("/");
			});
		}
	});
});

app.listen(3000);