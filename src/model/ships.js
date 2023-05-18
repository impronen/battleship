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
    else if (this.type === 'destroyer') return 2;
  }

  getPlayer() {
    return this.player;
  }
  getType() {
    return this.type;
  }

  getHealth() {
    return this.health;
  }

  hit() {
    if (this.health >= 1) this.health = this.health - 1;
    return this.health;
  }

  isSunk() {
    return this.health === 0;
  }
}
