import { Player } from '../model/player';
import { GameBoard } from '../model/gameboard';
import { Ship } from '../model/ships';

export class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentStage = shipPlacement;
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
  getCurrentStage() {
    return this.currentStage;
  }
  changeTurn(hit = false) {
    let human = this.player1.getName();
    let ai = this.player2.getName();
    if (hit === true) return;
    if (this.currentPlayer === human) {
      this.currentPlayer = ai;
    } else {
      this.currentPlayer = human;
    }
  }
  changeCurrentStage() {
    this.currentStage = combat;
  }
}
