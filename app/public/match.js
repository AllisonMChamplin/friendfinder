$(document).ready(function () {

    function runUserQuery() {
        var currentURL = window.location.origin;
        $.ajax({
            url: currentURL + "/api/users",
            method: "GET"
        })
            .done(function (userData) {
                ajaxTest(userData);
            });
    };

    function ajaxTest(userData) {
        console.log("ajaxTest function:");

        var userOne = userData[0].scores;
        var userTwo = userData[1].scores;
        var differenceArray = [];
        var compatabilityScore = 0;

        for (var i = 0; i < userOne.length; i++) {
            console.log("userOne - userTwo", userOne[i] + "-" + userTwo[i]);
            var x = Math.abs(userOne[i] - userTwo[i]);
            console.log("x: ", x);
            differenceArray.push(x);
            compatabilityScore += x;
            console.log("differenceArray: ", differenceArray);
            console.log("compat: ", compatabilityScore);
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