class ViewPort {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.zoom = 1;
    this.center = new Node(canvas.width / 2, canvas.height / 2);
    this.offset = scale(this.center, -1);
    this.drag = {
      start: new Node(0, 0),
      end: new Node(0, 0),
      offset: new Node(0, 0),
      active: false,
    };

    this.#addEventListeners();
  }

  getScaledMouseLoc(event, dragOffset = false) {
    const n = new Node(
      (event.offsetX - this.center.x) * this.zoom - this.offset.x,
      (event.offsetY - this.center.y) * this.zoom - this.offset.y
    );

    return dragOffset ? subtract(n, this.drag.offset) : n;
  }

  getOffset() {
    return add(this.offset, this.drag.offset);
  }

  reset() {
    this.ctx.restore();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.scale(1 / this.zoom, 1 / this.zoom);

    const offset = this.getOffset();
    this.ctx.translate(offset.x, offset.y);
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousewheel", (event) =>
      this.#handleMouseWheel(event)
    );
    this.canvas.addEventListener("mousedown", (event) =>
      this.#handleMouseDown(event)
    );
    this.canvas.addEventListener("mousemove", (event) =>
      this.#handleMouseMove(event)
    );
    this.canvas.addEventListener("mouseup", (event) =>
      this.#handleMouseUp(event)
    );
  }

  #handleMouseWheel(event) {
    event.preventDefault();
    const zoomDirection = Math.sign(event.deltaY);
    const step = 0.1;
    this.zoom += zoomDirection * step;
    this.zoom = Math.min(Math.max(this.zoom, 1), 5);
  }

  #handleMouseDown(event) {
    event.preventDefault();
    // Middle button (wheel press)
    if (event.button == 1) {
      this.drag.start = this.getScaledMouseLoc(event);
      this.drag.active = true;
    }
  }

  #handleMouseMove(event) {
    if (this.drag.active) {
      this.drag.end = this.getScaledMouseLoc(event);
      this.drag.offset = subtract(this.drag.end, this.drag.start); // Vector connecting start to finish
    }
  }

  #handleMouseUp(event) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: new Node(0, 0),
        end: new Node(0, 0),
        offset: new Node(0, 0),
        active: false,
      };
    }
  }
}
