import { Player } from './player';
import { Ship } from './ships';

export class Gameboard {
  constructor(playerType) {
    this.sunkShips = 0;
    this.board = this.boardCreation();
    this.playerType = playerType;
    this.ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
    this.shots = [];
  }
  boardCreation() {
    let newBoard = new Array(10);
    for (let i = 0; i < newBoard.length; i++) {
      newBoard[i] = Array.from('0123456789');
    }
    return newBoard;
  }
  // Basic properties - how many sunk ships / have all been sunk
  shipWasSunk() {
    this.sunkShips = this.sunkShips + 1;
  }
  getSunkShips() {
    return this.sunkShips;
  }
  isAllLost() {
    return this.sunkShips === 5;
  }

  // Methods relating to gameboard - the content of square etc
  getSquareContent(x, y) {
    return this.board[x][y];
  }
  setSquareContent(x, y, content) {
    this.board[x][y] = content;
  }
  hitSquare(x, y) {
    if (this.getSquareContent(x, y) === 'hit') return false;
    this.board[x][y] = 'hit';
  }
  getFullBoard() {
    return this.board;
  }

  // These were moved from Player - most likely they wont be needed at all as the board
  // can be used to save and retrieve the same information to avoid redundancy
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
    if (placement === true) {
      return coords;
    }
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
    let i = 0;
    while (i < 5) {
      let nextShip = new Ship(this.ships[i]);
      console.log(nextShip);
      this.placeShip(
        this.getRandomCoordinates(true),
        orientationArray[0],
        nextShip,
        'AI'
      );
      i++;
      orientationArray.splice(0, 1);
    }
    let boardy = this.getFullBoard();
    console.table(boardy);
  }

  // Ships - placement, checking for possible collisions
  placeShip([x, y], orientation, ship, playerType) {
    let length = ship.getSquares();
    let coordinates = [x, y];
    // Checks for legal moves
    // For AI new coordinates are generated until appropriate ones are found
    console.log(`coordinates ${coordinates}, orientation ${orientation}`);
    if (
      playerType === 'AI' &&
      (this.legalMove([x, y], orientation, length) === false ||
        this.isOccupied([x, y], orientation, length) === false)
    ) {
      let newCoords = this.getRandomCoordinates(true);
      return this.placeShip(newCoords, orientation, ship, playerType);
    } else if (
      this.legalMove([x, y], orientation, length) === false ||
      this.isOccupied([x, y], orientation, length) === false
    ) {
      console.log('ship there already chief');
    }
    // We continue with placement
    if (orientation === 'horizontal') {
      while (length > 0) {
        this.setSquareContent(coordinates[0], coordinates[1], ship);
        coordinates[1]++;
        length--;
      }
    } else if (orientation === 'vertical') {
      while (length > 0) {
        this.setSquareContent(coordinates[0], coordinates[1], ship);
        coordinates[0]++;
        length--;
      }
    }
  }
  legalMove([x, y], orientation, length) {
    let lastSquare = [x, y];
    if (orientation === 'horizontal') {
      lastSquare[1] = lastSquare[1] + length;
    } else if (orientation === 'vertical') {
      lastSquare[0] = lastSquare[0] + length;
    }
    if (lastSquare[0] <= 9 && lastSquare[1] <= 9) {
      return true;
    }
    return false;
  }
  isOccupied([x, y], orientation, length) {
    if (orientation === 'horizontal') {
      while (length > 0) {
        if (typeof this.getSquareContent(x, y) === 'object') {
          return false;
        }
        y++;
        length--;
      }
    } else if (orientation === 'vertical') {
      while (length > 0) {
        if (typeof this.getSquareContent(x, y) === 'object') return false;
        x++;
        length--;
      }
    }
    return true;
  }
}
