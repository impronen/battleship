import { dom } from './dom';
import { Game } from '../controller/game';
import { Player } from '../model/player';

export const events = (() => {
  let humanGrid = document.querySelector('.humangameboard');

  function startListener() {
    const startButton = document.querySelector('#start');
    startButton.addEventListener('click', (event) => {
      const newGame = new Game(
        new Player('antero', 'human'),
        new Player('Bob', 'AI')
      );
      console.log(newGame);
      return newGame;
    });
  }
  function orientationListener() {
    const orientationButton = document.querySelector('#orientation');
    orientationButton.addEventListener('click', (event) => {});
  }
  function gridListener(player) {
    let humanGrid = document.querySelector('.humangameboard');
    let aiGrid = document.querySelector('.aigameboard');
    let columns = null;
    if (player === 'human') {
      columns = humanGrid.childNodes;
    } else columns = aiGrid.childNodes;

    columns.forEach((column) => {
      column.addEventListener('click', (el) => {
        console.log([
          el.target.parentElement.dataset.index,
          el.target.dataset.index,
        ]);
        return [el.target.parentElement.dataset.index, el.target.dataset.index];
      });
    });
  }

  return { startListener, orientationListener, gridListener };
})();
