let gameOverVar = false;
let divIndex = document.getElementById("control");
let startButton = document.createElement("button");
let paragraphMessege = document.createElement("p");
paragraphMessege.className = "paragraph";
let startGame = false;
startButton.id = "startBtn";
startButton.textContent = "start";
divIndex.appendChild(startButton);
startButton.addEventListener("click", function () {
  StartNewGame();
  redghost();
});
function gameOver(topRedGhost, leftRedGhost, toppacman, leftpacman) {
  console.log(topRedGhost, leftRedGhost, toppacman, leftpacman);

  startButton.style.display = "block";
  paragraphMessege.style.display = "block";
  paragraphMessege.textContent = "Game  Over";
  divIndex.appendChild(paragraphMessege);
}
function youWon() {
  startButton.style.display = "block";
  paragraphMessege.style.display = "block";
  paragraphMessege.textContent = "You Won";
  divIndex.appendChild(paragraphMessege);
}
function StartNewGame() {
  gameOverVar = false;
  startButton.style.display = "none";
  paragraphMessege.style.display = "none";
  const redGhost = document.getElementById("ghostred");

  const Pacman = document.getElementById("pacman");

  Pacman.style.top = "310px";
  Pacman.style.left = "730px";
  redGhost.style.top = "100px";
  redGhost.style.left = "940px";
  drawDotsOnScreen();
}
