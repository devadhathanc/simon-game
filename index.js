
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = buttonColours[nextSequence()];
var gamePattern = [];
// gamePattern[gamePattern.length] = randomChosenColour;

console.log(gamePattern);

var level = 1;  

var userClickedColors = []
var sounds = {"green" : "sounds/green.mp3", "blue": "sounds/blue.mp3", "red" : "sounds/red.mp3", "yellow" : "sounds/yellow.mp3", "wrong" : "sounds/wrong.mp3"}
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}

start(level);
$(".btn").on("click", function(event){
    userClickedColors[userClickedColors.length] = (event.target.id);
    playsound(event.target.id);
    animation1(event.target.id);
    if(checkAnswer(userClickedColors.length-1) == 0){
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").toggleClass("game-over");}, 200);
        level = 1;
        userClickedColors = [];
        $("h1").text("Game Over, Press Any Key to Restart");
        start(level);
    }
    if(userClickedColors.length == gamePattern.length){
        userClickedColors = []; 
        setTimeout(()=> nextLevel(++level), 1000);
    }
})
function nextLevel(i ){
    if(i == 1) gamePattern = [];
    $("h1").text("level " + level);
    randomChosenColour = buttonColours[nextSequence()];
    gamePattern[gamePattern.length] = randomChosenColour;
    animation1(randomChosenColour);
    playsound(randomChosenColour);
    
}
function playsound(key){
    var a = new Audio(sounds[key]);
    a.play();
}
function animation1(key){
    $("#"+ key).addClass("pressed");
    setTimeout(function(){$("#"+ key).removeClass("pressed");}, 100);
}

function checkAnswer(i){
    if (gamePattern[i] == userClickedColors[i]){
        return 1;
    }else return 0;

}
function start(level){
    $(document).on("keypress", function(){
        $("h1").text("level "+ level);
        nextLevel(level);
    });
}