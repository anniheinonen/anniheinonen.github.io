function getRandomInteger() {
    'use strict';
    return (Math.floor(Math.random() * 10));
}
var randomNumber = getRandomInteger();

function compareNumbers(first, second) {
    if (first == second) {
        return (true);
    } else {
        return (false);
    }
}

function guessTheNumber() {
    'use strict';
    var y = document.getElementById("number").value;
    if (y <= 10 && y > 0 && Number.isInteger(randomNumber)) {
        if (compareNumbers(randomNumber, y)) {
            window.alert("You guessed right!");
        } else {
            window.alert("You guessed wrong!");
        }
    } else {
        window.alert("Invalid input");
    }
    randomNumber = getRandomInteger();  
}


