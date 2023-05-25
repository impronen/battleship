import { Player } from '../model/player';
import { gameBoard } from '../model/gameboard';

export class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = this.player1.getName();
  }

  getPlayer1Stats() {
    return [this.player1.getType(), this.player1.getName()];
  }
  getPlayer2Stats() {
    return [this.player2.getType(), this.player2.getName()];
  }
  getCurrentPlayer() {
    return this.currentPlayer;
  }
  changeTurn(hit = false) {
    console.log(hit);
    let human = this.player1.getName();
    let ai = this.player2.getName();
    if (hit === true) return;
    console.log(this.currentPlayer);
    if (this.currentPlayer === human) {
      this.currentPlayer = ai;
    } else {
      this.currentPlayer = human;
    }
  }
}
