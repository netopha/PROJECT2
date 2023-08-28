window.onload = function () {
  /*  debugger; */
  const body = document.body;

  const canvas = document.querySelector("#canvas");
  canvas.style.top = body.offsetWidth / 2 - 300 + "px";
  canvas.style.left = body.offsetHeight / 2 - 300 + "px";

  let angleX = 0;
  let angleY = 0;

  const box = {
    radius: 200, // Radius of the sphere
    centerX: 300, // X coordinate of the sphere's center
    centerY: 300, // Y coordinate of the sphere's center
    centerZ: 0, // Z coordinate of the sphere's center

    // Calculate the coordinates of the square's vertices
    vertices: [],
    theta: 60,
    phi: 60,
  };

  const thetaRadians = box.theta * (Math.PI / 180);
  const phiRadians = box.phi * (Math.PI / 180);

  // Calculate the coordinates of the square's vertices inside the sphere
  const radius = box.radius / Math.sqrt(2); // Adjusting radius for a cube
  const ctx = canvas.getContext("2d");
  calculateVertices();
  function calculateVertices() {
    // Front face
    box.vertices.push([
      box.centerX + radius * Math.sin(thetaRadians) * Math.cos(phiRadians),
      box.centerY + radius * Math.sin(thetaRadians) * Math.sin(phiRadians),
      box.centerZ + radius * Math.cos(thetaRadians),
    ]);
    box.vertices.push([
      box.centerX +
        radius *
          Math.sin(thetaRadians) *
          Math.cos(phiRadians + (90 * Math.PI) / 180),
      box.centerY +
        radius *
          Math.sin(thetaRadians) *
          Math.sin(phiRadians + (90 * Math.PI) / 180),
      box.centerZ + radius * Math.cos(thetaRadians),
    ]);
    box.vertices.push([
      box.centerX +
        radius *
          Math.sin(thetaRadians) *
          Math.cos(phiRadians + (180 * Math.PI) / 180),
      box.centerY +
        radius *
          Math.sin(thetaRadians) *
          Math.sin(phiRadians + (180 * Math.PI) / 180),
      box.centerZ + radius * Math.cos(thetaRadians),
    ]);
    box.vertices.push([
      box.centerX +
        radius *
          Math.sin(thetaRadians) *
          Math.cos(phiRadians + (270 * Math.PI) / 180),
      box.centerY +
        radius *
          Math.sin(thetaRadians) *
          Math.sin(phiRadians + (270 * Math.PI) / 180),
      box.centerZ + radius * Math.cos(thetaRadians),
    ]);

    // Back face
    box.vertices.push([
      box.centerX +
        radius *
          Math.sin(thetaRadians + (180 * Math.PI) / 180) *
          Math.cos(phiRadians),
      box.centerY +
        radius *
          Math.sin(thetaRadians + (180 * Math.PI) / 180) *
          Math.sin(phiRadians),
      box.centerZ + radius * Math.cos(thetaRadians + (180 * Math.PI) / 180),
    ]);
    box.vertices.push([
      box.centerX +
        radius *
          Math.sin(thetaRadians + (180 * Math.PI) / 180) *
          Math.cos(phiRadians + (90 * Math.PI) / 180),
      box.centerY +
        radius *
          Math.sin(thetaRadians + (180 * Math.PI) / 180) *
          Math.sin(phiRadians + (90 * Math.PI) / 180),
      box.centerZ + radius * Math.cos(thetaRadians + (180 * Math.PI) / 180),
    ]);
    box.vertices.push([
      box.centerX +
        radius *
          Math.sin(thetaRadians + (180 * Math.PI) / 180) *
          Math.cos(phiRadians + (180 * Math.PI) / 180),
      box.centerY +
        radius *
          Math.sin(thetaRadians + (180 * Math.PI) / 180) *
          Math.sin(phiRadians + (180 * Math.PI) / 180),
      box.centerZ + radius * Math.cos(thetaRadians + (180 * Math.PI) / 180),
    ]);
    box.vertices.push([
      box.centerX +
        radius *
          Math.sin(thetaRadians + (180 * Math.PI) / 180) *
          Math.cos(phiRadians + (270 * Math.PI) / 180),
      box.centerY +
        radius *
          Math.sin(thetaRadians + (180 * Math.PI) / 180) *
          Math.sin(phiRadians + (270 * Math.PI) / 180),
      box.centerZ + radius * Math.cos(thetaRadians + (180 * Math.PI) / 180),
    ]);
    // Print the coordinates of the square's vertices
    box.vertices.forEach((vertex, index) => {
      console.log(
        `Vertex ${index + 1}: (${vertex[0]}, ${vertex[1]}, ${vertex[2]})`
      );
    });
    const scaleFactor = 100;
    const projectedVertices = box.vertices.map(([x, y, z]) => {
      const screenX = scaleFactor * (x - y);
      const screenY = scaleFactor * (x + y) - z;
      return [screenX, screenY];
    });

    // Draw the projected vertices on the canvas

    ctx.fillStyle = "green";
    projectedVertices.forEach(([x, y]) => {
      ctx.fillRect(x, y, 5, 5); // Draw a small square at each projected vertex
    });
    /*  eraseOrDraw("black"); */
  }

  window.addEventListener("keydown", (ev) => {
    ev.preventDefault();
    let directionRotateY = "right";

    switch (ev.key) {
      case "ArrowUp":
        angleY -= 10;
        calculateVertices();
        break;
      case "ArrowRight":
        angleX += 10;
        directionRotateY = "right";
        calculateVertices();
        break;
      case "ArrowDown":
        angleY += 10;
        calculateVertices();
        break;
      case "ArrowLeft":
        angleX -= 10;
        directionRotateY = "left";
        calculateVertices();
        break;
    }
  });

  function eraseOrDraw(color) {
    if (color == "black") {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      drawCube();
    }
    if (color == "gray") {
      ctx.lineWidth = 7;
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      drawCube();
    }

    return;
  }

  function drawCube() {
    ctx.fillStyle = "greenyellow";
    ctx.fillRect(300, 300, 10, 10);
    ctx.fillStyle = "red";
    ctx.fillRect(
      box.vertices[0][0],
      box.vertices[0][1],
      box.vertices[0][2],
      2,
      2
    );
    ctx.fillStyle = "green";
    ctx.fillRect(
      box.vertices[1][0],
      box.vertices[1][1],
      box.vertices[1][2],
      8,
      8
    );
    ctx.fillStyle = "blue";
    ctx.fillRect(
      box.vertices[2][0],
      box.vertices[2][1],
      box.vertices[2][2],
      8,
      8
    );
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      box.vertices[3][0],
      box.vertices[3][1],
      box.vertices[3][2],
      8,
      8
    );
    ctx.fillStyle = "orange";
    ctx.fillRect(
      box.vertices[4][0],
      box.vertices[4][1],
      box.vertices[4][2],
      8,
      8
    );
    ctx.fillStyle = "purple";
    ctx.fillRect(
      box.vertices[5][0],
      box.vertices[5][1],
      box.vertices[5][2],
      8,
      8
    );
    ctx.fillStyle = "azure";
    ctx.fillRect(
      box.vertices[6][0],
      box.vertices[6][1],
      box.vertices[6][2],
      8,
      8
    );
    ctx.fillStyle = "pink";
    ctx.fillRect(
      box.vertices[7][0],
      box.vertices[7][1],
      box.vertices[7][2],
      8,
      8
    );

    ctx.moveTo(box.vertices[0][0], box.vertices[0][1], box.vertices[0][2]);
    ctx.lineTo(box.vertices[1][0], box.vertices[1][1], box.vertices[1][2]);
    ctx.lineTo(box.vertices[2][0], box.vertices[2][1], box.vertices[2][2]);
    ctx.lineTo(box.vertices[3][0], box.vertices[3][1], box.vertices[3][2]);
    ctx.lineTo(box.vertices[0][0], box.vertices[0][1], box.vertices[0][2]);
    ctx.lineTo(box.vertices[4][0], box.vertices[4][1], box.vertices[4][2]);
    ctx.lineTo(box.vertices[5][0], box.vertices[5][1], box.vertices[5][2]);
    ctx.lineTo(box.vertices[6][0], box.vertices[6][1], box.vertices[6][2]);
    ctx.lineTo(box.vertices[7][0], box.vertices[7][1], box.vertices[7][2]);
    ctx.lineTo(box.vertices[4][0], box.vertices[4][1], box.vertices[4][2]);
    ctx.moveTo(box.vertices[1][0], box.vertices[1][1], box.vertices[1][2]);
    ctx.lineTo(box.vertices[5][0], box.vertices[5][1], box.vertices[5][2]);
    ctx.moveTo(box.vertices[2][0], box.vertices[2][1], box.vertices[2][2]);
    ctx.lineTo(box.vertices[6][0], box.vertices[6][1], box.vertices[6][2]);
    ctx.moveTo(box.vertices[3][0], box.vertices[3][1], box.vertices[3][2]);
    ctx.lineTo(box.vertices[7][0], box.vertices[7][1], box.vertices[7][2]);
    ctx.stroke();
  }
};
/* vertexes.vertex1[0] =
    locationX + Math.sin((angleX + 0) * (Math.PI / 180)) * radius;
  vertexes.vertex1[1] =
    locationY +
    Math.cos((angleY + 60) * (Math.PI / 180)) *
      (radius + Math.cos(angleX * (Math.PI / 180)) * radius);

  vertexes.vertex2[0] =
    locationX + Math.sin((angleX + 90) * (Math.PI / 180)) * radius;
  vertexes.vertex2[1] =
    locationY +
    Math.cos((angleY + 60) * (Math.PI / 180)) *
      (radius + Math.cos((angleX + 90) * (Math.PI / 180)) * radius);

  vertexes.vertex3[0] =
    locationX + Math.sin((angleX + 180) * (Math.PI / 180)) * radius;
  vertexes.vertex3[1] =
    locationY +
    Math.cos((angleY + 60) * (Math.PI / 180)) *
      (radius + Math.cos((angleX + 180) * (Math.PI / 180)) * radius);

  vertexes.vertex4[0] =
    locationX + Math.sin((angleX + 270) * (Math.PI / 180)) * radius;
  vertexes.vertex4[1] =
    locationY +
    Math.cos((angleY + 60) * (Math.PI / 180)) *
      (radius + Math.cos((angleX + 270) * (Math.PI / 180)) * radius);

  vertexes.vertex5[0] =
    locationX + Math.sin((angleX + 0) * (Math.PI / 180)) * radius;
  vertexes.vertex5[1] =
    locationY +
    height +
    Math.cos((angleY + 60) * (Math.PI / 180)) *
      (radius + Math.cos(angleX * (Math.PI / 180)) * radius);

  vertexes.vertex6[0] =
    locationX + Math.sin((angleX + 90) * (Math.PI / 180)) * radius;
  vertexes.vertex6[1] =
    locationY +
    height +
    Math.cos((angleY + 60) * (Math.PI / 180)) *
      (radius + Math.cos((angleX + 90) * (Math.PI / 180)) * radius);

  vertexes.vertex7[0] =
    locationX + Math.sin((angleX + 180) * (Math.PI / 180)) * radius;
  vertexes.vertex7[1] =
    locationY +
    height +
    Math.cos((angleY + 60) * (Math.PI / 180)) *
      (radius + Math.cos((angleX + 180) * (Math.PI / 180)) * radius);

  vertexes.vertex8[0] =
    locationX + Math.sin((angleX + 270) * (Math.PI / 180)) * radius;
  vertexes.vertex8[1] =
    locationY +
    height +
    Math.cos((angleY + 60) * (Math.PI / 180)) *
      (radius + Math.cos((angleX + 270) * (Math.PI / 180)) * radius); */
