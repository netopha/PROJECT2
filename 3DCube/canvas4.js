window.onload = function () {
  /*  debugger; */
  const body = document.body;

  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  canvas.style.top = body.offsetWidth / 2 - 300 + "px";
  canvas.style.left = body.offsetHeight / 2 - 300 + "px";
  const centerCanvasX = 300;
  const centerCanvasY = 300;
  const angleDiractionX = [0, 90, 180, 270, 0, 90, 180, 270];
  const angleDiractionY = [0, 0, 90, 90, 270, 270, 180, 180];
  const angleDiractionXZ = [180, 180, 180, 180, 0, 0, 0, 0];
  const angleDiractionYZ = [180, 0, 0, 180, 180, 0, 0, 180];
  const cube = {
    centerX: 300,
    centerY: 300,
    centerZ: 300,
    vertices: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    angleX: 0,
    angleY: 0,
    angleZ: 0,

    radius: 150,
  };
  calculateVerticesDirectionX();
  function calculateVerticesDirectionX() {
    drawCube("gray", 5);
    cube.vertices.forEach((value, index) => {
      cube.vertices[index][0] =
        cube.centerX +
        cube.radius *
          Math.sin((cube.angleY + angleDiractionXZ[index]) * (Math.PI / 180)) +
        cube.radius *
          Math.sin((cube.angleX + angleDiractionX[index]) * (Math.PI / 180));

      cube.vertices[index][1] =
        cube.centerY +
        (cube.radius / 2) *
          Math.cos((cube.angleY + angleDiractionXZ[index]) * (Math.PI / 180)) +
        cube.radius *
          Math.cos((cube.angleX + angleDiractionX[index]) * (Math.PI / 180)) *
          Math.cos(60 * (Math.PI / 180));
    });
    drawCube("black", 2);
  }
  window.addEventListener("keydown", (ev) => {
    ev.preventDefault();

    switch (ev.key) {
      case "ArrowUp":
        cube.angleY -= 10;
        calculateVerticesDirectionX();
        break;
      case "ArrowRight":
        cube.angleX += 10;

        calculateVerticesDirectionX();
        break;
      case "ArrowDown":
        cube.angleY += 10;
        calculateVerticesDirectionX();
        break;
      case "ArrowLeft":
        cube.angleX -= 10;

        calculateVerticesDirectionX();
        break;
    }
  });
  /* function calculateVerticesDirectionX() {
    drawCube("gray", 5);
    cube.vertices.forEach((value, index) => {
      cube.vertices[index][0] =
        cube.centerX +
        cube.radius *
          Math.sin((cube.angleY + angleDiractionY[index]) * (Math.PI / 180)) +
        cube.radius *
          Math.sin((cube.angleX + angleDiractionX[index]) * (Math.PI / 180));

      cube.vertices[index][1] =
        cube.centerY +
        (cube.radius / 2) *
          Math.cos((cube.angleY + angleDiractionY[index]) * (Math.PI / 180)) +
        cube.radius *
          Math.cos((cube.angleX + angleDiractionX[index]) * (Math.PI / 180)) *
          Math.cos(60 * (Math.PI / 180));
      
    });
    console.log(cube.vertices);
    drawCube("black", 2);
  } */
  function calculateVerticesDirectionY() {
    drawCube("gray", 5);
    cube.vertices.forEach((value, index) => {
      /* cube.vertices[index][0] =
        cube.centerX +
        cube.radius *
          Math.sin(cube.angleY + angleDiractionY[index] * (Math.PI / 180)) +
        (cube.radius / 2) *
          Math.sin((cube.angleX + angleDiractionYZ[index]) * (Math.PI / 180)); */
      cube.vertices[index][1] =
        cube.centerY +
        cube.radius *
          Math.cos(cube.angleY + angleDiractionY[index] * (Math.PI / 180)) +
        cube.radius *
          Math.cos((cube.angleX + angleDiractionYZ[index]) * (Math.PI / 180));
    });
    console.log(cube.vertices);
    drawCube("black", 2);
  }

  function drawCube(color, width) {
    ctx.fillStyle = "greenyellow";
    ctx.fillRect(300, 300, 10, 10);
    ctx.fillStyle = "red";
    ctx.fillRect(
      cube.vertices[0][0],
      cube.vertices[0][1],

      22,
      22
    );
    ctx.fillStyle = "green";
    ctx.fillRect(
      cube.vertices[1][0],
      cube.vertices[1][1],

      18,
      18
    );
    ctx.fillStyle = "blue";
    ctx.fillRect(
      cube.vertices[2][0],
      cube.vertices[2][1],

      22,
      22
    );
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      cube.vertices[3][0],
      cube.vertices[3][1],

      18,
      18
    );
    ctx.fillStyle = "orange";
    ctx.fillRect(
      cube.vertices[4][0],
      cube.vertices[4][1],

      8,
      8
    );
    ctx.fillStyle = "purple";
    ctx.fillRect(
      cube.vertices[5][0],
      cube.vertices[5][1],

      8,
      8
    );
    ctx.fillStyle = "rgb(76, 149, 213)";
    ctx.fillRect(
      cube.vertices[6][0],
      cube.vertices[6][1],

      18,
      18
    );
    ctx.fillStyle = "pink";
    ctx.fillRect(
      cube.vertices[7][0],
      cube.vertices[7][1],

      8,
      8
    );
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(cube.vertices[0][0], cube.vertices[0][1]);
    ctx.lineTo(cube.vertices[1][0], cube.vertices[1][1]);
    ctx.lineTo(cube.vertices[2][0], cube.vertices[2][1]);
    ctx.lineTo(cube.vertices[3][0], cube.vertices[3][1]);
    ctx.lineTo(cube.vertices[0][0], cube.vertices[0][1]);
    ctx.lineTo(cube.vertices[4][0], cube.vertices[4][1]);
    ctx.lineTo(cube.vertices[5][0], cube.vertices[5][1]);
    ctx.lineTo(cube.vertices[6][0], cube.vertices[6][1]);
    ctx.lineTo(cube.vertices[7][0], cube.vertices[7][1]);
    ctx.lineTo(cube.vertices[4][0], cube.vertices[4][1]);
    ctx.moveTo(cube.vertices[1][0], cube.vertices[1][1]);
    ctx.lineTo(cube.vertices[5][0], cube.vertices[5][1]);
    ctx.moveTo(cube.vertices[2][0], cube.vertices[2][1]);
    ctx.lineTo(cube.vertices[6][0], cube.vertices[6][1]);
    ctx.moveTo(cube.vertices[3][0], cube.vertices[3][1]);
    ctx.lineTo(cube.vertices[7][0], cube.vertices[7][1]);
    ctx.stroke();
  }
};
