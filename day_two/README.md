#Node JS Continued

##Simple User Manager Warmup
- We will be building a user manager system using Node with PostgresSQL.
- First we will have to build the front end of the application and set up our routes to handle the display and input of user information.
- Your task is to set up an application with three views - show all users, edit user, and add new user. Each of these views will be EJS templates.
- Your application must have three separate GET routes to handle the display of each of these pages.

##Sequelize - Introduction to a Professional-Grade ORM

####ORM

An ORM (Object Relational Mapper) is a piece/layer of software that helps map objects to our database. This means we can just use JavaScript to create and work with our data instead of writing raw SQL queries.

####Sequelize

From the Sequelize docs "To put it in a nutshell, it's an ORM (Object-Relational-Mapper). The library is written entirely in JavaScript and can be used in the Node.JS environment." In other words, Sequelize is an ORM that works with relational databases and Node.js. It allows us to do many things including:
- Represent models and their data.
- Represent associations between these models.
- Validate data before they gets persisted to the database.
- Perform database operations in an object-oriented fashion.

####Model

A model is a class that maps to the data relation (table) and potentially bridges tables. You can think of a model as the blueprint (class) for what each row of data is going to contain. Unlike a migration, you perform CRUD on instances of your models.

####Migration

Migrations (also known as ‘schema evolution’ or ‘mutations’) are a way of changing your database schema from one version into another. You can think of a migration as the creation or changes you want to make to a database table or column.

Before you can start manipulating your models, you need to create and run a migration. Examples of migrations are creating, deleting and altering tables (and their existing columns).

####Sequelize and the Sequelize-Cli

We are going to be using the sequelize-cli so that we can easily run commands in the terminal to initialize our project and to create migrations and models.

This requires us to first install the sequelize-cli (CLI stands for Command Line Interface) using `npm install --save sequelize-cli`, and then in order to run a command we need to type node_modules/.bin/sequelize. This is a bit annoying to type over and over so first thing we should do is create an alias so that we don't have to remember/type this.

Let's also install the Sequelize package itself: `npm install --save sequelize`

```
alias sequelize='node_modules/.bin/sequelize'
```
####Config.json

In sublime we should now see a bunch of new folders. We now have config, migrations and models. This was created for us when we ran `sequelize init`.

Let's start in the config folder and open up the config.json file. This file contains information about the database we are using as well as how to connect. We have three settings, one for development (what we will use now), test(for testing our code), and production(when we deploy our app on AWS/Heroku).

Let's change the config.json so it looks like this (we will not be using the test or production environments, so just ignore those for now - all that matters is "development").

##Creating Models and Migrations

In order to create a model, we start with `sqlize model:create` and then specify the name of the model using the --name flag. Make sure your models are always in the singular (remember table name in plural, model name in singular).

After passing in the --name flag followed by the name of your model, you can then add an --attributes flag and pass in data about your model. When you generate your model, you will also generate a corresponding migration. You only need to do this once for your model.

Remember, if you want to make changes to your model after generating it - all you have to do is make a change and save it. If you want to make changes to your migrations, you have to re-run them (either by undoing the migration or by creating a new one that alters the migration).

Here is an example of a command to generate a User model with a first_name, last_name and age along with a corresponding migration. Make sure you do not have any spaces for each of the attributes and their data types

```
sequelize model:create --name User --attributes first_name:string,last_name:string,age:integer
```

##CRUD with Sequelize

####Create

```
var pg = require("pg");
var models = require("./models/index.js");

models.User.create({
	first_name:req.body.firstname,
	last_name:req.body.lastname,
	age:req.body.age
}).success(function(data) {
	res.redirect("/");
});
```

####Read

```
models.User.findAll().success(function(users) {
	res.render("index.ejs", {
		all_users: users
	});
});
```
or

```
models.User.find(req.params.id).success(function(user) {
	res.render("edit.ejs", {
		user_info: user
	});
});
```

####Update

```
models.User.find(req.params.id).success(function(user) {
	user.updateAttributes({
		first_name:req.body.firstname,
		last_name:req.body.lastname,
		age:req.body.age
	}).success(function() {
		res.redirect("/");
	});
});
```

####Delete

