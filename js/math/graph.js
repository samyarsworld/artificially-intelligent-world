class Graph {
  constructor(nodes = [], edges = []) {
    this.nodes = nodes;
    this.edges = edges;
  }

  draw(ctx) {
    for (const edge of this.edges) {
      edge.draw(ctx);
    }

    for (const node of this.nodes) {
      node.draw(ctx);
    }
  }

  addNode(node) {
    if (!this.containsNode(node)) this.nodes.push(node);
  }

  addEdge(edge) {
    // Check if either the origin and destination are the same, or the edge already exists
    if (!edge.n1.equals(edge.n2) && !this.containsEdge(edge))
      this.edges.push(edge);
  }

  removeNode(node) {
    const edges = this.getEdgesWithNode(node);
    for (const edge of edges) {
      this.removeEdge(edge);
    }

    this.nodes.splice(this.nodes.indexOf(node), 1);
  }

  removeEdge(edge) {
    this.edges.splice(this.edges.indexOf(edge), 1);
  }

  // Checks if the node location is free
  containsNode(node) {
    return this.nodes.find((n) => n.equals(node));
  }

  // Checks if the edge doesn't already exist
  containsEdge(edge) {
    return this.edges.find((e) => e.equals(edge));
  }

  // Returns all edges of a certain node
  getEdgesWithNode(node) {
    const edges = [];

    for (const edge of this.edges) {
      if (edge.includes(node)) {
        edges.push(edge);
      }
    }
    return edges;
  }

  // Removes everything
  reset() {
    this.edges = [];
    this.nodes = [];
  }

  static load(savedGraph) {
    const nodes = savedGraph.nodes.map((node) => new Node(node.x, node.y));
    const edges = [];

    for (const edge of savedGraph.edges) {
      edges.push(
        new Edge(
          nodes.find((n) => n.equals(edge.n1)),
          nodes.find((n) => n.equals(edge.n2))
        )
      );
    }

    return new Graph(nodes, edges);
  }
}
