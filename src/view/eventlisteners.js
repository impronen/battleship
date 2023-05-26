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
      console.log('ORIENTATION BITCHES');
    });
  }

  return { startListener, orientationListener };
})();
