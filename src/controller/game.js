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
    // call a dom method to show combat has started
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
    if (
      this.player2Board.getSquareContent(
        eventObject.y,
        eventObject.x
      ) instanceof Ship
    ) {
      this.player2Board
        .getSquareContent(eventObject.y, eventObject.x)
        .hit(eventObject.y, eventObject.x);
      dom.drawActionToBoard({
        action: 'shot',
        target: 'ship',
        player: eventObject.player,
        x: eventObject.x,
        y: eventObject.y,
      });
      if (
        this.player2Board
          .getSquareContent(eventObject.y, eventObject.x)
          .isSunk()
      ) {
        this.player2Board.shipWasSunk();
      }
      if (this.winChecker()) {
        dom.declareWinner('human');
      }
      this.aiAttack();
    } else if (
      this.player2Board.getSquareContent(eventObject.y, eventObject.x) === 'hit'
    ) {
      console.log('Already shot there chief');
    } else {
      this.player2Board.hitSquare(eventObject.y, eventObject.x);
      dom.drawActionToBoard({
        action: 'shot',
        target: 'ocean',
        player: eventObject.player,
        x: eventObject.x,
        y: eventObject.y,
      });
      console.log('empty waters took a devastating hit');
      this.aiAttack();
    }
  }

  aiAttack() {
    let shotLocation = this.player1Board.getRandomCoordinates();
    console.log(shotLocation);
    console.log(
      this.player1Board.getSquareContent(shotLocation[0], shotLocation[1])
    );
    if (
      this.player1Board.getSquareContent(
        shotLocation[0],
        shotLocation[1]
      ) instanceof Ship
    ) {
      if (
        this.player1Board
          .getSquareContent(shotLocation[0], shotLocation[1])
          .wasItAlreadyHitThere(shotLocation[0], shotLocation[1]) === true
      ) {
        return this.aiAttack();
      } else {
        console.log('ship is hit but not there yet');
        this.player1Board
          .getSquareContent(shotLocation[0], shotLocation[1])
          .hit(shotLocation[0], shotLocation[1]);
        if (
          this.player1Board
            .getSquareContent(shotLocation[0], shotLocation[1])
            .isSunk()
        ) {
          this.player1Board.shipWasSunk();
        }
        dom.drawActionToBoard({
          action: 'shot',
          target: 'ship',
          player: 'human',
          x: shotLocation[1],
          y: shotLocation[0],
        });
        if (this.winChecker('AI')) {
          dom.declareWinner('AI');
        }
      }
    } else if (
      this.player1Board.getSquareContent(shotLocation[0], shotLocation[1]) ===
      'hit'
    ) {
      return this.aiAttack();
    } else {
      this.player1Board.hitSquare(shotLocation[0], shotLocation[1]);
      dom.drawActionToBoard({
        action: 'shot',
        target: 'ocean',
        player: 'human',
        x: shotLocation[1],
        y: shotLocation[0],
      });
    }
  }

  winChecker(player) {
    if (player === 'AI') {
      if (this.player1Board.isAllLost()) {
        return true;
      }
    } else if (this.player2Board.isAllLost()) {
      console.log('AI LOST');
      return true;
    }
    return false;
  }

  gameEvent(eventObject) {
    this.currentStage === 'combat'
      ? this.combatController(eventObject)
      : this.currentStage === 'shipPlacement'
      ? this.placementController(eventObject)
      : null;
  }
}
