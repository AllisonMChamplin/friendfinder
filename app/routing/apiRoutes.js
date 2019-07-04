var userData = require ('../data/friends.js');

module.exports = function (app) {

    app.get('/api/users', function (req, res) {
        res.json(userData);
    })

    app.post('/api/survey', function (req, res) {
        console.log("hi");
        userData.push(req.body);
    });

    app.post('/api/clear', function (req, res) {
        userData = [];
        console.log("cleared user data");
    });

}


