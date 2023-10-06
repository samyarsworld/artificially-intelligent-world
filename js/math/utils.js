function getNearestNode(loc, nodes, threshold = Number.MAX_SAFE_INTEGER) {
  let min = Number.MAX_SAFE_INTEGER;
  let nearestNode = null;
  for (const node of nodes) {
    const dist = distance(loc, node);
    if (dist < min && dist < threshold) {
      min = dist;
      nearestNode = node;
    }
  }
  return nearestNode;
}

function distance(n1, n2) {
  // return Math.sqrt(((n1.x - n2.x) ^ 2) + ((n1.y - n2.y) ^ 2));
  // Use Hypot for better precision on extreme values
  return Math.hypot(n1.x - n2.x, n1.y - n2.y);
}
