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
        console.log("userOne", userOne[0].userName);
        var userArray = userData;
        console.log("UserArray", userArray);
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

        var modalDiv = $(".modal-body");

        // modalDiv.append("<h2>Meet your NEW BFF!</h2>");
        modalDiv.append("<h3>" + userArray[maxIndex].userName + "</h3>");
        modalDiv.append('<img src="' + userArray[maxIndex].photolink + '">');
        modalDiv.append("<br><br>");

        $('#myModal').modal();

        
        var youBox = $("<div class='matchwrap'>");
        youBox.append("<h3>You:</h3>");
        // youBox.append("<h3>" + userOne[0].userName + "</h3>");
        youBox.append('<img src="' + userOne[0].photolink + '">');
        
        var friendBox = $("<div class='matchwrap'>");
        friendBox.append("<h3>Your match: " + userArray[maxIndex].userName + "</h3>");
        friendBox.append('<img src="' + userArray[maxIndex].photolink + '">');

        $("#user-list").append(youBox);
        $("#user-list").append(friendBox);
        // $("#user-list").append('<br><br>');
        // $("#user-list").append("<h4>Your Compatability Score is:</h4>");
        // $("#user-list").append("");






        compareScoresDisplay();

    };

    var compareScoresDisplay = function (x)  {
        var compareDiv = $("<div id='compare-div'>");
        // compareDiv.append("hey");
        $("#user-list").append(compareDiv);
    }




    runUserQuery();

});