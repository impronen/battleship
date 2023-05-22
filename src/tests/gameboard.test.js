import { gameBoard } from '../model/gameboard';
import { ship } from '../model/ships';

describe('Gameboard: testing functionality for sinking ships', () => {
  test('knows the number of sunk ships on the board', () => {
    const newBoard = new gameBoard();
    newBoard.shipWasSunk();
    expect(newBoard.getSunkShips()).toBe(1);
  });

  test('knows if all ships on the board been sunk', () => {
    const newBoard = new gameBoard();
    newBoard.shipWasSunk();
    newBoard.shipWasSunk();
    newBoard.shipWasSunk();
    newBoard.shipWasSunk();
    newBoard.shipWasSunk();
    expect(newBoard.isAllLost()).toBe(true);
  });
});

describe('Gameboard: tests for hitting a square and what did it contain', () => {
  test('detects that the hit is succesful on an empty square', () => {
    const newBoard = new gameBoard();
    newBoard.hitSquare(1, 5);
    expect(newBoard.getSquareContent(1, 5)).toBe('hit');
  });

  test('does not allow you to hit a square that is already hit', () => {
    const newBoard = new gameBoard();
    newBoard.hitSquare(1, 5);
    expect(newBoard.hitSquare(1, 5)).toBe(false);
  });
});

describe('Gameboard: tests for ship placement', () => {
  test('test ship placed horizontally is in the grid (square 1)', () => {
    const newBoard = new gameBoard();
    const battleship = new ship('antero', 'battleship');
    newBoard.placeShip([1, 5], 'horizontal', battleship);
    expect(newBoard.getSquareContent(1, 5)).toBe('battleship');
  });
  test('test ship placed horizontally is in the grid (square 4)', () => {
    const newBoard = new gameBoard();
    const battleship = new ship('antero', 'battleship');
    newBoard.placeShip([1, 5], 'horizontal', battleship);
    expect(newBoard.getSquareContent(5, 5)).toBe('battleship');
  });
  test('test ship placed horizontally is in the grid (square 1)', () => {
    const newBoard = new gameBoard();
    const battleship = new ship('antero', 'battleship');
    newBoard.placeShip([2, 5], 'vertical', battleship);
    expect(newBoard.getSquareContent(2, 5)).toBe('battleship');
  });
  test('test ship placed horizontally is in the grid (square 1)', () => {
    const newBoard = new gameBoard();
    const battleship = new ship('antero', 'battleship');
    newBoard.placeShip([2, 5], 'vertical', battleship);
    expect(newBoard.getSquareContent(2, 2)).toBe('battleship');
  });
});

/* describe('Gameboard: tests for ship receiving an attack', () => {}); */
