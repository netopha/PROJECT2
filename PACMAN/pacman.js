let Position = 1;
let canvasX = 500;
let canvasY = 80;

function handleKeyDown(data) {
  if (data == "ArrowRight") {
    movePacmanRight();
  }
  if (data == "ArrowLeft") {
    movePacmanLeft();
  }
  if (data == "ArrowUp") {
    movePacmanUp();
  }
  if (data == "ArrowDown") {
    movePacmanDown();
  }
}

function movePacmanRight() {
  const pacMan = document.getElementById("pacman");
  let topPacman = pacMan.style.top;
  topPacman = parseInt(topPacman);
  let leftPacman = pacMan.style.left;
  leftPacman = parseInt(leftPacman);
  console.log(leftPacman, topPacman);
  leftPacman = leftPacman + 10;

  if (Position != 1) {
    pacMan.style.transition = "transform 0.5s";
    pacMan.style.transformOrigin = "center";
    pacMan.style.transform = "rotateY(0deg)";
    Position = 1;
  }
  const wall = scanRight(topPacman, leftPacman, "blue");
  if (wall == false) {
    leftPacman = leftPacman + "px";
    pacMan.style.left = leftPacman;
    drawBlackSqure(leftPacman, topPacman);
    scanForOrange();
  }
}

function movePacmanLeft() {
  const pacMan = document.getElementById("pacman");
  let topPacman = pacMan.style.top;
  topPacman = parseInt(topPacman);

  let leftPacman = pacMan.style.left;
  leftPacman = parseInt(leftPacman);
  leftPacman = leftPacman - 10;

  if (Position != 3) {
    pacMan.style.transition = "transform 0.5s";
    pacMan.style.transformOrigin = "center";
    pacMan.style.transform = "rotateY(180deg)";
    Position = 3;
  }

  const wall = scanLeft(topPacman, leftPacman, "blue");
  if (wall == false) {
    leftPacman = leftPacman + "px";
    pacMan.style.left = leftPacman;
    drawBlackSqure(leftPacman, topPacman);
    scanForOrange();
  }
}

function movePacmanUp() {
  const pacMan = document.getElementById("pacman");
  let topPacman = pacMan.style.top;
  topPacman = parseInt(topPacman);
  topPacman = topPacman - 10;
  let leftPacman = pacMan.style.left;
  leftPacman = parseInt(leftPacman);

  if (Position != 2) {
    pacMan.style.transition = "transform 0.5s";
    pacMan.style.transform = "rotate(-90deg)";
    Position = 2;
  }
  const wall = scanUp(topPacman, leftPacman, "blue");
  if (wall == false) {
    topPacman = topPacman + "px";
    pacMan.style.top = topPacman;
    drawBlackSqure(leftPacman, topPacman);
    scanForOrange();
  }
}

function movePacmanDown() {
  const pacMan = document.getElementById("pacman");
  let topPacman = pacMan.style.top;
  topPacman = parseInt(topPacman);
  topPacman = topPacman + 10;
  let leftPacman = pacMan.style.left;
  leftPacman = parseInt(leftPacman);
  leftPacman = leftPacman;

  if (Position != 4) {
    pacMan.style.transition = "transform 0.5s";
    pacMan.style.transform = "rotate(90deg)";
    Position = 4;
  }

  const wall = scanDown(topPacman, leftPacman, "blue");
  if (wall == false) {
    topPacman = topPacman + "px";
    pacMan.style.top = topPacman;
    drawBlackSqure(leftPacman, topPacman);
    scanForOrange();
  }
}

function scanDown(topIcon, leftIcon, color) {
  let x = leftIcon - canvasX;
  let y = topIcon - canvasY + 45;
  for (x = x - 10; x < leftIcon - canvasX + 50; x = x + 9) {
    let imageData = ctx.getImageData(x, y, 1, 1);
    let pixelColor = Array.from(imageData.data);
    let red = pixelColor[0];
    let green = pixelColor[1];
    let blue = pixelColor[2];
    let alpha = pixelColor[3];
    if (color == "blue") {
      if (red === 0 && green === 0 && blue === 255 && alpha === 255) {
        return true;
      }
    }
    if (color == "black") {
      if (red === 0 && green === 0 && blue === 0 && alpha === 0) {
        return true;
      }
    }
  }
  return false;
}

function scanUp(topIcon, leftIcon, color) {
  let x = leftIcon - canvasX;
  let y = topIcon - canvasY - 5;
  for (x = x - 10; x < leftIcon - canvasX + 50; x = x + 9) {
    let imageData = ctx.getImageData(x, y, 1, 1);
    let pixelColor = Array.from(imageData.data);
    let red = pixelColor[0];
    let green = pixelColor[1];
    let blue = pixelColor[2];
    let alpha = pixelColor[3];
    if (color == "blue") {
      if (red === 0 && green === 0 && blue === 255 && alpha === 255) {
        return true;
      }
    }
    if (color == "black") {
      if (red === 0 && green === 0 && blue === 0 && alpha === 0) {
        return true;
      }
    }
  }
  return false;
}

function scanLeft(topIcon, leftIcon, color) {
  let x = leftIcon - canvasX - 5;
  let y = topIcon - canvasY;
  const colortoserch = color;
  for (y = y - 10; y < topIcon - canvasY + 50; y = y + 9) {
    let imageData = ctx.getImageData(x, y, 1, 1);
    let pixelColor = Array.from(imageData.data);
    let red = pixelColor[0];
    let green = pixelColor[1];
    let blue = pixelColor[2];
    let alpha = pixelColor[3];
    if (color == "blue") {
      if (red === 0 && green === 0 && blue === 255 && alpha === 255) {
        return true;
      }
    }
    if (color == "black") {
      if (red === 0 && green === 0 && blue === 0 && alpha === 0) {
        return true;
      }
    }
  }
  return false;
}
function scanRight(topIcon, leftIcon, color) {
  let x = leftIcon - canvasX + 45;
  let y = topIcon - canvasY;
  for (y = y - 10; y < topIcon - canvasY + 50; y = y + 9) {
    let imageData = ctx.getImageData(x, y, 1, 1);
    let pixelColor = Array.from(imageData.data);
    let red = pixelColor[0];
    let green = pixelColor[1];
    let blue = pixelColor[2];
    let alpha = pixelColor[3];
    if (color == "blue") {
      if (red === 0 && green === 0 && blue === 255 && alpha === 255) {
        return true;
      }
    }
    if (color == "black") {
      if (red === 0 && green === 0 && blue === 0 && alpha === 0) {
        return true;
      }
    }
  }
  return false;
}
function drawBlackSqure(leftPacman, topPacman) {
  /*  debugger; */
  topPacman = parseInt(topPacman);
  leftPacman = parseInt(leftPacman);
  let column = topPacman - 80 + 20;
  let raw = leftPacman - 500 + 20;
  ctx.beginPath();
  ctx.moveTo(raw - 5, column - 5);
  ctx.lineTo(raw + 5, column - 5);
  ctx.lineTo(raw + 5, column + 20);
  ctx.lineTo(raw - 5, column + 20);
  ctx.fillStyle = "black";
  ctx.fill();
}
function scanForOrange() {
  for (let column = 40; column <= 420 + 40; column = column + 35) {
    for (let raw = 40; raw <= 420 + 40; raw = raw + 35) {
      let canvasColor = scancolor(raw, column, "orange");
      console.log(canvasColor);
      if (canvasColor == true) return;
    }
  }
  gameOverVar = true;
  youWon();
}
