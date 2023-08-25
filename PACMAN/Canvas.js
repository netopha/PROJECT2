const canvas = document.getElementById("canvas");

ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(0, 500);
ctx.lineTo(500, 500);
ctx.lineTo(500, 490);
ctx.lineTo(10, 490);
ctx.lineTo(10, 0);
ctx.fillStyle = "blue";
ctx.fill();

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(500, 0);
ctx.lineTo(500, 500);
ctx.lineTo(490, 500);
ctx.lineTo(490, 10);
ctx.lineTo(0, 10);
ctx.fill();

ctx.beginPath();
ctx.moveTo(220, 70);
ctx.lineTo(70, 70);
ctx.lineTo(70, 220);
ctx.lineTo(80, 220);
ctx.lineTo(80, 80);
ctx.lineTo(220, 80);
ctx.fill();

ctx.beginPath();
ctx.moveTo(280, 0);
ctx.lineTo(280, 80);
ctx.lineTo(290, 80);
ctx.lineTo(290, 0);
ctx.fill();

ctx.beginPath();
ctx.moveTo(350, 70);
ctx.lineTo(350, 80);
ctx.lineTo(430, 80);
ctx.lineTo(430, 70);
ctx.fill();

ctx.beginPath();
ctx.moveTo(140, 290);
ctx.lineTo(140, 140);
ctx.lineTo(360, 140);
ctx.lineTo(360, 280);
ctx.lineTo(430, 280);
ctx.lineTo(430, 290);
ctx.lineTo(350, 290);
ctx.lineTo(350, 150);
ctx.lineTo(150, 150);
ctx.lineTo(150, 290);
ctx.fill();

ctx.moveTo(420, 220);
ctx.lineTo(420, 140);
ctx.lineTo(490, 140);
ctx.lineTo(490, 150);
ctx.lineTo(430, 150);
ctx.lineTo(430, 220);
ctx.fill();

ctx.moveTo(210, 210);
ctx.lineTo(210, 290);
ctx.lineTo(290, 290);
ctx.lineTo(290, 210);
ctx.lineTo(280, 210);
ctx.lineTo(280, 280);
ctx.lineTo(220, 280);
ctx.lineTo(220, 210);
ctx.fill();

ctx.moveTo(0, 280);
ctx.lineTo(80, 280);
ctx.lineTo(80, 430);
ctx.lineTo(70, 430);
ctx.lineTo(70, 290);
ctx.lineTo(0, 290);
ctx.fill();

ctx.moveTo(140, 430);
ctx.lineTo(140, 350);
ctx.lineTo(360, 350);
ctx.lineTo(360, 360);
ctx.lineTo(150, 360);
ctx.lineTo(150, 430);
ctx.fill();

ctx.moveTo(210, 420);
ctx.lineTo(290, 420);
ctx.lineTo(290, 500);
ctx.lineTo(280, 500);
ctx.lineTo(280, 430);
ctx.lineTo(210, 430);
ctx.fill();

ctx.moveTo(350, 420);
ctx.lineTo(420, 420);
ctx.lineTo(420, 350);
ctx.lineTo(500, 350);
ctx.lineTo(500, 360);
ctx.lineTo(430, 360);
ctx.lineTo(430, 430);
ctx.lineTo(350, 430);
ctx.fill();

function drawOrangeSqure(raw, column) {
  ctx.beginPath();
  ctx.moveTo(raw - 3, column - 3);
  ctx.lineTo(raw + 3, column - 3);
  ctx.lineTo(raw + 3, column + 3);
  ctx.lineTo(raw - 3, column + 3);
  ctx.fillStyle = "orange";
  ctx.fill();
}
function scancolor(raw, column, color) {
  let imageData = ctx.getImageData(raw, column, 1, 1);
  let pixelColor = Array.from(imageData.data);
  let red = pixelColor[0];
  let green = pixelColor[1];
  let blue = pixelColor[2];
  let alpha = pixelColor[3];
  if (color == "blue") {
    if (red === 0 && green === 0 && blue === 255 && alpha === 255) {
      return true;
    } else {
      return false;
    }
  }
  if (color == "orange") {
    if (red === 255 && green === 165 && blue === 0 && alpha === 255) {
      return true;
    } else {
      return false;
    }
  }
}
drawDotsOnScreen();
function drawDotsOnScreen() {
  for (let column = 40; column <= 420 + 40; column = column + 35) {
    for (let raw = 40; raw <= 420 + 40; raw = raw + 35) {
      let canvasColor = scancolor(raw, column, "blue");
      console.log(canvasColor);
      if (canvasColor == false) {
        drawOrangeSqure(raw, column);
      }
    }
  }
}
