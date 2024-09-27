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

function doTheThing() {
    const rows = Math.floor(canvas.height / gridSize);
    const columns = Math.floor(canvas.width / gridSize);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let x = i * gridSize;
          let y = j * gridSize;
        }
     }
}