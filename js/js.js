//Declare Variable
var buttonColours = ["leftdot", "rightdot", "bottomleftdot", "bottomrightdot"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

//Declare start using
$(".btn").attr("disabled","true");
$("#explain").hide();

// start game
$("#enter").on( "click", function() {

	if(!start){	

		$("h1").html("Level " + level);
		$('.btn').removeAttr('disabled');
		$("body").removeClass("game-over");
		nextSequence();
		start = true;
	};

});

// Rules show button
$("#rules").on("click", function () {

	$("#explain").toggle();

} );

// Simon button
$(".btn").on( "click", function() {

	var userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);
	// call playSound() function
	playSound(userChosenColour);	
	$("#" + userChosenColour).fadeOut(100).fadeIn(100);
	// call animatePress() function	
	animatePress(userChosenColour);
	// call checkAnswer() function
	checkAnswer(userClickedPattern.length - 1);	
	
} );

// function to check correct answer
function checkAnswer(currentLevel) {
	// if the random color is equal to user click color
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
			// if lenth of both array is equal
			if (userClickedPattern.length === gamePattern.length){

				setTimeout(function() {
					// call the next random color
					nextSequence();
					}, 1000);
			};
	} else {
		// wrong answer
		$("h1").html("Game Over<br>Press \"Enter\" to restart");
		playSound("wrong");
		$("body").addClass("game-over");
		$(".btn").attr("disabled","true");
		// call startOver function to start all variable 
		startOver();		
	}; 
};

// function to generate a new random number
function nextSequence() {

	userClickedPattern = [];

	level = level+1;
	$("h1").html("Level " + level);		

	var randomNumber = Math.floor(Math.random()*4);	
	var randomChosenColour = buttonColours[randomNumber];
	// push a new color inside the array
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
	animatePress(randomChosenColour)

};

// function to play the sound
function playSound(name) {
	var audio = new Audio("./sounds/" + name + ".mp3");
	audio.play();
};

// function to animate the press button
function animatePress(currentColour) {
	
	var delaySecond = 100; //0.01 second

	$( " ."+ currentColour + " " ).addClass( "pressed" );

	setTimeout(function() {
		$( " ."+ currentColour + " " ).removeClass( "pressed" );
	}, delaySecond);
};

// Function to restart the game
function startOver(){
	gamePattern = [];
	level = 0;
	start = false;

};
