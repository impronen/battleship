import { Player } from '../model/player';
import { Gameboard } from '../model/gameboard';
import { Ship } from '../model/ships';
import { dom } from '../view/dom';

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
    this.currentStage = 'combat';
    console.log('combat');
  }
  startGameLoop() {
    console.log(this);
    this.player2Board.aiShipPlacement();
  }
  placementController(eventObject) {
    if (eventObject.player === 'AI') return;
    if (this.player1Board.getShipArray().length === 1) {
      this.player1Board.humanShipPlacement(eventObject);
      this.changeCurrentStage();
      return;
    }
    this.player1Board.humanShipPlacement(eventObject);
  }
  combatController(eventObject) {
    if (
      eventObject.player === 'human' &&
      this.currentPlayer == this.player1.getName()
    ) {
      return;
    }
    this.humanAttack(eventObject);
  }

  humanAttack(eventObject) {
    console.log(eventObject);

    this.player2Board.getSquareContent(eventObject.y, eventObject.x);

    if (
      this.player2Board.getSquareContent(
        eventObject.y,
        eventObject.x
      ) instanceof Ship
    ) {
      this.shipTakesHits(eventObject.y, eventObject.x);
      dom.drawActionToBoard({
        action: 'shot',
        player: playerType,
        x: coordinates[0],
        y: coordinates[1],
      });
      console.log(
        this.player2Board
          .getSquareContent(eventObject.y, eventObject.x)
          .getHealth()
      );
    } else if (
      this.player2Board.getSquareContent(eventObject.y, eventObject.x) === 'hit'
    ) {
      console.log('Already shot there chief');
    } else {
      this.player2Board.hitSquare(eventObject.y, eventObject.x);
      dom.drawActionToBoard({
        action: 'shot',
        player: playerType,
        x: coordinates[0],
        y: coordinates[1],
      });
      console.log('empty waters took a devastating hit');
    }
  }

  shipTakesHits(y, x) {
    const type = this.player2Board.getSquareContent(y, x).getType();
    this.player2Board.getSquareContent(y, x).hit(y, x);
    const health = this.player2Board.getSquareContent(y, x).getHealth();
    console.log(`It's a hit on a ${type}. Health is down to ${health}`);
  }

  gameEvent(eventObject) {
    this.currentStage === 'combat'
      ? this.combatController(eventObject)
      : this.currentStage === 'shipPlacement'
      ? this.placementController(eventObject)
      : null;
  }
}
