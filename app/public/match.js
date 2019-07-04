$(document).ready(function () {

    function runUserQuery() {
        var currentURL = window.location.origin;
        $.ajax({
            url: currentURL + "/api/users",
            method: "GET"
        })
            .done(function (userData) {
                for (var i = 0; i < 2; i++) {
                    // console.log(userData[i]);
                    var user = $("<div class='clearfix'>");
                    user.addClass("user2");
                    user.attr("id", "user-" + i);
                    $("#user-list").append(user);
                    $("#user-" + i).append('<h2 style="display: inline-block">' + userData[i].userName + '</h2><img src="' + userData[i].photolink + '" style="float:left;">');
                };
                ajaxTest(userData);

            });
    };

    function ajaxTest(data) {
        console.log("ajaxTest function:");
        // console.log("Data? ", data);

        var userOne = data[0].scores;
        var userTwo = data[1].scores;
        var differenceArray = [];

        for (var i = 0; i < userOne.length; i++) {
            console.log("userOne - userTwo", userOne[i] + "-" + userTwo[i]);
            var x = userOne[i] - userTwo[i];
            console.log("x: ", x);
            console.log("Math.abs(x): ", Math.abs(x));
            differenceArray.push(Math.abs(x));
            console.log("differenceArray: ", differenceArray);
        }

        var a = $("#user-0");
        var b = $("#user-1");
        var c = $('#compatability');

        a.append(userOne);
        b.append(userTwo);
        c.append("Array of differences: " + differenceArray + "<br>" + "Score: ");

        c.append(differenceArray.reduce(myFunc));
        function myFunc(total, num) {
            return total + num;
        }






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