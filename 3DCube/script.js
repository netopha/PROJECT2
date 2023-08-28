/* import { drawEdge1 } from "./canvas.js"; */
const body = document.body;
const centerX = body.offsetWidth / 2;
const centerY = body.offsetHeight / 2;
const cartesian = document.querySelector("#Cartesian");
/* cartesian.style.top = centerY - 300 + "px";
cartesian.style.left = centerX - 300 + "px"; */
let widthA = 200;
let heightA = 200;
/* drawEdge1(); */
window.addEventListener("keydown", (ev) => {
  ev.preventDefault();

  switch (ev.key) {
    case "ArrowUp":
      rotate("up");
      break;
    case "ArrowRight":
      rotate("right");
      break;
    case "ArrowDown":
      rotate("down");
      break;
    case "ArrowLeft":
      rotate("left");
      break;
  }
});
function rotate(dir) {
  if (dir == "left") {
    console.log(dir);

    divA.style.transform = "skew(30deg)";
  }
}
