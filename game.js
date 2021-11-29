buttonColors = ["red", "blue", "green", "yellow"]
gamePattern = []
userClickedPattern = []
started = false
level = 0

$('.btn').on("click", function () {
    // get id of the button that is being clicked
    var userIdColor = $(this).attr('id')
    userClickedPattern.push(userIdColor)

    // play sound when button is clicked
    playSound(userIdColor)

    // make button look pressed
    animatePress(userIdColor)
})

$(document).on("keydown", function () {
    if (!started) {
        $('#level-title').text("Level: " + level)
        nextSequence()
        started = true
    }
})

function nextSequence() {
    // increase level by one when next sequence is called
    level++
    // update h1 with change in level
    $('#level-title').text('Level: ' + level)
    // Create random number between 0 and 4
    randomNumber = Math.floor(Math.random() * 4)
    // randomly choose button color
    randomChosenColor = buttonColors[randomNumber]
    // add random colour to game pattern array
    gamePattern.push(randomChosenColor)

    // add flash animation to button color selected
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

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

