class Edge {
  constructor(n1, n2) {
    this.n1 = n1;
    this.n2 = n2;
  }

  // Draws the straight line edge
  draw(ctx, width = 2, color = "black") {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.moveTo(this.n1.x, this.n1.y);
    ctx.lineTo(this.n2.x, this.n2.y);
    ctx.stroke();
  }

  // Checks if edges are the same
  equals(edge) {
    return this.includes(edge.n1) && this.includes(edge.n2);
  }

  // Checks if the edge includes a node
  includes(node) {
    return this.n1.equals(node) || this.n2.equals(node);
  }
}
