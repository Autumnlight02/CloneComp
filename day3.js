Array.prototype.remove = function (index) {
  this.splice(index, 1);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

for (let i = 0, l = 1000; i < l; i++) {
  document.getElementsByClassName("dancebutton")[0].style.right = i + "%";
}

const audio = document.getElementById("audio");

let scoreElement = document.getElementById("score");
let bar = document.getElementById("bar");

let score = 0;

let config = {
  fps: 60,
  keyspeed: 0.3,
};

let keyLinks = {
  Q: document.getElementById("q"),
  W: document.getElementById("w"),
  E: document.getElementById("e"),
  F: document.getElementById("f"),
};

const game = document.getElementById("game");

setInterval(function () {
  // GAMETICK
  moveKeys();
}, 1000 / config.fps);

let keysActive = [];
let keysDead = [];

function moveKeys() {
  if (keysActive.length === 0) return;

  if (keysActive[0].pos >= 84) {
    // console.log(keysActive[0].key);

    keyLinks["Q"].style.opacity = "0.5";
    keyLinks["W"].style.opacity = "0.5";
    keyLinks["E"].style.opacity = "0.5";
    keyLinks["F"].style.opacity = "0.5";

    keyLinks[keysActive[0].key].style.opacity = "1";
  }

  for (let i = 0, l = keysActive.length; i < l; i++) {
    keysActive[i].pos = keysActive[i].pos + config.keyspeed; // adding one step
    keysActive[i].style.right = keysActive[i].pos + "%";

    if (keysActive[i].pos >= 92) {
      score -= 30;
      scoreElement.textContent = score;
      keysActive[i].style.backgroundColor = "#FF4F64";
      keysActive[i].style.transform = "scale(1.02)";
      keysActive[i].style.opacity = "0";
      keysDead.push(keysActive[i]);
      keysActive.remove(i);
      i--;
      l--;
    }
  }
  for (let i = 0, l = keysDead.length; i < l; i++) {
    //keysDead[i].pos = keysDead[i].pos + config.keyspeed; // adding one step
    //keysDead[i].style.right = keysDead[i].pos + "%";
    if (keysDead[i].pos >= 120) {
      keysDead[i].parentNode.removeChild(keysDead[i]);
      keysDead.remove(i);
      i--;
      l--;
    }
  }
}

// 70 // 84 //90

const mainKey = document.getElementById("danceKey");

function createKey(key, lane = 0) {
  let keyElement = mainKey.cloneNode(true);
  keyElement.children[0].textContent = key;
  keyElement.pos = 0;
  keyElement.key = key;
  bar.appendChild(keyElement);
  keysActive.push(keyElement);
}

let letters = ["W", "Q", "E", "F"];

document.addEventListener("keypress", function (event) {
  for (let i = 0, l = animations.length; i < l; i++) {
    animations[i].style.display = "none";
  }
  animations[getRandomInt(animations.length)].style.display = "block";

  keyLinks["Q"].style.opacity = "0.5";
  keyLinks["W"].style.opacity = "0.5";
  keyLinks["E"].style.opacity = "0.5";
  keyLinks["F"].style.opacity = "0.5";
  if (keysActive[0].key === event.key.toUpperCase()) {
    if (keysActive[0].pos >= 90) {
      failed();
    } else if (keysActive[0].pos >= 84) {
      console.log("perfect");
      score += 120;
      scoreElement.textContent = score;
      keysActive[0].style.backgroundColor = "rgba(252, 215, 13, 1)";
      keysActive[0].style.transform = "scale(1.04)";
      keysActive[0].style.opacity = "0";
      keysDead.push(keysActive.shift());
    } else if (keysActive[0].pos >= 70) {
      score += 50;
      scoreElement.textContent = score;
      console.log("good");

      keysActive[0].style.backgroundColor = "rgba(0, 255, 102, 1)";
      keysActive[0].style.transform = "scale(1.02)";
      keysActive[0].style.opacity = "0";
      keysDead.push(keysActive.shift());
    } else {
      failed();
    }
    //console.log("good job");
    console.log(score);
  } else {
    failed();
  }

  function failed() {
    score -= 50;
    scoreElement.textContent = score;
    keysActive[0].style.backgroundColor = "#FF4F64";
    keysActive[0].style.transform = "scale(1.02)";
    keysActive[0].style.opacity = "0";
    keysDead.push(keysActive.shift());
    console.log("failed");
  }
});

// Time
// 15 // up: 30 // GO: 45 // 1:15 Chilled // 1:35 preparing
// Final: 149 // 2:18 = 138

keyround = 0;

let keyTime = 1000;

let keyMoves;

let animations = [
  document.getElementById("a1"),
  document.getElementById("a2"),
  document.getElementById("a3"),
  document.getElementById("a4"),
  document.getElementById("a5"),
  document.getElementById("a6"),
  document.getElementById("a7"),
  document.getElementById("a8"),
];
for (let i = 0, l = animations.length; i < l; i++) {
  animations[i].style.display = "none";
}
animations[1].style.display = "block";

function danceTick() {
  let time = audio.currentTime;
  let letter = letters[getRandomInt(4)];
  createKey(letter, 0);
  console.log("created");

  if (time >= 155) {
    clearInterval(keyMoves);
    if (score >= 7000) {
      setTimeout(function () {
        document.getElementById("winScreen").style.display = "block";
      }, 4000);
    } else {
      setTimeout(function () {
        document.getElementById("looseScreen").style.display = "block";
      }, 4000);
    }
  }

  if (time >= 140 && keyround === 6) {
    console.log("next");
    keyround = 7;
    keyTime = 850;
    config.keyspeed = 0.3;
    clearInterval(keyMoves);
    keyMoves = setInterval(danceTick, keyTime);
  } else if (time >= 109 && keyround === 5) {
    console.log("next");
    keyround = 6;
    keyTime = 400;
    config.keyspeed = 0.42;
    clearInterval(keyMoves);
    keyMoves = setInterval(danceTick, keyTime);
  } else if (time >= 85 - 10 && keyround === 4) {
    console.log("next");
    keyround = 5;
    keyTime = 1300;
    config.keyspeed = 0.28;
    clearInterval(keyMoves);
    keyMoves = setInterval(danceTick, keyTime);
  } else if (time >= 45 - 10 && keyround === 2) {
    console.log("next");
    keyround = 4;
    keyTime = 600;
    config.keyspeed = 0.35;
    clearInterval(keyMoves);
    keyMoves = setInterval(danceTick, keyTime);
  } else if (time >= 30 - 10 && keyround === 1) {
    console.log("next");
    keyround = 2;
    keyTime = 920;
    config.keyspeed = 0.32;
    clearInterval(keyMoves);
    keyMoves = setInterval(danceTick, keyTime);
  } else if (time >= 15 - 10 && keyround === 0) {
    console.log("next");
    keyround = 1;
    keyTime = 950;
    config.keyspeed = 0.31;
    clearInterval(keyMoves);
    keyMoves = setInterval(danceTick, keyTime);
  }
}

document.getElementById("start").addEventListener("mousedown", function () {
  game.style.display = "block";
  start.style.display = "none";
  score = 0;
  keyMoves = setInterval(danceTick, keyTime);
  audio.play();
  audio.volume = 0.1;
});

document.getElementById("looseScreen").addEventListener("mousedown", function () {
  location.reload();
});
winScreen;
document.getElementById("winScreen").addEventListener("mousedown", function () {
    document.location.href = "/endscene.html"
});
