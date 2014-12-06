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

##Practicing Routes with an Express Calculator
- We will create a simple calculator that will perform math operations from numbers that will be passed in the URL.
- Your program should have routes that will at least add, subtract, multiply, and divide.

##Let's Talk About Templates
- Templates allow you to create dynamic HTML views that are reused for various sets of data.
- Embedded JavaScript (EJS) is the templating framework used with Node.
- Within EJS code you can write standard JS.
- EJS looks for templates in the `views` folder.
- EJS uses `<% %>`, `<%= %>`, and `<%- %>` blocks to display JS content.

####<%= %>

This notation is to be used when you want to "escape" HTML in the data returned. This will not allow HTML returned to be rendered as HTML.

####<%- %>

This notation will not escape the data returned, and will allow HTML to be rendered.

####<% %>

This notation is to be used when you don't want to print any resulting values to the view. A good example of this would be if you want to use a FOR loop in your template.

####Example Hello World Using EJS

app.js

```
var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get('/', function(req, res) {
	res.render("index.ejs", {
		greeting: "Hello World"
	});
});

app.listen(3000);
```

views/index.ejs

```
<h1>Testing out EJS</h1>

<h2>Greeting is: <%= greeting %></h2>

<div style="margin-top:50px;">
	<% for (var i = 0; i < 5; i++) { %>
		<h5>Repeated Text</h5>
	<% } %>
</div>
```

##Simple User Manager Lab
- We will be building a user manager system using Node with PostgresSQL.
- First we will have to build the front end of the application and set up our routes to handle the display and input of user information.
- Your task is to set up an application with three views - show all users, edit user, and add new user. Each of these views will be EJS templates.
- Your application must have three separate GET routes to handle the display of each of these pages.
- You will be building the functionality to perform the database operations tomorrow, but today we are just interested in being able to display the pages through Node using routes.