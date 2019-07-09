$(document).ready(function () {

    var newUser = [];
    var randomImg = "";
    var winner = "";


    $("#get-image").on("click", function (event) {
        console.log("clicky2");
        var x = Math.floor((Math.random() * 100) + 1);
        var randomImg = "https://randomuser.me/api/portraits/men/" + x + ".jpg";
        $('#photo-link').val(randomImg);
        console.log("randomImg: ", randomImg);
    });

    $("#get-fimage").on("click", function (event) {
        console.log("clicky2");
        var x = Math.floor((Math.random() * 100) + 1);
        var randomImg = "https://randomuser.me/api/portraits/women/" + x + ".jpg";
        $('#photo-link').val(randomImg);
        console.log("randomImg: ", randomImg);
    });

    var validateForm = function () {
        var userValidate = $('#username').val().trim();
        var photoValidate = $('#photo-link').val().trim();

        if (!userValidate) {
            console.log("userValidate false");
            $('#username').focus();
            var message = $("<p class='required-field' id='val1'>");
            message.append("This field is required.");
            $('#namegrp').append(message);
            return;
        } else {
            console.log("userValidate true");
            $('#val1').empty();
        };

        if (!photoValidate) {
            console.log("photoValidate false");
            $('#photo-link').focus();
            var message = $("<p class='required-field' id='val2'>");
            message.append("This field is required.");
            $('#photogrp').append(message);
            return;
        } else if (photoValidate) {
            console.log("photoValidate true");
            $('#val2').empty();
        };
        console.log("Validated!");
        processForm();
    };

    // This builds the new user's object
    var processForm = function () {
        var scoresArray = [];
        scoresArray.push($('#q1').val().trim());
        scoresArray.push($('#q2').val().trim());
        scoresArray.push($('#q3').val().trim());
        scoresArray.push($('#q4').val().trim());
        scoresArray.push($('#q5').val().trim());
        scoresArray.push($('#q6').val().trim());
        scoresArray.push($('#q7').val().trim());
        scoresArray.push($('#q8').val().trim());
        scoresArray.push($('#q9').val().trim());
        scoresArray.push($('#q10').val().trim());
        newUser = {
            routename: $('#username').val().trim(),
            userName: $('#username').val().trim(),
            photolink: $('#photo-link').val().trim(),
            scores: scoresArray
        };
        // console.log("newUser: ", newUser);
        // console.log("newUser: ", newUser.scores);

        addNewUser();
    };

    var addNewUser = function () {
        var currentURL = window.location.origin;
        $.post(currentURL + "/api/survey", newUser)
            .then(function (data) {
                // console.log("data? ", data);
                if (data === true) {
                    // console.log(data);
                    // console.log("data yay");
                    postSuccess();
                }
            });
    }

    var postSuccess = function () {
        console.log("postSuccess");
        runUserQuery();
    };

    function runUserQuery() {
        var currentURL = window.location.origin;
        $.ajax({
            url: currentURL + "/api/users",
            method: "GET"
        })
            .done(function (userData) {
                findFriend(userData);
            });
    };

    var findFriend = function (userData) {
        var userOne = newUser;
        var friendsList = userData.slice(0, 9);
        // console.log("userOne", userOne);
        // console.log("friendsList", friendsList);
        var maxIndex = -1;
        var maxValue = -1;

        for (var i = 0; i < friendsList.length; i++) {

            var total = 0;

            for (var j = 0; j < friendsList.length; j++) {
                // console.log("userOne", userOne[0].scores[]);
                // $('#formwrapper').prepend(JSON.stringify(userOne) + "<br><br>");

                var x = userOne.scores[j];
                var y = friendsList[i].scores[j];
                var z = x - y;
                total += Math.abs(z);

            }

            if (total > maxValue) {
                maxIndex = i;
                maxValue = total;
            }

            winner = friendsList[maxIndex];
            // console.log("winner", winner);

        }

        callModal(userOne, winner);
    }

    var callModal = function (userOne, winner) {
        // console.log("userOne", userOne.userName);
        // console.log("winner", winner);

        var modalDiv = $(".modal-body");
        modalDiv.addClass('text-center');
        // console.log("test2", winner);
        // modalDiv.append("You: " + JSON.stringify(userOne.userName) + "<br><br>");
        modalDiv.append("<div class='matcher'><h3>Your new BFF is:</h3><br><h2>" + JSON.stringify(winner.userName) + "</h2><br>" + "<img src='" +winner.photolink + "'><br><br></div>");

        $('#myModal').modal();
    };

    $("#myModal").on('hide.bs.modal', function () {
        // alert('The modal is about to be hidden.');
        location.reload();
    });

    $("#submit").on("click", function (event) {
        console.log("clicky");
        // event.preventDefault();
        validateForm();
    });
















});