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
        // userListDiv.append("Here's the userData looped names at first: ");
        // for (var i = 0; i < userData.length; i++) {
        //     userListDiv.append(JSON.stringify(userData[i].userName));
        // };
        // var userOne = userData.splice(0, 1);
        // userListDiv.append("<br><br>Here's the userOne after splice: ");
        //     userListDiv.append(JSON.stringify(userOne));
        // userListDiv.append("<br><br>Here's the userData looped names after splice: ");
        // for (var i = 0; i < userData.length; i++) {
        //     userListDiv.append(JSON.stringify(userData[i].userName));
        // };


        var userOne = userData.splice(0, 1);
        var userArray = userData;

        for (var i = 0; i < userArray.length; i++) {

            userListDiv.append(JSON.stringify(userOne[0].userName) + " VS " + JSON.stringify(userArray[i].userName));
            userListDiv.append("<br>");

            var tempComparisonArray = [];

            for (var j = 0; j < userArray.length; j++) {
                var x = userOne[0].scores[j];
                var y = userArray[i].scores[j];
                var z = x - y;
                tempComparisonArray.push(Math.abs(z));
                // userListDiv.append(tempComparisonArray);
            }
            userListDiv.append(tempComparisonArray);

            let sum = tempComparisonArray.reduce((acc, val) => {
                return acc + val;
            });
            console.log(sum);
            userListDiv.append("<h2>Score: " + sum + "</h2>");

            userListDiv.append("<br><br>");

            // console.log("userOne.scores", userOne[0].scores);
            // console.log("userArray[i].scores", userArray[i].scores);

        }


    };

    function ajaxTest(userData, userOne) {
        console.log("ajaxTest function:");

        var tempTwo = userData.slice(1);
        var userTwo = userData[0].scores;
        var differenceArray = [];
        var compatabilityScore = 0;

        for (var i = 0; i < userOne.length; i++) {
            // console.log("userOne - userTwo", userOne[i] + "-" + userTwo[i]);
            var x = Math.abs(userOne[i] - userTwo[i]);
            // console.log("x: ", x);
            differenceArray.push(x);
            compatabilityScore += x;
            // console.log("differenceArray: ", differenceArray);
            // console.log("compat: ", compatabilityScore);
        }

        var wrap = $("<div class='wrap' class='clearfix'>");
        var c = $("<h3 class='compatability-score'>");
        c.append("Score: ", compatabilityScore, "<br>");
        c.append(differenceArray);
        var targetDiv = $("#user-list");
        wrap.append(c);

        for (var i = 0; i < 2; i++) {
            var a = $("<div class='user2'>");
            var img = $("<img>");
            img.attr("src", userData[i].photolink);
            a.append(userData[i].userName, img, userData[i].scores);
            wrap.append(a);
        };
        targetDiv.append(wrap);

    };


    function clearUsers() {
        console.log("clearUsers");
        var currentURL = window.location.origin;
        $.ajax({
            url: currentURL + "/api/clear",
            method: "POST"
        })
    };

    $("#clear").on("click", function () {
        console.log("clearing data...");
        clearUsers();
        location.reload();
    });

    runUserQuery();


});