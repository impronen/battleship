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
  test('test ship placed horizontally is in the grid (from square 2,5)', () => {
    const newBoard = new gameBoard();
    const battleship = new ship('antero', 'battleship');
    newBoard.placeShip([2, 5], 'vertical', battleship);
    expect(newBoard.getSquareContent(2, 5)).toBe('battleship');
  });
  test('test ship placed horizontally is in the grid (from square 2,5)', () => {
    const newBoard = new gameBoard();
    const battleship = new ship('antero', 'battleship');
    newBoard.placeShip([2, 5], 'vertical', battleship);
    expect(newBoard.getSquareContent(2, 2)).toBe('battleship');
  });
  test('does not allow to place ship that would go outside the board', () => {
    const newBoard = new gameBoard();
    const battleship = new ship('antero', 'battleship');
    expect(newBoard.placeShip([1, 1], 'vertical', battleship)).toBe(
      'ERROR - outside the board!'
    );
  });
  test('does not allow to place ship that would go outside the board', () => {
    const newBoard = new gameBoard();
    const battleship = new ship('antero', 'battleship');
    expect(newBoard.placeShip([7, 0], 'horizontal', battleship)).toBe(
      'ERROR - outside the board!'
    );
  });

  test('does not allow to place a ship when a square where the ship would be is already occupied', () => {
    const newBoard = new gameBoard();
    const battleship = new ship('antero', 'battleship');
    newBoard.placeShip([2, 5], 'vertical', battleship);
    const carrier = new ship('antero', 'carrier');
    expect(newBoard.placeShip([2, 5], 'vertical', carrier)).toBe(
      'ERROR - there be ships there already'
    );
  });
  test('does not allow to place a ship when a square where the ship would be is already occupied (horizontal)', () => {
    const newBoard = new gameBoard();
    const battleship = new ship('antero', 'battleship');
    newBoard.placeShip([4, 6], 'horizontal', battleship);
    const carrier = new ship('antero', 'carrier');
    expect(newBoard.placeShip([4, 6], 'horizontal', battleship)).toBe(
      'ERROR - there be ships there already'
    );
  });
});

/* describe('Gameboard: tests for ship receiving an attack', () => {}); */
