// Get main canvas by id and set properties
mainCanvas.width = 600;
mainCanvas.height = 600;
const mainCtx = mainCanvas.getContext("2d");

const n1 = new Node(200, 200);
const n2 = new Node(300, 300);
const edge = new Edge(n1, n2);

addRandomNodeBtn.addEventListener("click", () => addRandomNode());
removeRandomNodeBtn.addEventListener("click", () => removeRandomNode());
addRandomEdgeBtn.addEventListener("click", () => addRandomEdge());
removeRandomEdgeBtn.addEventListener("click", () => removeRandomEdge());
resetBtn.addEventListener("click", () => reset());

// Graph
const graph = new Graph([n1, n2], [edge]);
graph.draw(mainCtx);

// Functions
// Adds random node on the main canvas
function addRandomNode() {
  graph.addNode(
    new Node(
      Math.random() * mainCanvas.width,
      Math.random() * mainCanvas.height
    )
  );
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  graph.draw(mainCtx);
}

// Adds an edge between random nodes on the main canvas
function addRandomEdge() {
  if (graph.nodes.length < 1) return;

  const ind1 = Math.floor(Math.random() * graph.nodes.length);
  const ind2 = Math.floor(Math.random() * graph.nodes.length);

  graph.addEdge(new Edge(graph.nodes[ind1], graph.nodes[ind2]));

  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  graph.draw(mainCtx);
}

// Removes an edge between random nodes on the main canvas
function removeRandomNode() {
  if (graph.nodes.length < 1) return;

  const ind = Math.floor(Math.random() * graph.nodes.length);

  graph.removeNode(graph.nodes[ind]);

  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  graph.draw(mainCtx);
}

// Removes an edge between random nodes on the main canvas
function removeRandomEdge() {
  if (graph.edges.length < 1) return;

  const ind = Math.floor(Math.random() * graph.edges.length);

  graph.removeEdge(graph.edges[ind]);

  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  graph.draw(mainCtx);
}

// Removes everything
function reset() {
  graph.reset();

  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  graph.draw(mainCtx);
}
