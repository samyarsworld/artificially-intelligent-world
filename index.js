// Get main canvas by id and set properties
mainCanvas.width = 600;
mainCanvas.height = 600;
const mainCtx = mainCanvas.getContext("2d");

removeRandomNodeBtn.addEventListener("click", () => removeRandomNode());
removeRandomEdgeBtn.addEventListener("click", () => removeRandomEdge());
resetBtn.addEventListener("click", () => reset());

// Graph
const graph = new Graph();
const graphEditor = new GraphEditor(mainCanvas, graph);
const viewPort = new ViewPort(mainCanvas);

animate();

function animate() {
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  graphEditor.display();
  requestAnimationFrame(animate); // Recursively calls the animate function 60 times per second
}

// Functions
