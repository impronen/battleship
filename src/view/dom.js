import { Game } from '../controller/game';
import { events } from './eventlisteners';
export const dom = (() => {
  function createGrid(board) {
    for (let i = 0; i <= 9; i++) {
      let column = document.createElement('div');
      column.classList.add('column');
      board.appendChild(column);
      for (let l = 0; l <= 9; l++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
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

  return {
    createGameboards,
  };
})();
