// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./app/public'));

// Star Wars Characters (DATA)
// =============================================================
var characters = [
    {
        routeName: "yoda",
        name: "Yoda",
        role: "Jedi Master",
        age: 900,
        forcePoints: 2000
    },
    {
        routeName: "darthmaul",
        name: "Darth Maul",
        role: "Sith Lord",
        age: 200,
        forcePoints: 1200
    },
    {
        routeName: "obiwankenobi",
        name: "Obi Wan Kenobi",
        role: "Jedi Master",
        age: 55,
        forcePoints: 1350
    }
];

// // Routes
// // =============================================================

// Basic route /
app.get("/", function (req, res, next) {
    console.log('Record Route Activity: /');
    next()
}, function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/home.html"));
});

// add
app.get('/add', function (req, res, next) {
    console.log('Record Route Activity: /add');
    next()
}, function (req, res) {
    res.sendFile(path.join(__dirname, './app/public/survey.html'));
});

// api
app.get('/api', function (req, res, next) {
    console.log('Record Route Activity: /api');
    next()
}, function (req, res) {
    res.sendFile(path.join(__dirname, './app/public/survey.html'));
});

// Displays all characters
app.get("/api/characters", function (req, res, next) {
    console.log('Record Route Activity: /api/char/');
    next()
}, function (req, res) {
    return res.json(characters);
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function (req, res) {
    var chosen = req.params.character;
    console.log(chosen);
    for (var i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }
    return res.json(false);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});