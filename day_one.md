#Introduction to Node JS

##Installation
- Install [Node JS](http://nodejs.org/)
- Install [Nodemon](https://github.com/remy/nodemon)
- Install [Postgres.app](http://postgresapp.com/)

##Group Exercise

In groups of 2, recall what happens when a typical web server receives a web request. If you don't remember, look up a web request's life from the time it's issued to a web server, to the time a result is returned back to the user in a browser.

Focus in on what happens once the request has been accepted by the server, in terms of access to the filesystem, other processes, and network access to third party services.

##JavaScript Runtime
- Node operates on the V8 Google Chrome JavaScript runtime.
- This runtime is what is responsible for interpreting the JavaScript and mapping it over to machine commands.
- Commands are executed through an architecture known as the "call stack." Currently-processing requests are part of the call stack, and come from the process queue.

##What is Node?
- Node JS is an interface that allows you to write server-side code in JavaScript.
- This interface provides the ability to handle requests and issue responses.
- It is asynchronous, and as a result, can be written in a way that will not block the call stack.
- Node is also a server that will allow your code to be accessible to the public and be able to issue responses for certain requests.

##First Server with Node

```
// server.js
var http = require("http");

function greet(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello World");
	res.end();
}

var server = http.createServer(greet);

server.listen(3000);
```

##Express JS
- Express is an API to Node JS that makes development more intuitive and quicker.
- Express allows us to easily set up routes that will trigger actions such as rendering pages.

##NPM and NPM Init
- NPM stands for Node Package Manager, and is a tool that allows us to easily download community-built Node packages.
- Initialize new Node project with NPM: `npm init`
- Install NPM packages: `npm install --save express`
- NPM works with package.json, which is a list of dependencies that can be installed on other computers and servers.

##Hello World in Node

```
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port);
});
```

##Representational State Transfer (REST)
- REST is a convention of routing that allows you to represent server-side actions in a URL.
- HTTP requests occur in 4 main types:
	- GET: Read
	- POST: Create
	- PUT: Update
	- DELETE: Delete
- Express uses RESTful routes to trigger actions on certain URL routes.
- Parameters can also be passed into a URL:

```
app.get("/greet/:name/:lastname", function(req, res) {
	res.send("Hello " + req.params.name + " " + req.params.lastname);
});
```

##Practicing Routes with Express Routes
- We will create a simple calculator that will perform math operations from numbers that will be passed in the URL.
- Your program should have routes that will at least add, subtract, multiply, and divide.

##Let's Talk About Templates
- Templates allow you to create dynamic HTML views that are reused for various sets of data.
- Embedded JavaScript (EJS) is the templating framework used with Node.
- Let's rewrite the hello world application using templating:

app.js

```
// add express
var express = require('express'),
	app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.listen(3000);

// when the url is matched, say hello world
app.get('/:name', function (req, res) {
	res.render('index', { name: req.params.name });
});
```
views/index.ejs

```
<!DOCTYPE html>
<html>
	<head>
	</head>
	<body>
		<h1>Hello world, <%= name %>!</h1>
	</body>
</html>
```