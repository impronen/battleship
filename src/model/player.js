export class Player {
  constructor(name, type) {
    this.Player = name;
    this.type = type;
    this.ships = [];
    this.shots = [];
  }
  getType() {
    return this.type;
  }

  saveShot([x, y]) {
    this.shots.push([x, y]);
  }
  checkShots() {
    return this.shots;
  }

  // To be used by the AI player for ship placement and shooty things
  getRandomCoordinates() {
    let coords = [];
    let i = 2;
    while (i > 0) {
      let random = Math.random() * (7 - 0) + 0;
      coords.push(Math.round(random));
      i--;
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
    let random = Math.random() * (10 - 1) + 1;
    if (random >= 5) return 'vertical';
    return 'horizontal';
  }
}
