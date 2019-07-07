$(document).ready(function () {

    var userListDiv = $('#user-list');

    function runUserQuery() {
        var currentURL = window.location.origin;
        $.ajax({
            url: currentURL + "/api/users",
            method: "GET"
        })
            .done(function (userData) {
                testMany(userData);
            });
    };

    function testMany(userData) {
        console.log("testMany function:");
        var userOne = userData.splice(0, 1);
        var userArray = userData;
        var matchOrderArray = [];

        var maxIndex = -1;
        var maxValue = -1;

        for (var i = 0; i < userArray.length; i++) {

            // userListDiv.append(JSON.stringify(userOne[0].userName) + " VS " + JSON.stringify(userArray[i].userName));
            // userListDiv.append("<br>");

            var total = 0;

            for (var j = 0; j < userArray.length; j++) {

                var x = userOne[0].scores[j];
                var y = userArray[i].scores[j];
                var z = x - y;
                total += Math.abs(z);
            }

            if (total > maxValue) {
                maxIndex = i;
                maxValue = total;
            }

        };

        console.log("maxValue", maxValue);
        console.log("maxIndex", maxIndex);
        console.log("winner", userArray[maxIndex]);

        userListDiv.append("<h2>winner: " + userArray[maxIndex].userName + "</h2>");
        userListDiv.append("<br><br>");

        pickMatch(matchOrderArray);
        // console.log("matchOrderArray:", matchOrderArray);

    };

    var pickMatch = function (x)  {

    }




    runUserQuery();

});