import { Game } from '../controller/game';
import { events } from './eventlisteners';
export const dom = (() => {
  function createGrid(board) {
    for (let i = 0; i <= 9; i++) {
      let column = document.createElement('div');
      column.classList.add('column');
      column.dataset.index = i;
      board.appendChild(column);
      for (let l = 0; l <= 9; l++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = l;
        column.appendChild(cell);
      }
    }
  }

  function createGameboards() {
    const humangameboard = document.querySelector('.humangameboard');
    const aigameboard = document.querySelector('.aigameboard');
    createGrid(humangameboard);
    createGrid(aigameboard);
  }

  function drawActionToBoard(drawObject) {
    if (drawObject.action === 'placement') drawShip(drawObject);
    if (drawObject.action === 'shot') drawShot(drawObject);
  }
  function drawShip(drawObject) {
    let playerBoard = 'humangameboard';
    if (drawObject.player === 'AI') playerBoard = 'aigameboard';
    const selector = `.column[data-index="${drawObject.x}"] .cell:nth-child(${
      drawObject.y + 1
    })`;
    const cell = document.querySelector(selector);
    cell.classList.add('ship');
  }

  function drawShot(drawObject) {
    console.log('drawShot was called');
  }

  return {
    createGameboards,
    drawActionToBoard,
  };
})();
