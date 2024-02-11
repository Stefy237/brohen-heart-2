var score = 0;
var lives = 4;
var drop = 1;
var click = 0;

/*
var username;
var pseudo;
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  username = document.getElementById("name").value;
  pseudo = document.getElementById("pseudo").value;
});*/

var gameArea = document.getElementById("game-area");

function createHeart() {
  var heart = document.createElement("div");
  heart.className = "heart";

  if (lives <= 5 && Math.random() > 0.95) {
    heart.classList.add("golden-heart");
  } else {
    heart.classList.add("red-heart");
  }

  heart.style.left = Math.random() * 350 + "px";
  gameArea.appendChild(heart);

  var heartInterval = setInterval(() => {
    var heartPosition = heart.offsetTop;
    var gameAreaHeight = gameArea.offsetHeight;

    if (heartPosition < gameAreaHeight) {
      heart.style.top = heartPosition + drop + "px";
    } else {
      clearInterval(heartInterval);
      lives--;
      document.getElementById("lives").textContent = "Vies: " + lives;

      gameArea.removeChild(heart);
    }

    if (lives === 0) {
      endGame();
    }
  }, 20);

  heart.addEventListener("click", () => {
    heart.classList.add("heart-exit");

    if (heart.classList.contains("red-heart")) {
      score++;
      heart.classList.remove("red-heart");
      heart.classList.add("broken-red-heart");
      updateDifficulty();
    } else if (heart.classList.contains("golden-heart")) {
      lives++;
      heart.classList.remove("golden-heart");
      heart.classList.add("broken-gold-heart");
    }

    setTimeout(() => {
      gameArea.removeChild(heart);
      click = 1;
    }, 1000);

    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("lives").textContent = "Vies: " + lives;

    //gameArea.removeChild;
  });

  heart.addEventListener("touchstart", () => {
    heart.classList.add("heart-exit");

    if (heart.classList.contains("red-heart")) {
      score++;
      heart.classList.remove("red-heart");
      heart.classList.add("broken-red-heart");
      updateDifficulty();
    } else if (heart.classList.contains("golden-heart")) {
      lives++;
      heart.classList.remove("golden-heart");
      heart.classList.add("broken-gold-heart");
    }

    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("lives").textContent = "Vies: " + lives;

    setTimeout(() => {
      gameArea.removeChild(heart);
      click = 1;
    }, 1000);
  });

  heart.addEventListener("touchend", () => {
    setTimeout(() => {
      gameArea.removeChild(heart);
    }, 1000);
  });

  /* setTimeout(function () {
    gameArea.removeChild(heart);
    if (!heart.classList.contains("golden-heart")) {
      lives--;
      document.getElementById("lives").textContent = "Vies: " + lives;
    }
  }, 3000); // Supprime le cœur après 3 secondes
  */
}

document.addEventListener("DOMContentLoaded", function () {
  const playerImg = document.getElementById("player-img");

  document.addEventListener("click", function (event) {
    const x = event.offsetX;
    const y = event.offsetY;

    movePlayer(x, y);
  });

  // Fonction pour déplacer le joueur
  function movePlayer(x, y) {
    playerImg.style.transition = "left 0.3s, top 0.3s";
    playerImg.style.left = x + "px";
    playerImg.style.top = y + "px";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const playerImg = document.getElementById("player-img");
  const hearts = document.getElementsByClassName("heart");

  // Gestion des événements de clic pour les appareils tactiles
  document.addEventListener("touchstart", function (event) {
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;

    movePlayer(x, y);
  });

  // Fonction pour déplacer le joueur
  function movePlayer(x, y) {
    playerImg.style.transition = "left 0.3s, top 0.3s";
    playerImg.style.left = x + "px";
    playerImg.style.top = y + "px";
  }

  function checkCollision() {
    const playerRect = playerImg.getBoundingClientRect();

    for (let i = 0; i < hearts.length; i++) {
      const heartRect = hearts[i].getBoundingClientRect();

      if (
        playerRect.left - 10 < heartRect.right &&
        playerRect.right + 10 > heartRect.left &&
        playerRect.top - 10 < heartRect.bottom &&
        playerRect.bottom + 10 > heartRect.top &&
        b === 0
      ) {
        endGame();
        break;
      }
    }
  }

  setInterval(checkCollision, 10);
});

function endGame() {
  clearInterval(createHeart);
  // export const finalScore = score;
  window.location.href = "lost-page.html";
}

intervalId = setInterval(createHeart, 1500);

function updateDifficulty() {
  if (score > 10 && score <= 20) {
    clearInterval(intervalId);
    intervalId = setInterval(createHeart, 1500);
    drop = 2;
  } else if (score > 20 && score <= 40) {
    clearInterval(intervalId);
    intervalId = setInterval(createHeart, 1000);
    drop = 4;
  } else if (score > 60) {
    clearInterval(intervalId);
    intervalId = setInterval(createHeart, 1000);
    drop = 8;
  }
}
