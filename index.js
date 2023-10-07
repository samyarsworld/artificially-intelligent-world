// Get main canvas by id and set properties
mainCanvas.width = 600;
mainCanvas.height = 600;
const mainCtx = mainCanvas.getContext("2d");

saveGraph.addEventListener("click", () => save());
resetGraph.addEventListener("click", () => reset());

// Graph
const graphString = localStorage.getItem("graph");
const savedGraph = graphString ? JSON.parse(graphString) : null;
const graph = savedGraph ? Graph.load(savedGraph) : new Graph();
const viewPort = new ViewPort(mainCanvas);
const graphEditor = new GraphEditor(viewPort, graph);

animate();

function animate() {
  viewPort.reset();
  graphEditor.display();

  requestAnimationFrame(animate); // Recursively calls the animate function 60 times per second
}

// Resets the graph
function reset() {
  graphEditor.reset();
}

// Saves the graph
function save() {
  localStorage.setItem("graph", JSON.stringify(graph));
}
