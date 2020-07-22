var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1, userChosenColor);
    animatePress(userChosenColor);
});

function checkAnswer(currentLevel, userChosenColor) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        playSound(userChosenColor);
        if (userClickedPattern.length === gamePattern.length){  
            setTimeout(function () {
              nextSequence();
            }, 1000);    
          }
    } else {
        playSound("wrong");
       
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200); 

        $("#level-title").text("Game Over. Press Enter to Try Again.");

        startOver();
    } 
};

function nextSequence() {
    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4 );
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    // loops over array and animates each button with an .8 second delay
    gamePattern.forEach((element, i) => {
        setTimeout(() => {
          animateButton(element);
        }, i * 650);
      });
      
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();    
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
};

function animateButton(element) {
    console.log(element);
    playSound(element);    
    $("#" + element).fadeOut(100).fadeIn(100);
};