var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0

$(document).on("keydown", function () {
    if (!started) {
        $('#level-title').text("Level: " + level)
        nextSequence()
        started = true
    }
})

$('.btn').on("click", function () {
    // get id of the button that is being clicked
    var userChosenColor = $(this).attr('id')
    userClickedPattern.push(userChosenColor)

    // play sound when button is clicked
    playSound(userChosenColor)

    // make button look pressed
    animatePress(userChosenColor)

    // check answer from clicks. Last index of clicked value is passed
    checkAnswer(userClickedPattern.length - 1)
})



// Check user answer when the click
function checkAnswer(currentLevel) {
    // check if most recent answer of user is same as game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('Success')

        // check if the current sequence has endede
        if (userClickedPattern.length === gamePattern.length) {
            // call next sequence after some delay
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        // play "wrong" sound
        playSound("wrong")
        // flash the game over effect
        $("body").addClass("game-over")
        // remove after 200 milliseconds
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)

        // Change the heading
        $('h1').text("Game Over, Press Any Key to Restart")

        // start the game over
        startOver()

        console.log("wrong")
    }

}

function nextSequence() {
    // for a new sequence userClickedPattern should be emepty
    userClickedPattern = []

    // increase level by one when next sequence is called
    level++
    // update h1 with change in level
    $('#level-title').text('Level: ' + level)
    // Create random number between 0 and 4
    var randomNumber = Math.floor(Math.random() * 4)
    // randomly choose button color
    var randomChosenColor = buttonColors[randomNumber]
    // add random colour to game pattern array
    gamePattern.push(randomChosenColor)

    // add flash animation to button color selected
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)

    // play sound of button selected
    playSound(randomChosenColor)

}

// play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColor) {
    // add pressed class to button
    $("#" + currentColor).addClass('pressed')

    // remove after few seconds
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed')
    }, 100)

}

function startOver() {
    gamePattern = []
    userClickedPattern = []
    level = 0
    started = false
}