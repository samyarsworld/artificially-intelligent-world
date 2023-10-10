class GraphEditor {
  constructor(viewPort, graph) {
    this.viewPort = viewPort;
    this.canvas = viewPort.canvas;

    this.graph = graph;

    this.ctx = this.canvas.getContext("2d");
    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.mouse = null;

    this.#addEventListeners();
  }

  reset() {
    this.graph.reset();
    this.selected = null;
    this.hovered = null;
  }

  display() {
    this.graph.draw(this.ctx);

    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }

    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });

      // Display possible edge and snap to possible node
      const snapToNode = this.hovered ? this.hovered : this.mouse;
      new Edge(this.selected, snapToNode).draw(this.ctx, { dash: [3, 3] });
    }
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (event) =>
      this.#handleMouseDown(event)
    );

    // Same result using bind
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));

    this.canvas.addEventListener("mouseup", () => (this.dragging = false));

    // Disables the pop-on context menu when right click on the canvas
    this.canvas.addEventListener("contextmenu", (event) =>
      event.preventDefault()
    );
  }

  #handleMouseDown(event) {
    // Right click
    if (event.button == 2) {
      //
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.graph.removeNode(this.hovered);
      }

      if (this.hovered == this.selected) {
        this.selected = null;
      }
      this.hovered = null;
      //
      // if (this.selected) {
      //   this.selected = null;
      // } else if (this.hovered) {
      //   this.graph.removeNode(this.hovered);
      //   this.hovered = null;
      // }
    }

    // Left click
    if (event.button == 0) {
      if (this.hovered) {
        // Try adding edges between existing nodes
        if (this.selected) {
          this.graph.addEdge(new Edge(this.selected, this.hovered));
        }

        this.selected = this.hovered;
        this.dragging = true;
        return;
      }
      this.graph.addNode(this.mouse);

      if (this.selected) {
        this.graph.addEdge(new Edge(this.selected, this.mouse));
      }

      this.selected = this.mouse;
      this.hovered = this.mouse;
    }
  }

  #handleMouseMove(event) {
    this.mouse = this.viewPort.getScaledMouseLoc(event, true);
    this.hovered = getNearestNode(
      this.mouse,
      this.graph.nodes,
      12 * this.viewPort.zoom
    );
    if (this.dragging) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }
}
