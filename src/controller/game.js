import { Player } from '../model/player';
import { Gameboard } from '../model/gameboard';
import { Ship } from '../model/ships';

export class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.player1Board = new Gameboard(player1.getType());
    this.player2Board = new Gameboard(player2.getType());
    this.currentStage = 'shipPlacement';
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
    if (hit === true) return;
    if (this.currentPlayer === this.player1.getName()) {
      this.currentPlayer = this.player2.getName();
    } else {
      this.currentPlayer = this.player1.getName();
    }
  }
  changeCurrentStage() {
    this.currentStage = combat;
  }
  startGameLoop() {
    console.log(this);
    /* this.player2Board.aiShipPlacement(); */
  }
  gameEvent(eventObject) {
    console.log(eventObject);
    if (this.currentStage === 'shipPlacement') {
      console.log('placement');
      this.player1Board.humanShipPlacement(eventObject);
    } else {
      console.log('combat');
    }
  }
}
