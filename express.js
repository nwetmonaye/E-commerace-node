const path = require('path');  //This module provides utilities for working with file and directory paths.

const express = require('express');  // The core module for building web applications in Node.js.
const bodyParser = require('body-parser');  //A middleware that parses incoming request bodies in a format like JSON.


const app = express();  //Creates an instance of the Express application.


// app.set('view engine', 'pug');  //Sets the template engine to "pug" (formerly known as "Jade").
app.set('view engine', 'ejs'); 
app.set('views', 'views');  //Specifies the directory where the template files are located.

const adminData = require('./routes/admin');  //Imports two modules, likely containing route handling logic for the admin-related and shop-related functionality
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));  //Middleware for parsing incoming request bodies with URL-encoded payloads.
app.use(express.static(path.join(__dirname, 'public'))); //Middleware to serve static files (like images, CSS, and JavaScript) from the "public" directory.

app.use('/admin', adminData.routes); //Mounts the routes defined in the adminData module under the "/admin" route.
app.use(shopRoutes); //Mounts the routes defined in the shopRoutes module at the root level.


//This middleware handles requests that don't match any of the defined routes. It sends a 404 status and serves the "404.html" file located in the "views" directory.
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);  //Starts the Express server and listens on port 3000 for incoming HTTP requests.
