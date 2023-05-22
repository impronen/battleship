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
    if (!this.legalMove([x, y], orientation, length))
      return 'ERROR - outside the board!';

    if (orientation === 'horizontal') {
      while (length > 0) {
        this.setSquareContent(x, y, ship.getType());
        x++;
        length--;
      }
    } else if (orientation === 'vertical') {
      while (length > 0) {
        this.setSquareContent(x, y, ship.getType());
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
    if (lastSquare[0] <= 7 && lastSquare[1] >= 0) {
      return true;
    } else return false;
  }
}
