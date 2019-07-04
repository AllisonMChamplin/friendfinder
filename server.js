// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// var fs = require("fs");
// var mysql = require("mysql");
var bodyParser = require('body-parser');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('./app/public'));


// Body Parser 
// =============================================================
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());

// Include routes
// =============================================================
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});