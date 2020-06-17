const { Cell } = require("./cell");
module.exports = {
  generator() {
    let grid = [];
    for (let i = 0; i < 50; i++) {
      grid.push([]);
      for (let j = 0; j < 50; j++) {
        let cell = new Cell(i, j, {});
        // cell.setCanvas({});
        grid[i].push(cell);
      }
    }
    grid = mazeGenerator(grid);
    return grid;
  },
};

function mazeGenerator(grid) {
  let cell = grid[0][0];
  let i = cell.getRow();
  let j = cell.getCol();

  // 0 = top
  // 1 = right
  // 2 = bottom
  // 3 = left

  let stack = [];
  stack.push(cell);
  let curr = stack[0];
  while (stack.length > 0) {
    i = curr.getRow();
    j = curr.getCol();
    let neighbour = getNeighbour(i, j, grid);
    curr.visit();
    if (neighbour !== null) {
      let next = neighbour;
      stack.push(neighbour);
      if (curr.getRow() !== next.getRow()) {
        if (curr.getRow() < next.getRow()) {
          curr.removeWall(2);
          next.removeWall(0);
        } else {
          curr.removeWall(0);
          next.removeWall(2);
        }
      } else {
        if (curr.getCol() < next.getCol()) {
          curr.removeWall(1);
          next.removeWall(3);
        } else {
          curr.removeWall(3);
          next.removeWall(1);
        }
      }
      curr = next;
    } else {
      curr = stack.pop();
    }
  }
  return grid;
}

function getNeighbour(i, j, grid) {
  let stack = [];
  let size = 0;
  // top
  if (i - 1 >= 0) {
    if (!grid[i - 1][j].iSvisited()) {
      stack.push(grid[i - 1][j]);
      size++;
    }
  }
  // right
  if (j + 1 <= 49) {
    if (!grid[i][j + 1].iSvisited()) {
      stack.push(grid[i][j + 1]);
      size++;
    }
  }
  // bottom
  if (i + 1 <= 49) {
    if (!grid[i + 1][j].iSvisited()) {
      stack.push(grid[i + 1][j]);
      size++;
    }
  }
  // left
  if (j - 1 >= 0) {
    if (!grid[i][j - 1].iSvisited()) {
      stack.push(grid[i][j - 1]);
      size++;
    }
  }

  if (size === 0) return null;
  let ind = Math.floor(Math.random() * Math.floor(size));
  return stack[ind];
}
