// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./app/public'));

// Characters (TEST DATA)
// =============================================================
var characters = [
    {
        routeName: "yoda",
        name: "Yoda",
        gender: "Jedi Master",
        age: 900,
        coolPoints: 2000
    },
    {
        routeName: "darthmaul",
        name: "Darth Maul",
        gender: "Sith Lord",
        age: 200,
        coolPoints: 1200
    },
    {
        routeName: "obiwankenobi",
        name: "Obi Wan Kenobi",
        gender: "Jedi Master",
        age: 55,
        coolPoints: 1350
    }
];

// // Routes
// // =============================================================

// Log route? /
// app.use(function (req, res, next) {
//     console.log('Time:', Date.now())
//     next()
// });

// Basic route /
app.get("/", function (req, res, next) {
    console.log('Record Route Activity: /');
    next();
}, function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/home.html"));
});

// add
app.get('/add', function (req, res, next) {
    console.log('Record Route Activity: /add');
    fs.appendFile("log.txt", "test", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("log.txt was updated!");
    });
    next();
}, function (req, res) {
    res.sendFile(path.join(__dirname, './app/public/survey.html'));
});

// api
app.get('/api', function (req, res, next) {
    console.log('Record Route Activity: /api');
    next();
}, function (req, res) {
    res.sendFile(path.join(__dirname, './app/public/survey.html'));
});

// Displays all characters
app.get("/api/characters", function (req, res, next) {
    console.log('Record Route Activity: /api/characters!');
    next();
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



// Create New Characters - takes in JSON input
app.post("/api/characters", function (req, res, next) {
    console.log('POST: new character');
    next();
}, function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newCharacter = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newCharacter);

    characters.push(newCharacter);

    res.json(newCharacter);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});



