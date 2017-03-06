var index = 0;
window.onload = function () {
    'use strict';
    $.getJSON("https://heinona10.firebaseio.com/.json", function (data) {
        console.log(data);
        index = parseInt(localStorage.getItem('indeksi'))
        display();
    });
};

function display() {
    'use strict';
    $.getJSON("https://heinona10.firebaseio.com/.json", function (data) {
        $('#otsikko').hide().html(data.uutiset[index].otsikko).fadeIn(2000)
        $('#paivamaara').hide().html(data.uutiset[index].paivamaara).fadeIn(2000);
        $('#sisalto').hide().html(data.uutiset[index].sisalto).fadeIn(2000);
        localStorage.setItem("indeksi", index)
    });
}

function nextSlide() {
    'use strict';
    if (index < 2) {
        index += 1;
        display();
    } else {
        index = 0;
        display();
    }
}

function previousSlide() {
    'use strict';
    if (index > 0) {
        index -= 1;
        display();
    } else {
        index = 2;
        display();
    }
}

var isPaused = false;
var myVar = setInterval(function () { nextSlide() }, 10000);
function playpause() {
    'use strict';
    if (!isPaused) {    
        window.clearInterval(myVar);
        isPaused = true;
    } else {
        myVar = setInterval(function () { nextSlide() }, 10000);
        isPaused = false;
    }
}

function toggleText(button_id) {
    'use strict'
    if (isPaused) {
        document.getElementById(button_id).textContent = "play";
    } else {
        document.getElementById(button_id).textContent = "pause";
    }
}
