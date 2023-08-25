setTimeout(function () {}, 600);
for (let raw = 80 + 35; raw <= 420 + 80 + 35; raw = raw + 35) {
  for (let column = 500 + 35; column <= 420 + 500 + 35; column = column + 35) {
    let canvasColor = scancolor(raw, column);
    console.log(canvasColor);
    if ((canvasColor = false)) {
      drawOrangeSqure();
    }
  }
}
function drawOrangeSqure() {
  ctx.beginPath();
  ctx.moveTo(raw - 5, column - 5);
  ctx.lineTo(raw + 5, column - 5);
  ctx.lineTo(raw + 5, column + 5);
  ctx.lineTo(raw - 5, column + 5);
  ctx.fillStyle = "orange";
  ctx.fill();
}
function scancolor(raw, column) {
  let imageData = ctx.getImageData(raw, column, 1, 1);
  let pixelColor = Array.from(imageData.data);
  let red = pixelColor[0];
  let green = pixelColor[1];
  let blue = pixelColor[2];
  let alpha = pixelColor[3];

  if (red === 0 && green === 0 && blue === 0 && alpha === 255) {
    return true;
  } else {
    return false;
  }
}
