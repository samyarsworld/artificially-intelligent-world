class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Draws the circular node
  draw(
    ctx,
    { size = 20, color = "black", outline = false, fill = false } = {}
  ) {
    const radius = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
    ctx.fill();

    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.arc(this.x, this.y, radius * 0.7, 0, 2 * Math.PI);
      ctx.stroke();
    }

    if (fill) {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  equals(node) {
    return this.x == node.x && this.y == node.y;
  }
}
