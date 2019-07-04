// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var mysql = require("mysql");

// users (TEST DATA)
// =============================================================
var users = [
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

// Sets up database
// =============================================================
var connection = mysql.createConnection({
    host: "localhost",
    // port: 3606,
    user: "root",
    password: "pinkSparkleUnikitty",
    database: "friendsift_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // createProduct();
});

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./app/public'));


// Set views directory and views engine as Handlebars
// =============================================================
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "hbs");


// // Routes
// // =============================================================


app.get("/", function (req, res, next) {
    console.log('Record Route Activity: /');
    res.render('index');
    next();
}, function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/home.html"));
});

// Log route? /
// app.use(function (req, res, next) {
//     console.log('Time:', Date.now())
//     next()
// });

// // Basic route /
// app.get("/", function (req, res, next) {
//     console.log('Record Route Activity: /');
//     next();
// }, function (req, res) {
//     res.sendFile(path.join(__dirname, "./app/public/home.html"));
// });

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

// Displays all users
app.get("/api/users", function (req, res, next) {
    console.log('Record Route Activity: /api/users!');
    next();
}, function (req, res) {
    return res.json(users);
    // readUsers();
});


// Displays all users
app.get("/api/users2", function (req, res, next) {
    console.log('Record Route Activity: /api/users2!');
    next();
}, function (req, res) {
    // return res.json(users);
    readUsers();
});


// Displays a single character, or returns false
app.get("/api/users/:character", function (req, res) {
    var chosen = req.params.character;
    console.log(chosen);
    for (var i = 0; i < users.length; i++) {
        if (chosen === users[i].routeName) {
            return res.json(users[i]);
        }
    }
    return res.json(false);
});

// Create New users - takes in JSON input
app.post("/api/users3", function (req, res, next) {
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
    users.push(newCharacter);
    res.json(newCharacter);
});






// // SQL
// // =============================================================
function readUsers() {
    console.log("Selecting all users...\n");
    connection.query("SELECT * FROM users", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}







// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});



