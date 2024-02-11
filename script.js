var score = 0;
var lives = 4;
var dropTime = 20;
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
      heart.style.top = heartPosition + 1 + "px";
    } else {
      clearInterval(heartInterval);
      lives--;
      document.getElementById("lives").textContent = "Vies: " + lives;

      gameArea.removeChild(heart);
    }

    if (lives === 0) {
      clearInterval(createHeart);
      // export const finalScore = score;
      window.location.href = "lost-page.html";
    }
  }, dropTime);

  heart.addEventListener("click", () => {
    heart.classList.add("heart-exit");

    setTimeout(() => {
      gameArea.removeChild(heart);
    }, 1000);

    if (heart.classList.contains("red-heart")) {
      score++;
      heart.style.backgroundImage = "url('./images/broken-red-heart.png')";
    } else if (heart.classList.contains("golden-heart")) {
      lives++;
      heart.style.backgroundImage = "url('./images/broken-gold-heart.png')";
    }

    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("lives").textContent = "Vies: " + lives;

    //gameArea.removeChild;
  });

  heart.addEventListener("touchstart", () => {
    heart.classList.add("heart-exit");

    if (heart.classList.contains("red-heart")) {
      score++;
      heart.style.backgroundImage = "url('./images/broken-red-heart.png')";
    } else if (heart.classList.contains("golden-heart")) {
      lives++;
      heart.style.backgroundImage = "url('./images/broken-gold-heart.png')";
    }

    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("lives").textContent = "Vies: " + lives;
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

if (score <= 10) {
  setInterval(createHeart, 1500);
} else if (score > 10 && score <= 20) {
  clearInterval(createHeart);
  setInterval(createHeart, 1000);
  dropTime = 10;
} else if (score > 20 && score <= 40) {
  clearInterval(createHeart);
  setInterval(createHeart, 1000);
  dropTime = 7;
} else if (score > 60) {
  clearInterval(createHeart);
  setInterval(createHeart, 500);
  dropTime = 5;
}
