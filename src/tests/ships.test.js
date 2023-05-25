import { ship } from '../model/ships';

describe('Ship functionality tests', () => {
  test('test that ship returns the correct number of squares', () => {
    const newShip = new ship('submarine');
    expect(newShip.getSquares()).toBe(3);
  });

  test('test that ship returns correct health', () => {
    const newShip = new ship('submarine');
    expect(newShip.getHealth()).toBe(3);
  });

  test('test that ship health is impacted when it is hit', () => {
    const newShip = new ship('submarine');
    newShip.hit();
    expect(newShip.getHealth()).toBe(2);
  });

  test('test that ship is sunk, when health goes to zero', () => {
    const newShip = new ship('submarine');
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
  });

  test('test that ship health is no longer impacted when it has been sunk', () => {
    const newShip = new ship('submarine');
    newShip.hit();
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.getHealth()).toBe(0);
  });

  test('test that ship isnt sunk, when health is above zero', () => {
    const newShip = new ship('submarine');
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(false);
  });
});
