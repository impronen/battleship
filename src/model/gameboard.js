import { Player } from './player';
import { Ship } from './ships';
import { Game } from '../controller/game';
import { dom } from '../view/dom';

export class Gameboard {
  constructor(playerType) {
    this.sunkShips = 0;
    this.board = this.boardCreation();
    this.playerType = playerType;
    this.shots = [];
    this.shipArray = [
      'carrier',
      'battleship',
      'cruiser',
      'submarine',
      'destroyer',
    ];
  }
  boardCreation() {
    let newBoard = new Array(10);
    for (let i = 0; i < newBoard.length; i++) {
      newBoard[i] = Array.from('0123456789');
    }
    return newBoard;
  }
  // Methods relating to gameboard - the content of square etc
  getSquareContent(x, y) {
    return this.board[x][y];
  }
  setSquareContent(x, y, content) {
    this.board[x][y] = content;
  }
  hitSquare(x, y) {
    // This needs to be reworked as now board is used to store Ship objects
    this.board[x][y] = 'hit';
  }
  getFullBoard() {
    return this.board;
  }
  getShipArray() {
    return this.shipArray;
  }

  // Ship properties - how many sunk ships / have all been sunk
  shipWasSunk() {
    this.sunkShips = this.sunkShips + 1;
  }
  getSunkShips() {
    return this.sunkShips;
  }
  isAllLost() {
    return this.sunkShips === 5;
  }

  // To be used by the AI player for ship placement and shooty things
  getRandomCoordinates(placement) {
    let coords = [];
    let i = 2;
    while (i > 0) {
      let random = Math.random() * (9 - 0) + 0;
      coords.push(Math.round(random));
      i--;
    }
    // allows the method to be used when placing ships
    if (placement === true) {
      return coords;
    }
    // Recursive case to check if shots array already contains the generated number
    if (
      this.shots.some((shotSquare) =>
        shotSquare.every((digit, index) => digit === coords[index])
      )
    ) {
      return this.getRandomCoordinates();
    }
    this.shots.push(coords);
    return coords;
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

  // Ships - placement, checking for possible collisions
  placeShip([x, y], orientation, ship, playerType) {
    let length = ship.getSquares();
    let coordinates = [x, y];
    // Checks for legal moves
    // For AI new coordinates are generated until appropriate ones are found
    if (
      playerType === 'AI' &&
      (this.legalMove([x, y], orientation, length) === false ||
        this.notOccupied([x, y], orientation, length) === false)
    ) {
      let newCoords = this.getRandomCoordinates(true);
      return this.placeShip(newCoords, orientation, ship, playerType);
    } else if (
      // this part is used to prevent the human player to make illegal placements
      this.legalMove([x, y], orientation, length) === false ||
      this.notOccupied([x, y], orientation, length) === false
    ) {
      alert('Illegal move');
      return false;
    }
    // If coordinates are A-OK, we continue with placement
    if (orientation === 'horizontal') {
      while (length > 0) {
        this.setSquareContent(coordinates[0], coordinates[1], ship);
        dom.drawActionToBoard({
          action: 'placement',
          player: playerType,
          x: coordinates[1],
          y: coordinates[0],
        });
        coordinates[0]++;
        length--;
      }
    } else if (orientation === 'vertical') {
      while (length > 0) {
        this.setSquareContent(coordinates[0], coordinates[1], ship);
        dom.drawActionToBoard({
          action: 'placement',
          player: playerType,
          x: coordinates[1],
          y: coordinates[0],
        });
        coordinates[1]++;
        length--;
      }
    }
  }
  legalMove([x, y], orientation, length) {
    let lastSquare = [x, y];
    if (orientation === 'horizontal') {
      lastSquare[0] = lastSquare[0] - 1 + length;
    } else if (orientation === 'vertical') {
      lastSquare[1] = lastSquare[1] - 1 + length;
    }
    if (lastSquare[0] <= 9 && lastSquare[1] <= 9) {
      return true;
    }
    return false;
  }
  notOccupied([x, y], orientation, length) {
    if (orientation === 'horizontal') {
      while (length > 0) {
        if (this.getSquareContent(x, y) instanceof Ship) {
          return false;
        }
        x++;
        length--;
      }
    } else if (orientation === 'vertical') {
      while (length > 0) {
        if (this.getSquareContent(x, y) instanceof Ship) {
          return false;
        }
        y++;
        length--;
      }
    }
    return true;
  }

  aiShipPlacement() {
    let orientationArray = this.getRandomOrientation();

    let i = 0;
    while (i < 5) {
      let nextShip = new Ship(this.shipArray[i]);
      this.placeShip(
        this.getRandomCoordinates(true),
        orientationArray[0],
        nextShip,
        'AI'
      );
      i++;
      orientationArray.splice(0, 1);
    }
  }

  humanShipPlacement(eventObject) {
    if (this.shipArray.length < 1) {
    }
    let nextShip = new Ship(this.shipArray[0]);
    if (
      this.placeShip(
        [eventObject.y, eventObject.x],
        eventObject.orientation,
        nextShip,
        eventObject.player
      ) === false
    )
      return;
    this.shipArray.splice(0, 1);
  }
}
