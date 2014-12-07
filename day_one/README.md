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

##Making Calls to Web Services

- On the client side we have AJAX, on the server side we have cURL.
- Using Node.js we have to make requests with cURL.
- You can install the [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) Chrome extension to easily look through JSON objects.

####Request Module

- Allows us to make HTTP requests easily using Node.

```
var request = require('request');

request('http://www.google.com', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body); // Print the google web page.
	}
});
```
##Request Exercise

- Create a new Node app using `npm init`.
- Set up EJS as your templating engine.
- Make a request out to facebook.com and place the response body inside a template. Hint: Think about which template syntax to use for this.

##Using JSON

- Normally if you use a real web service it will return data to you in JSON format.
- Node however interprets this JSON as a string, so you need to parse it into real JSON.

####JSON.parse()

```
request('http://daretodiscover.net/user', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var data = JSON.parse(body);
	}
});
```

##JSON API Exercise

For this exercise we will be using the User API:

`http://daretodiscover.net/user`

- Create a new application using `npm init`.
- Use the request module to make a GET request to the above url.
- Create 3 different routes using Express - first, last, all.
	- First will display a list of all users' first names.
	- Last will display a list of all users' last names.
	- All will display a list of all users' data in table form.
- Bonus: Make it pretty using Bootstrap :)

##POST Operations

- Instead of working with data that comes in to the server as a URL string, POST data is sent as an object through the request header.
- POST requests are usually mapped over to create actions.
- As a result, this data is hidden from user view.
- This is often used for confidential, one-time data sending such as account credentials while setting up an account or sending credit card details securely.

```
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
	extended:true
}));

app.post("/user", function(req, res) {
	request({
		method: "POST",
		uri: "http://daretodiscover.net/user",
		formData: {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			age: req.body.age,
			username: req.body.username
		}
	}, function(error, response, body) {
		res.redirect("/user");
	});
});
```

- Unlike GET requests, you can't access these parameters with `req.query`.
- To access POST parameters you have to use the Node `body-parser` module, which takes the name attribute from the form data and uses it as POST data.
- With this module you can simply use `req.body` as shown above.

##PUT Operations

- PUT is essentially the same as a POST request.
- PUT requests are normally mapped over to update actions.
- According to the convention, since PUT is mapped over to an update action, an ID needs to be passed to reference the data object.

```
var methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.put("/user/:id", function(req, res) {
	request({
		method: "PUT",
		uri: "http://daretodiscover.net/user/" + req.params.id,
		formData: {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			age: req.body.age,
			username: req.body.username
		}
	}, function(error, response, body) {
		res.redirect("/user");
	});
});
```

- Method override allows us to use the PUT verb in the HTML form, which is otherwise not supported.

##DELETE Operations

- Delete is the easiest of them all, but still requires a method override.
- Delete will require an ID to specify which record is to be deleted.

```
app.delete("/user/:id", function(req, res) {
	request({
		method: "DELETE",
		uri: "http://daretodiscover.net/user/" + req.params.id
	}, function(error, response, body) {
		res.redirect("/user");
	});
});
```

##Homework / After Class

- In this assignment we will create a wine inventory management system using a pre-built API: http://daretodiscover.net/wine
- The app must use the following:
	- Routes for GET, POST, PUT, DELETE.
	- 3 views - show all wines, edit wine, new wine using EJS.
	- All CRUD operations using the correct verbs.
- Bonus: Make it pretty using Bootstrap