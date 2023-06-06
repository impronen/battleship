import { Gameboard } from '../model/gameboard';
import { Ship } from '../model/ships';

describe('Gameboard: testing functionality for sinking ships', () => {
  test('knows the number of sunk ships on the board', () => {
    const newBoard = new Gameboard();
    newBoard.shipWasSunk();
    expect(newBoard.getSunkShips()).toBe(1);
  });

  test('knows if all ships on the board been sunk', () => {
    const newBoard = new Gameboard();
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
    const newBoard = new Gameboard();
    newBoard.hitSquare(1, 5);
    expect(newBoard.getSquareContent(1, 5)).toBe('hit');
  });

  test('does not allow you to hit a square that is already hit', () => {
    const newBoard = new Gameboard();
    newBoard.hitSquare(1, 5);
    expect(newBoard.hitSquare(1, 5)).toBe(false);
  });
});

describe('Gameboard: tests for ship placement', () => {
  test('test ship placed horizontally is in the grid (square 1)', () => {
    const newBoard = new Gameboard();
    const battleship = new Ship('battleship');
    newBoard.placeShip([1, 5], 'horizontal', battleship);
    expect(newBoard.getSquareContent(1, 5)).toBe(battleship);
  });
  test('test ship placed horizontally is in the grid (square 4)', () => {
    const newBoard = new Gameboard();
    const battleship = new Ship('battleship');
    newBoard.placeShip([1, 5], 'horizontal', battleship);
    expect(newBoard.getSquareContent(1, 8)).toBe(battleship);
  });
  test('test ship placed horizontally is in the grid (from square 2,5)', () => {
    const newBoard = new Gameboard();
    const battleship = new Ship('battleship');
    newBoard.placeShip([2, 5], 'vertical', battleship);
    expect(newBoard.getSquareContent(2, 5)).toBe(battleship);
  });
  test('test ship placed vertically is in the grid (from square 2,5)', () => {
    const newBoard = new Gameboard();
    const battleship = new Ship('battleship');
    newBoard.placeShip([2, 5], 'vertical', battleship);
    expect(newBoard.getSquareContent(5, 5)).toBe(battleship);
  });
  test('does not allow to place ship that would go outside the board', () => {
    const newBoard = new Gameboard();
    const battleship = new Ship('battleship');
    expect(
      newBoard.legalMove([7, 0], 'vertical', battleship.getSquares())
    ).toBe(false);
  });
  test('does not allow to place ship that would go outside the board', () => {
    const newBoard = new Gameboard();
    const battleship = new Ship('battleship');
    expect(
      newBoard.legalMove([7, 7], 'horizontal', battleship.getSquares())
    ).toBe(false);
  });

  test('does not allow to place a ship when a square where the ship would be is already occupied', () => {
    const newBoard = new Gameboard();
    const battleship = new Ship('battleship');
    newBoard.placeShip([2, 2], 'vertical', battleship);
    const carrier = new Ship('carrier');
    console.table(newBoard._board);
    expect(newBoard.notOccupied([3, 2], 'vertical', carrier.getSquares())).toBe(
      false
    );
  });
  test('does not allow to place a ship when a square where the ship would be is already occupied (horizontal)', () => {
    const newBoard = new Gameboard();
    const battleship = new Ship('battleship');
    newBoard.placeShip([1, 5], 'horizontal', battleship);
    const carrier = new Ship('carrier');
    expect(newBoard.notOccupied([1, 5], 'vertical', carrier.getSquares())).toBe(
      false
    );
  });
});

/* describe('Gameboard: tests for ship receiving an attack', () => {}); */
