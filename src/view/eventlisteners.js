import { dom } from './dom';

export const events = (() => {
  function startListener() {
    const startButton = document.querySelector('#start');
    startButton.addEventListener('click', (event) => {
      console.log('START BITCHES');
    });
  }
  function orientationListener() {
    const orientationButton = document.querySelector('#orientation');
    orientationButton.addEventListener('click', (event) => {
      gridListener();
    });
  }
  function gridListener() {
    let humanGrid = document.querySelector('.humangameboard');
    let columns = humanGrid.childNodes;
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

/* columns.forEach((column) => {
    column.addEventListener('click', (el) => {
      const index = [...el.parentElement.children];
      console.log(el);
    });
  }); */
