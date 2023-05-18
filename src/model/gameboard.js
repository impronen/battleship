export class gameBoard {
  constructor(player) {
    this.player = player;
    this.sunkShips = 0;
  }
  shipWasSunk() {
    this.sunkShips = this.sunkShips + 1;
  }
  getSunkShips() {
    return this.sunkShips;
  }
  isAllLost() {
    return this.sunkShips === 5;
  }
}
