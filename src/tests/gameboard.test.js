import { gameBoard } from '../model/gameboard';

describe('Gameboard: testing functionality for sinking ships', () => {
  test('knows if all ships on the board been sunk', () => {
    const newBoard = new gameBoard();
    newBoard.shipWasSunk();
    newBoard.shipWasSunk();
    newBoard.shipWasSunk();
    newBoard.shipWasSunk();
    newBoard.shipWasSunk();
    expect(newBoard.isAllLost()).toBe(true);
  });

  test('knows the number of sunk ships on the board', () => {
    const newBoard = new gameBoard();
    newBoard.shipWasSunk();
    expect(newBoard.getSunkShips()).toBe(1);
  });
});

/* describe('Gameboard: tests for has a square been hit and what did it contain', () => {});

describe('Gameboard: tests for ship placement', () => {});

describe('Gameboard: tests for ship receiving an attack', () => {}); */
