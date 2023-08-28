window.onload = function () {
  /*  debugger; */
  const body = document.body;

  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  canvas.style.top = body.offsetWidth / 2 - 300 + "px";
  canvas.style.left = body.offsetHeight / 2 - 300 + "px";
  const centerCanvasX = 300;
  const centerCanvasY = 300;
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
    angleDiractionX: [180, 180, 270, 270, 90, 90, 0, 0],
    angleDiractionY: [270, 180, 180, 270, 0, 90, 90, 0],
    angleZDiraction: [0, 90, 180, 270, 0, 90, 180, 270],
    radius: 200,
  };

  cube.vertices.forEach((value, index) => {
    cube.vertices[index][0] =
      cube.centerX +
      cube.radius *
        Math.sin(
          (cube.angleX + cube.angleDiractionX[index]) * (Math.PI / 180)
        ) *
        Math.sin(
          (cube.angleY + cube.angleDiractionY[index]) * (Math.PI / 180)
        ) *
        Math.sin((cube.angleZ + cube.angleZDiraction[index]) * (Math.PI / 180));

    cube.vertices[index][1] =
      cube.centerY +
      cube.radius *
        Math.cos(
          (cube.angleX + cube.angleDiractionX[index]) * (Math.PI / 180)
        ) *
        Math.cos(
          (cube.angleY + cube.angleDiractionY[index]) * (Math.PI / 180)
        ) *
        Math.cos((cube.angleZ + cube.angleZDiraction[index]) * (Math.PI / 180));

    drawCube();
  });
  console.log(cube.vertices);
  function drawCube() {
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
    ctx.fillStyle = "azure";
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
  }
};
