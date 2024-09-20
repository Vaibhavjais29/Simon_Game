// alert("working");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function () {
    var userClickedButton = this.id;
    userClickedPattern.push(userClickedButton);
    // console.log(userClickedPattern);
    playSound(userClickedButton);
    animatePress(userClickedButton);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
    if(started === false) {
        // $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})


function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(userClickedPattern);
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            console.log("Correct!");
            setTimeout(function(){
                userClickedPattern.length=0;
                nextSequence();
            },1000);  
        }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    level++;
    $("#level-title").text("level "+ level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor =  buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    },100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}





