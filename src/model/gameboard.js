import { Player } from './player';

export class Gameboard {
  constructor(playerType) {
    this._sunkShips = 0;
    this._board = this.boardCreation();
    this.playerType = playerType;
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
    this._sunkShips = this._sunkShips + 1;
  }
  getSunkShips() {
    return this._sunkShips;
  }
  isAllLost() {
    return this._sunkShips === 5;
  }

  // Methods relating to gameboard - the content of square etc
  getSquareContent(x, y) {
    return this._board[x][y];
  }
  setSquareContent(x, y, content) {
    this._board[x][y] = content;
  }
  hitSquare(x, y) {
    if (this.getSquareContent(x, y) === 'hit') return false;
    this._board[x][y] = 'hit';
  }
  getFullBoard() {
    return this._board;
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
      let newCoords = Player.getRandomCoordinates(true);
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
