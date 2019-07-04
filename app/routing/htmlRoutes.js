var path = require("path");

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });

    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/survey.html'));
    });

    app.get('/view', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/view.html'));
    });

    app.get('/match', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/match.html'));
    });

    app.use( function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });

};