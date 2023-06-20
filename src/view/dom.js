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
    if (drawObject.player === 'AI') return;
    if (drawObject.player === 'human') playerBoard = 'humangameboard';
    const cell = cellSelector(playerBoard, drawObject);
    cell.classList.add('ship');
  }

  function drawShot(drawObject) {
    let playerBoard = 'humangameboard';
    if (drawObject.player === 'AI') playerBoard = 'aigameboard';
    if (drawObject.player === 'human') playerBoard = 'humangameboard';
    const cell = cellSelector(playerBoard, drawObject);

    if (drawObject.target === 'ocean') {
      cell.classList.add('hitOcean');
    }
    if (drawObject.target === 'ship') {
      cell.classList.add('hitShip');
    }
  }

  function cellSelector(playerBoard, drawObject) {
    const selector = `.${playerBoard} .column[data-index="${
      drawObject.x
    }"] .cell:nth-child(${drawObject.y + 1})`;
    return document.querySelector(selector);
  }

  function declareWinner(winner) {
    const dialog = document.querySelector('dialog');
    const text = document.querySelector('.winner');
    dialog.classList.add('dialogVisible');
    text.innerText = `The winner is the ${winner}`;
    dialog.showModal();
    events.resetListener();
  }

  function orientationDisplayer() {
    const orientationDisplay = document.querySelector('.orientationDisplay');
    if (orientationDisplay.innerText === 'horizontal') {
      orientationDisplay.innerText = 'vertical';
    } else {
      orientationDisplay.innerText = 'horizontal';
    }
  }

  function combatDisplayer() {
    const orientationDisplay = document.querySelector('.orientationDisplay');
    orientationDisplay.innerText = 'COMBAT! Shoot away!';
  }

  return {
    createGameboards,
    drawActionToBoard,
    declareWinner,
    orientationDisplayer,
    combatDisplayer,
  };
})();
