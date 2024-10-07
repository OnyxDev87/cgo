/* Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.

Any live cell with two or three live neighbours lives on to the next generation.

Any live cell with more than three live neighbours dies, as if by overpopulation.

Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gridSize = 7;
const halfSize = Math.floor(gridSize / 2);
const liveCells = new Map();

let grid = [];

var paused = false;

class Cell {
 constructor(position) {
    this.position = position;
    this.alive = Math.floor(Math.random() * 5) === 1;
    this.willBeAlive = this.alive;
    liveCells.set(this.position, this.alive)
 }

 show() {
    c.fillStyle = 'white';
    c.fillRect(this.position.x, this.position.y, gridSize, gridSize);
 }

 hide() {
    c.fillStyle = 'black';
    c.fillRect(this.position.x, this.position.y, gridSize, gridSize);
 }

  draw() {
    if (this.willBeAlive) {
      this.show();
    } else {
      this.hide();
    }
    this.alive = this.willBeAlive

    c.strokeStyle = '#5954551';
    c.strokeRect(this.position.x, this.position.y, gridSize, gridSize)
  }

  

 update() {
 }

  checkRules() {
    // this.draw();
    const aliveNeighbors = countAliveNeighbors(this.position.x, this.position.y);

    if (aliveNeighbors < 2 || aliveNeighbors > 3) {
      this.willBeAlive = false;
    }

    if (aliveNeighbors === 3) {
      this.willBeAlive = true;
    }
  }
}

function countAliveNeighbors(x, y) {
 let count = 0;
 for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the cell itself
      const newX = Math.floor(x / gridSize) + i;
      const newY = Math.floor(y / gridSize) + j;
      if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length && grid[newX][newY].alive) {
        count++;
      }
    }
 }
 return count;
}

function createGrid() {
 const rows = Math.floor(canvas.height / gridSize);
 const columns = Math.floor(canvas.width / gridSize);

 for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < columns; j++) {
      let x = i * gridSize;
      let y = j * gridSize;

      let newCell = new Cell({
        x: x,
        y: y
      });

      grid[i][j] = newCell;
    }
 }
}

function drawGrid() {
 for (let q = 0; q < grid.length; q++) {
    for (let w = 0; w < grid[q].length; w++) {
      grid[q][w].draw();
    }
 }
}

function update() {
  // First, update all cells based on the first four rules
   drawGrid();
    
   for (let q = 0; q < grid.length; q++) {
      for (let w = 0; w < grid[q].length; w++) {
        grid[q][w].checkRules();
      }
   }


    for (let q = 0; q < grid.length; q++) {
      for (let w = 0; w < grid[q].length; w++) {
        grid[q][w].draw();
      }
    }

}

function drawUpdate() {
  for (i of grid) {
    for (j of i) {
      j.draw()
    }
  }
}


createGrid();

// grid[56][56].willBeAlive = true;
// grid[56][57].willBeAlive = true;
// grid[56][55].willBeAlive = true;
// grid[55][56].willBeAlive = true;
// grid[57][56].willBeAlive = true;


setInterval(() => {
  if (!paused) { update(); } else { drawUpdate(); }
}, 500)

document.addEventListener('mousemove', (event) => {
  
  const { clientX, clientY } = event;
  const x = Math.floor(clientX / gridSize) * gridSize + halfSize;
  const y = Math.floor(clientY / gridSize) * gridSize + halfSize;
  
  const gridX = Math.floor(x / gridSize);
  const gridY = Math.floor(y / gridSize);
  
  if (!paused) { grid[gridX][gridY].willBeAlive = true; }
  
});


document.addEventListener('keypress', (event) => {
  if (event.key === ' ') {
    paused = !paused;
  }
})