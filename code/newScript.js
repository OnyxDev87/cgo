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
const bgcolor = "white"
const rows = Math.floor(canvas.height / gridSize);
const columns = Math.floor(canvas.width / gridSize);

function initializeGrid() {

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      liveCells.set(`${i},${j}`, false);
    }
  }
}

function countAliveNeightbors() {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      alert(liveCells.get(`${i},${j}`))
      if (i === 0 && j === 0) continue;
      if (liveCells.get(`${i},${j}`) === true) {
        alert('d')
        count++;
      }
    }
  }
  return count;
}

initializeGrid();

function doTheThing() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const aliveNeighbors = countAliveNeightbors(i,j);
      //alert("counted alive cells")
      if (aliveNeighbors < 2 || aliveNeighbors > 3) {
        liveCells.set(`${i},${j}`, false);
      } else if (aliveNeighbors === 3) {
        liveCells.set(`${i},${j}`, true)
      }
      if (liveCells.has(`${i},${j}`)) {
        c.fillStyle = "black"
        c.fillRect(i*gridSize, j*gridSize, gridSize, gridSize)
        alert("drawn")
      }
    }
  }
}

function animate() {
  animationId = requestAnimationFrame(animate)
  c.fillStyle = bgcolor
  c.fillRect(0, 0, canvas.width, canvas.height)
  doTheThing();
  alert(liveCells.length())
}

liveCells.set(`${10},${10}`, true);
liveCells.set(`${10},${11}`, true);
liveCells.set(`${10},${12}`, true);
liveCells.set(`${11},${12}`, true);
liveCells.set(`${12},${11}`, true);

animate();