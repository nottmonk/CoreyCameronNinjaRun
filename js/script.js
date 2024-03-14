const player = document.querySelector(".Nin");
const enemy = document.getElementById("obst");
let highScore = document.getElementById("hScore");
enemy.classList.add("speedStart");
const distant = document.getElementById("dist");
const game = document.getElementById("game");
const bckImg = document.getElementById("bckImg");

let startDistance = 0;
let score = localStorage.getItem("distance") || 0;

//movement functions to get player to jump
function Jump() {
  if (player.classList != "jmp") {
    player.classList.add("jmp");

    setTimeout(function () {
      player.classList.remove("jmp");
    }, 800);
  }
}

function speedUp() {
  if (startDistance >= 100) {
    enemy.classList.remove("speedStart");
    enemy.classList.add("speedFirst");
  }
  if (startDistance >= 300) {
    enemy.classList.remove("speedFirst");
    enemy.classList.add("speedSecond");
  }
  if (startDistance >= 450) {
    enemy.classList.remove("speedSecond");
    enemy.classList.add("speedThird");
  }
  if (startDistance >= 530) {
    enemy.classList.remove("speedThird");
    enemy.classList.add("speedForth");
  }
}

function checkCollision() {
  let enemyBound = enemy.getBoundingClientRect();
  let playerBound = player.getBoundingClientRect();

  // Promises to check if touching
  if (
    playerBound.right >= enemyBound.left &&
    playerBound.left <= enemyBound.right &&
    playerBound.bottom >= enemyBound.top &&
    playerBound.top <= enemyBound.bottom
    // enemyBound.left < playerBound.right -60 &&
    // playerBound.bottom <= enemyBound.top -30
  ) {
    gameOver();
    stopEnemyAnimation();
    checkScore();
    stopBackground();
    // console.log("Collision!");
  } else {
    // playerBound.right <= 30 && playerBound.left <= 10;
    speedUp();
    // console.log("Not touching");
  }
}

isAlive = setInterval(function () {
  checkCollision();
}, 30);

counter = setInterval(function () {
  distant.innerText = `Distances: ${startDistance}`;
  startDistance++;
}, 100);

document.addEventListener("keydown", function (evt) {
  Jump();
});

function gameOver() {
  clearInterval(isAlive);
  clearInterval(counter);
  game.innerHTML = "GameOver";
}

function stopBackground() {
  bckImg.classList.remove("bckImg");
}

function enemyAnimation() {
  startE = window.requestAnimationFrame(enemy);
}

function stopEnemyAnimation() {
  //    stopE = window.cancelAnimationFrame(startE)
  enemy.classList.remove("speedStart");
  enemy.classList.remove("speedFirst");
  enemy.classList.remove("speedSecond");
  enemy.classList.remove("speedThird");
  enemy.classList.remove("speedForth");
}

// function checkScore() {
//   if (parseInt(distant.innerText) >= score) {
//     localStorage.setItem("distance", parseInt(distant.innerText)) ;
//     document.getElementById("hScore").innerHTML = `HighScore:${parseInt(
//       distant.innerText)}`;
//   } else {
//     return;
//   }
// }

function checkScore() {
  if (startDistance >= score) {
    score = startDistance; // Update the score variable
    localStorage.setItem("distance", score);
    document.getElementById("hScore").innerHTML = `highScore${score}`;
  }
}

document.getElementById("hScore").innerHTML = `HighScore:${score}`;

document.getElementById("restartButton").onclick = function () {
  window.location.href = "Startgame.html";
};
