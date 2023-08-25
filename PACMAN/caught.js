setTimeout(gotYou, 1000);
function gotYou() {
  const redGhost = document.getElementById("ghostred");
  let topRedGhost = redGhost.style.top;
  topRedGhost = parseInt(topRedGhost);
  let leftRedGhost = redGhost.style.left;
  leftRedGhost = parseInt(leftRedGhost);

  const Pacman = document.getElementById("pacman");
  let toppacman = Pacman.style.top;
  toppacman = parseInt(toppacman);
  let leftpacman = Pacman.style.left;
  leftpacman = parseInt(leftpacman);

  if (
    Math.abs(topRedGhost) - Math.abs(toppacman) < 40 &&
    Math.abs(leftRedGhost) - Math.abs(leftpacman) < 40
  ) {
  }
}
