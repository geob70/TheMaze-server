class Cell {
  constructor(r, c, canvas) {
    this.canvas = canvas;
    this.r = r;
    this.c = c;
    this.visited = false;
    this.hasWall = {
      left: true,
      right: true,
      top: true,
      bottom: true,
    };
  }

  setCanvas = (canvas) => {
    this.canvas = canvas;
  };

  paint = () => {
    this.createWall();
  };

  createWall = () => {
    let x = this.c * 24;
    let y = this.r * 24;
    if (this.hasWall.top) {
      this.canvas.beginPath();
      this.canvas.moveTo(x, y);
      this.canvas.lineTo(x + 24, y);
      this.canvas.stroke();
    }
    if (this.hasWall.right) {
      this.canvas.beginPath();
      this.canvas.moveTo(x + 24, y);
      this.canvas.lineTo(x + 24, y + 24);
      this.canvas.stroke();
    }
    if (this.hasWall.bottom) {
      this.canvas.beginPath();
      this.canvas.moveTo(x + 24, y + 24);
      this.canvas.lineTo(x, y + 24);
      this.canvas.stroke();
    }
    if (this.hasWall.left) {
      this.canvas.beginPath();
      this.canvas.moveTo(x, y + 24);
      this.canvas.lineTo(x, y);
      this.canvas.stroke();
    }
  };

  getRow = () => {
    return this.r;
  };

  getCol = () => {
    return this.c;
  };

  iSvisited = () => {
    return this.visited;
  };

  visit = () => {
    this.visited = true;
  };

  getWall = () => {
    return this.hasWall;
  };

  removeWall = (i) => {
    if (i === 0) this.hasWall.top = false;
    else if (i === 1) this.hasWall.right = false;
    else if (i === 2) this.hasWall.bottom = false;
    else this.hasWall.left = false;
  };
}

module.exports = { Cell };
