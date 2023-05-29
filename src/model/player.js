import { Gameboard } from './gameboard';
import { Ship } from './ships';

export class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
    this.shots = [];
    this.board = new Gameboard();
  }
  getType() {
    return this.type;
  }
  getName() {
    return this.name;
  }

  saveShot([x, y]) {
    this.shots.push([x, y]);
  }
  checkShots() {
    return this.shots;
  }

  // To be used by the AI player for ship placement and shooty things
  getRandomCoordinates(placement) {
    let coords = [];
    let i = 2;
    while (i > 0) {
      let random = Math.random() * (7 - 0) + 0;
      coords.push(Math.round(random));
      i--;
    }
    // allows the method to be used when placing ships, error checking for
    // viability of produced coords is done in gameboard
    if (placement === true) return coords;
    // Recursive case to check if shots array already contains the generated number
    if (
      this.shots.some((shotSquare) =>
        // For some weird reason the coords will not find a match with contents of shots
        // array unless there is a digit by digit check (something about deep equality?)
        shotSquare.every((digit, index) => digit === coords[index])
      )
    ) {
      return this.getRandomCoordinates();
    }
    this.shots.push(coords);
  }
  getRandomOrientation() {
    let orientationArray = [];
    let i = 5;
    while (i > 0) {
      let random = Math.random() * (10 - 1) + 1;
      if (random >= 5) orientationArray.push('vertical');
      else orientationArray.push('horizontal');
      i--;
    }
    return orientationArray;
  }

  // AI ship placement algo
  aiShipPlacement() {
    let orientationArray = this.getRandomOrientation();
    let shipArray = this.ships;

    while (shipArray.length > 0) {
      let coordinates = this.getRandomCoordinates(true);
      let i = 0;
      console.log(shipArray[i]);
      let nextShip = new Ship(shipArray[i]);
      i++;
      console.log(coordinates, orientationArray[0], nextShip);
      console.log(typeof coordinates);
      this.board.placeShip(coordinates, orientationArray[0], nextShip);
      shipArray.splice(0, 1);
      orientationArray.splice(0, 1);
      let boardy = this.board.getFullBoard();
      console.log(boardy);
    }
  }
}
