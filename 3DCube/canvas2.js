const scaleFactor = 100; // Adjust the scale factor as needed

// Define the coordinates of the cube's vertices
const vertices = [
  [0, 0, 0], // Vertex 0
  [1, 0, 0], // Vertex 1
  [1, 1, 0], // Vertex 2
  [0, 1, 0], // Vertex 3
  [0, 0, 1], // Vertex 4
  [1, 0, 1], // Vertex 5
  [1, 1, 1], // Vertex 6
  [0, 1, 1], // Vertex 7
];

// Project the vertices onto the 2D plane
const projectedVertices = vertices.map(([x, y, z]) => {
  const screenX = 300 + scaleFactor * (x - y);
  const screenY = 300 + scaleFactor * (x + y) - z;
  return [screenX, screenY];
});

// Draw the projected vertices on the canvas
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
projectedVertices.forEach(([x, y]) => {
  ctx.fillRect(x, y, 5, 5); // Draw a small square at each projected vertex
});
