import { Game } from '../controller/game';
export const dom = (() => {
  function createGrid(board) {
    for (let i = 0; i <= 9; i++) {
      for (let l = 0; l <= 9; l++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
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
