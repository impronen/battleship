import { dom } from './dom';
import { Game } from '../controller/game';
import { Player } from '../model/player';

export const events = (() => {
  let humanGrid = document.querySelector('.humangameboard');
  let orientation = 'horizontal';
  let newGame = undefined;

  function startListener() {
    const startButton = document.querySelector('#start');
    startButton.addEventListener('click', (event) => {
      if (typeof newGame === 'object') return;
      newGame = new Game(
        new Player('antero', 'human'),
        new Player('Bob', 'AI')
      );
      newGame.startGameLoop();
    });
  }
  function orientationListener() {
    const orientationButton = document.querySelector('#orientation');
    orientationButton.addEventListener('click', (event) => {
      orientation = orientation !== 'horizontal' ? 'horizontal' : 'vertical';
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
        newGame.gameEvent({
          player: player,
          y: Number(square.target.parentElement.dataset.index),
          x: Number(square.target.dataset.index),
          orientation: orientation,
        });
      });
    });
  }

  return { startListener, orientationListener, gridListener };
})();
