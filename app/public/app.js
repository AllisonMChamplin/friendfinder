$(document).ready(function () {

    var currentQuote = "";
    // var myQuote2 = ["Friends are the sunshine of life.", "Be true to your work, your word, and your friend. Henry David Thoreau", "It’s not what we have, but who we have. Winnie The Pooh", "A friend is someone who knows all about you and still loves you. Elbert Hubbard", "I have learned that to be with those I like is enough. Walt Whitman ", "Good friends are hard to find, harder to leave and impossible to forget. G. Randolf", "There are no strangers here; Only friends you haven’t yet met. William Butler Yeats"];
    var myQuote = ["Friends are the sunshine of life.", "Be true to your work, your word, and your friend. Henry David Thoreau", "It’s not what we have, but who we have. Winnie The Pooh", "A friend is someone who knows all about you and still loves you. Elbert Hubbard", "I have learned that to be with those I like is enough. Walt Whitman ", "Good friends are hard to find, harder to leave and impossible to forget. G. Randolf", "There are no strangers here; Only friends you haven’t yet met. William Butler Yeats"];
    var currentBackground = "";
    var myBackground = ["friend-1820040_1920.jpg", "dog-2606759_1920.jpg", "heart-3085515_1920.jpg"]


    // Functions

    var randomQuote = function () {
        var rand = Math.floor(Math.random() * 7);
        currentQuote = myQuote[rand];
        $('#random-quote').empty();
        $('#random-quote').append(currentQuote);
    };

    var randomBackground = function () {
        var rand = Math.floor(Math.random() * 3);
        currentBackground = myBackground[rand];
        console.log("currentBack:", currentBackground);
        $("#random-background").css("background-image", "url(" + currentBackground + ")");
    };

    var init = function () {
        randomQuote();
        randomBackground();
    }

    init();

});