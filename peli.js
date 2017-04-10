// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 550;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "metsa.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "kissa.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "lumiukko.png";

var plusReady = false;
var plusImage = new Image();
plusImage.onload = function () {
	plusReady = true;
};
plusImage.src = "plus.png";

var minusReady = false;
var minusImage = new Image();
minusImage.onload = function () {
	minusReady = true;
};
minusImage.src = "minus.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monster2 = {};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

var touching = false;

// Update game objects
var playerRightSide = hero.x + 60; 
var update = function (modifier) {
	if (38 in keysDown && hero.y > 0) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown && hero.y < 430) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown && hero.x > 0) { // Player holding left
        hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown && hero.x < 490) { // Player holding right
		hero.x += hero.speed * modifier;
	}
    
	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
            && monster.x <= (hero.x + 40)
            && hero.y <= (monster.y + 40)
            && monster.y <= (hero.y + 40)
	) {
        touching = true;
    } else {
        touching = false;
    }
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y, 60, 60);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y, 60, 60);
    }
    
    if (plusReady) {
        ctx.drawImage(plusImage, 10, 440, 30, 30);
    }
    
    if (minusReady) {
        ctx.drawImage(minusImage, 50, 440, 30, 30);
    }
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
    if (touching) {
        random = parseInt(Math.random() * 8);
    }
    move();

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var moveE = function () {
    if (monster.x >= 3) {
        monster.x -= 3;
    } else {
        random = parseInt(Math.random() * 8);
    }
};

var moveNE = function () {
    if (monster.x >= 2 && monster.y >= 2) {
        monster.x -= 2;
        monster.y -= 2;
    } else {
        random = parseInt(Math.random() * 8);
    }
};

var moveN = function () {
    if (monster.y >= 3) {
        monster.y -= 3;
    } else {
        random = parseInt(Math.random() * 8);
    }
};

var moveNW = function () {
    if (monster.x <= 487 && monster.y >= 2) {
        monster.x += 2;
        monster.y -= 2;
    } else {
        random = parseInt(Math.random() * 8);
    }
};

var moveW = function () {
    if (monster.x <= 488) {
        monster.x += 3;
    } else {
        random = parseInt(Math.random() * 8);
    }
};

var moveSW = function () {
    if (monster.x <= 487 && monster.y <= 427) {
        monster.x += 2;
        monster.y += 2;
    } else {
        random = parseInt(Math.random() * 8);
    }
};

var moveS = function () {
    if (monster.y <= 428) {
        monster.y += 3;
    } else {
        random = parseInt(Math.random() * 8);
    }
};

var moveSE = function () {
    if (monster.x >= 2 && monster.y <= 427) {
        monster.x -= 2;
        monster.y += 2;
    } else {
        random = parseInt(Math.random() * 8);
    }
};

var random = parseInt(Math.random() * 8);

var move = function () {
    if (random === 1) {
        moveE();
    } else if (random === 2) {
        moveNE();
    } else if (random === 3) {
        moveN();
    } else if (random === 4) {
        moveNW();
    } else if (random === 5) {
        moveW();
    } else if (random === 6) {
        moveSW();
    } else if (random === 7) {
        moveS();
    } else {
        moveSE();
    }
};

var moreSpeed = function () {
    hero.speed += 10;
};

var lessSpeed = function () {
    hero.speed -= 10; 
};

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

var click = function (X, Y) {
    if (X >= monster.x  && X <= monster.x + 60 && Y <= monster.y + 60) {
       monsterReady = false;
} else if (X >= 10 && X <= 40 && Y >= 450) {
    moreSpeed();
} else if (X > 45 && X < 90 && Y >= 450) {
    lessSpeed();
}
};

canvas.addEventListener("mousedown", function(e){
     click(getMousePos(canvas,e).x, getMousePos(canvas,e).y);
  });

// Let's play this game!
var then = Date.now();
reset();
main();
