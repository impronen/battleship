export class ship {
  constructor(player, type) {
    this.player = player;
    this.type = type;
    this.health = this.getSquares();
  }
  getSquares() {
    if (this.type === 'carrier') return 5;
    else if (this.type === 'battleship') return 4;
    else if (this.type === 'cruiser') return 3;
    else if (this.type === 'submarine') return 3;
    else return 2;
  }
  getPlayer() {
    return this.player;
  }

  getHealth() {
    return this.health;
  }
  hit() {
    this.health = this.health - 1;
    return this.health;
  }
  isSunk() {
    return this.health === 0;
  }
}
