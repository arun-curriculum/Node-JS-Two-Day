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

##Book Manager Lab
- We will create a simple book manager system so we can practice our database operations with Sequelize.
- You can use the front-end that has already been developed for you in the `book_library_html` folder.
- The app should have one model `Book` and have 4 attributes - title, author, genre, pages.
- All CRUD operations should be performed with Sequelize.

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

##What Is Authentication?

####Ability to store and retrieve user credentials

Firstly, an authentication scheme allows your users to be able to save information about themselves into the app like username, password, name, birthday, etc.

####Way to keep parts of your app reserved for logged-in users

In most applications you want to separate common areas from private areas, such as a user's profile page or dashboard. Logging in users properly requires an authentication scheme.

##How is Authentication Performed?

In industry-standard applications, authentication is performed through a standard set of processes:

1. User registers for site providing username, password, etc.
2. Password is encrypted using a salted hash system like Bcrypt and saved into the database.
3. User visits login page and enters credentials (username, password, etc).
4. Password entered is checked against the password hash in the database.
5. Session cookie is set allowing user details to persist across pages and browser closes.

##Where Does Passport Come In?

- Sessions are not built in to Node, so Passport replicates this key feature.
- Passport appends methods and model information into the `req` object in Express to allow us to manage sessions.
- Passport operates mainly in the "middleware" to accomplish its tasks, so between request and response.
- Passport can handle standard authentication, but also assist heavily with OATH, which is the most common way to authenticate using an external API.

##Password Encryption Via Bcrypt

We first need to require our modules:

```
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
```

We need to then create a method to encrypt our password using the Blowfish algorithm:

```
hashPass: function(password) {
	return bcrypt.hashSync(password, salt);
}
```

And then we can write a function to compare a given password with the hash in the database:

```
comparePass: function(userpass, dbpass) {
	return bcrypt.compareSync(userpass, dbpass);
}
```

This password can then be saved in the database along with the new model information (such as a new user):

```
createNewUser: function(userInfo) {
	User.create({
   		first_name:userInfo.first_name,
      	last_name:userInfo.last_name,
       username:userInfo.username,
       password:this.hashPass(userInfo.password)
   });
}
```

Read more on the Blowfish algorithm [here](http://en.wikipedia.org/wiki/Blowfish_(cipher)).

##Setting Up Passport

This is absolutely non-intuitive, and requires mostly memorization.

We first need to import our new modules:

```
var passport = require("passport"),
    localStrategy = require("passport-local").Strategy,
    flash = require('connect-flash'),
    session = require("cookie-session");
```

Setup Passport to use appropriate middleware:

```
app.use(session( {
  secret: 'thisismysecretkey',
  name: 'chocolate chip',
  maxage: 3600000
  })
);

app.use(passport.initialize());
app.use(passport.session());
```

Passport uses "serialize" functions that allow the module to create session objects from the validated information:

```
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
```

##Apply Passport for User Authentication

In your post route for your user authentication form, you can use Passport like so:

```
app.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}));
```

This local "strategy" can be found in the User model:

```
passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function(username, password, done) {
      User.find({
        where: {
          username: username
        }
      }).done(function(error, user) {
        if (user) {
          if (User.comparePass(password, user.password)) {
            done(null, user);
          } else {
            done(null, null);
          }
        } else {
          done(null, null);
        }
      });
    }
  ));
```

If authentication succeeds, the `done()` method will be called, and the user is now serialized into the `user` object.

##What Does All This Mean?!

- User sessions now persist across pages and browser refreshes.
- User data can be used throughout the site.
- Content can be hidden or shown based on user authentication state.

app.js

```
app.get("/", function(req, res) {
	res.render("index.ejs", {
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});
```
index.ejs


```
<% if (isAuthenticated) { %>
	<h1>You are logged in!</h1>
<% } %>
```

##Lab / Homework

- Take the Chirp! application you created and add an authentication layer.
- Users should be able to register for an account.
- Passwords must be hashed with Bcrypt.
- Chirp edit page should only be visible if the user is logged in.