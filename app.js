$(document).ready(function () {
var options = [
    {
        question: "What color are aircraft black boxes?", 
        choice: ["White", "Orange", "Black", "Green"],
        answer: 1,
        photo: "images/bbox.jpg"
        },
        {
            question: "What do honey bees collect?", 
        choice: ["Pollen and nectar", "Honey", "Fears of children", "Human Flesh"],
        answer: 0,
        photo: "images/bee.jpg"
        }, 
        {
            question: "Where did the Spanish flu originate?", 
        choice: ["Mexico", "Spain", "USA", "China" ],
        answer: 2,
        photo: "images/usa.png"
    }, 
    {
        question: "Where was the fortune cookie actually invented?", 
        choice: ["Japan", "China", "USA", "Mexico" ],
        answer: 2,
        photo: "images/fcookie.jpg"
    }, 
    {
        question: "What is a group of frogs known as?", 
        choice: ["A Knot", "A Bundle", "Frogs", "An Army" ],
        answer: 3,
        photo: "images/afrog.jpg"
    }, 
    {
        question: "What month and day is Adolf Hitlers Birthday?", 
        choice: ["July 4", "April 20", "December 25", "January 1" ],
        answer: 1,
        photo: "images/lol.jpg"
    }, 
    {
        question: "What were Chihuahuas originally bred for?", 
        choice: ["Depression", "Tasty Meat", "Taco Bell Ads", "Companionship" ],
        answer: 1,
        photo: "images/cook.jpg"
    }, 
    {
        question: "What is Hugh Hefner's jet plane named?", 
        choice: ["Big Bunny", "Always Up", "The Cockpit", "Viagra Not Needed" ],
        answer: 0,
        photo: "images/bbunny.png"
    }];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();

$("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for(var i = 0; i < options.length; i++) {
    holder.push(options[i]);
}
    })

function runTimer(){
    if (!running) {
    intervalId = setInterval(decrement, 1000); 
    running = true;
    }
}

function decrement() {
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer --;

    if (timer === 0) {
        unanswerCount++;
        stop();
        $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        hidepicture();
    }	
}

function stop() {
    running = false;
    clearInterval(intervalId);
}

function displayQuestion() {
    index = Math.floor(Math.random()*options.length);
    pick = options[index];

        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for(var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);

}

$(".answerchoice").on("click", function () {

    userGuess = parseInt($(this).attr("data-guessvalue"));

    if (userGuess === pick.answer) {
        stop();
        correctCount++;
        userGuess="";
        $("#answerblock").html("<p>Correct!</p>");
        hidepicture();

    } else {
        stop();
        wrongCount++;
        userGuess="";
        $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        hidepicture();
    }
})
}

function hidepicture () {
    $("#answerblock").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    options.splice(index,1);

    var hidpic = setTimeout(function() {
        $("#answerblock").empty();
        timer= 20;

    if ((wrongCount + correctCount + unanswerCount) === qCount) {
        $("#questionblock").empty();
        $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
        $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
        $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
        $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;

    } else {
        runTimer();
        displayQuestion();

    }
    }, 3000);
}

$("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for(var i = 0; i < holder.length; i++) {
        options.push(holder[i]);
    }
    runTimer();
    displayQuestion();

})

})