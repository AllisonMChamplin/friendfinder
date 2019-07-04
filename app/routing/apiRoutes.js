var userData = require ('../data/friends.js');

module.exports = function (app) {

    app.get('/api/users', function (req, res) {
        res.json(userData);
    })

    app.post('/api/survey', function (req, res) {
        console.log("hi");
        userData.push(req.body);
        res.json(userData);
    });

}


