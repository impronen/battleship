import { Player } from '../model/player';
import { gameBoard } from '../model/gameboard';

export class Game {
  constructor(player1, player2, gameboard1, gameboard2) {
    this.player1 = player1;
    this.player2 = player2;
    this.gameboard1 = gameboard1;
    this.gameboard2 = gameboard2;
  }
  getPlayer1Stats() {
    return [this.player1.getType(), this.player1.getName()];
  }
  getPlayer2Stats() {
    return [this.player2.getType(), this.player2.getName()];
  }
}
