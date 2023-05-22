/* import { ship } from './ships'; */

export class gameBoard {
  constructor(player) {
    this.player = player;
    this._sunkShips = 0;
    this._board = Array(10).fill(Array(10).fill(null));
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
    if (typeof this.getSquareContent(x, y) === 'string') return false;
    else {
      this._board[x][y] = 'hit';
    }
  }

  // Ships - placement, checking for possible collisions
  placeShip([x, y], orientation, ship) {
    let length = ship.getSquares();
    let type = ship.getType();
    // Checks for legal move (ship will be in the grid + )
    if (!this.legalMove([x, y], orientation, length))
      return 'ERROR - outside the board!';
    // We continue with placement
    if (orientation === 'horizontal') {
      while (length > 0) {
        this.setSquareContent(x, y, type);
        x++;
        length--;
      }
    } else if (orientation === 'vertical') {
      while (length > 0) {
        this.setSquareContent(x, y, type);
        y--;
        length--;
      }
    }
  }
  legalMove([x, y], orientation, length) {
    let lastSquare = [x, y];
    if (orientation === 'horizontal') {
      lastSquare[0] = x + length;
    } else if (orientation === 'vertical') {
      lastSquare[1] = y - length;
    }
    if (lastSquare[0] <= 9 && lastSquare[1] >= 0) {
      return true;
    }
    return false;
  }
  isOccupied([x, y], orientation, length) {
    // do similar "last coordinates" as above
    // do a while loop where you add / subtrack based on orientation
    // if inside the loop you encounter a cell that is not null, return error
  }
}
