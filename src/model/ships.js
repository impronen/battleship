export class Ship {
  constructor(type) {
    this.type = type;
    this.health = this.getSquares();
    this.placesThatTookHits = [];
  }

  getSquares() {
    if (this.type === 'carrier') return 5;
    else if (this.type === 'battleship') return 4;
    else if (this.type === 'cruiser') return 3;
    else if (this.type === 'submarine') return 3;
    else if (this.type === 'destroyer') return 2;
  }

  getType() {
    return this.type;
  }

  getHealth() {
    return this.health;
  }

  hit(y, x) {
    if (this.wasItAlreadyHitThere(y, x) === true) return;
    if (this.health >= 1) this.health = this.health - 1;
    this.placesThatTookHits.push([y, x]);
    console.log(this.health);
    return this.health;
  }
  wasItAlreadyHitThere(y, x) {
    let coords = [y, x];
    if (
      this.placesThatTookHits.some((shotSqare) =>
        shotSqare.every((digit, index) => digit === coords[index])
      )
    ) {
      console.log('this ship already took a hit there');
      return true;
    }
    console.log('no hits there yet');
    return false;
  }

  isSunk() {
    return this.health === 0;
  }
}
