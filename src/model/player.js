import { Gameboard } from './gameboard';

export class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    /* this.board = new Gameboard(this.type); */
  }
  getType() {
    return this.type;
  }
  getName() {
    return this.name;
  }
}
