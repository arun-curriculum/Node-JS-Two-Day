var express = require("express");
var app = express();

//Socket.io setup
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");

//Set up socket server connection
io.on("connection", function(socket) {
	console.log("Socket connected");
	socket.on("chat", function(chatInfo) {
		console.log(chatInfo);
		socket.broadcast.emit("chat", chatInfo);
	});
});

app.get("/", function(req, res) {
	res.render("index");
});

var port = process.env.PORT || 3000;

http.listen(port);