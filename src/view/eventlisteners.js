import { dom } from './dom';
import { Game } from '../controller/game';
import { Player } from '../model/player';

export const events = (() => {
  let humanGrid = document.querySelector('.humangameboard');
  let orientation = 'horizontal';

  function startListener() {
    const startButton = document.querySelector('#start');
    startButton.addEventListener('click', (event) => {
      const newGame = new Game(
        new Player('antero', 'human'),
        new Player('Bob', 'AI')
      );
      newGame.runGameLoop();
    });
  }
  function orientationListener() {
    const orientationButton = document.querySelector('#orientation');
    orientationButton.addEventListener('click', (event) => {
      if (orientation != 'horizontal') orientation = 'horizontal';
      else orientation = 'vertical';
      console.log(orientation);
    });
  }
  function gridListener(player) {
    let humanGrid = document.querySelector('.humangameboard');
    let aiGrid = document.querySelector('.aigameboard');
    let columns = null;
    if (player === 'human') {
      columns = humanGrid.childNodes;
    } else columns = aiGrid.childNodes;

    columns.forEach((column) => {
      column.addEventListener('click', (square) => {
        return {
          player: player,
          x: Number(square.target.parentElement.dataset.index),
          y: Number(square.target.dataset.index),
        };
      });
    });
  }

  return { startListener, orientationListener, gridListener };
})();
