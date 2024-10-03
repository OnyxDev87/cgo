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
const liveCells = new Set();

function initializeGrid() {
  const rows = Math.floor(canvas.height / gridSize);
  const columns = Math.floor(canvas.width / gridSize);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const x = i
      const y = j
      liveCells.add(`${x},${y}`);
    }
  }
}

function doTheThing() {
  initializeGrid();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const numAliveNeightbors;
      if (liveCells.has(`${i},${j}`))
      
    }
  }
  
  // try {
  //   const cellState = liveCells.get("1,7");
  //   alert(cellState || "Cell does not exist");
  // } catch (error) {
  //   console.error("An error occurred:", error);
  //   alert("An error occurred while accessing the cell state.");
  // }
}

doTheThing();