```
models.User.find(req.params.id).success(function(user) {
	user.destroy().success(function() {
		res.redirect("/");
	});
});
```

##Chirp! Lab - The Next Big Thang
Chirp! is the newest social network that brings together all of the coolest aspects of socializing. Your mission should you choose to accept it is as follows:
- Use the files in the `chirp_html` folder as your frontend.
- Create a brand new Node project that will take the input from the chirp textarea and save it as a chirp in the database.
- Create edit and delete functionality for the chirps.
- Each chirp shown should display a randomly chosen bird.

One issue you will have right away is being able to serve static assets through your Node application. This can be easily achieved with Express:

```
app.use(express.static(__dirname + '/public'));
```
All static assets will now be served out of the public directory.

##Introduction to Web Sockets
- One of the most powerful uses for Node is its ability to handle seamless "real-time" experiences.
- Sockets are a way for a browser and server to communicate without the standard request-response cycle.
- Chat clients, real-time data feeds, and operational dashboards are some examples of where sockets have been used effectively.

##How it Basically Works
- A client makes an initial request out to the server and a "handshake" is created - AKA a connection has been established.
- This "handshake" is given a unique socket with a unique ID.
- Essentially this request never completes and remains open for the duration of the session.
- Every further request-response simulation is done via a manifestation of a JavaScript event.
- In a perfect world this is how things would always operate with sockets but certain factors such as browser incompatibility and more can interfere with a proper handshake. As a result, a more brute-force approach of "polling" may be required.

##Socket.io
- Socket.io is a library that essentially manages browser capabilities to connect a client with a server through web sockets in the most ideal way possible.
- It can switch between polling and sockets automatically and basically automate the handshake process.
- Socket.io works on the client and the server side to achieve seamless interaction.

##Socket-Based Chat Mechanism
- We will be building a chat application in Node using web sockets.
- We will use Express JS as the application framework.

####The Server Setup
- For this project we will need to import the Express and Socket.io modules into the project:

```
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
```

- To handle the initial handshake, Socket.io registers a `connection` event:

```
io.on('connection', function(socket) { });
```

- This is now a unique socket for this specific connection.
- Any events to this socket can easily be detected and dealt with:

```
socket.on('event', function(params) { });
```

- Any event can also be "emitted" from the socket if necessary:

```
io.emit('event', params);
```

- You can also emit events to all sockets connected except for yours by using `broadcast`:

```
socket.broadcast.emit('event', params);
```

####The Client Setup
- The client will also use Socket.io to handle the handshake and any further events.
- The first thing that will be needed is to create the handshake with the server:

```
var socket = io.connect("server_url or blank for current server");
```

- The client can also detect and respond to events:

```
socket.on('event', function(params) { });
```

- The client can also "emit" events:

```
socket.emit('event', params);
```

##In-Class Lab: Build the Chat
- In this lab we will be coding along and working together to create a real-time chat application.
- The front end is already done for you [here](chat_starter_app/).
- Here are the steps you will need to take:
	- Step 1: Set up the app as a new node app with `npm init`.
	- Step 2: Set up the app to serve your static assets and make sure everything is in the right folder.
	- Step 3: Set up your root route to show the chat front end.
	- Step 4: Write the chat server functionality and integrate it with the front end code.
	- **Bonus:** Use your knowledge of front end JavaScript to change the page title when a new chat is received.

##Pushing Your Node App to Heroku
- Heroku is a great platform for testing out your app.
- It helps you do push-button deployments for your apps so you don't have to think of server administration.
- Let's check out the [documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) to see how we can get started with Node on Heroku.
- Here are the basic steps:

#####Download and install the Heroku toolbelt
- This is the command line utility to work with Heroku from the terminal.

#####Login to Heroku locally

```
heroku login
```

#####Set up project as new Heroku app
- This will give your project a temporary name as it is deployed.

```
heroku create
```

- Here's how to rename the app if you want to:

```
heroku apps:rename newname
```

#####Create a file called `Procfile`
- This is a file to tell the server which process to run as it starts the app.

```
web: node app.js
```

#####Push the app to Heroku
- The dependencies will automatically be installed and the app server will be started.

```
git push heroku master
```