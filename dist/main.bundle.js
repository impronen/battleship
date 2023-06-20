"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["main"],{

/***/ "./src/controller/game.js":
/*!********************************!*\
  !*** ./src/controller/game.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _model_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/player */ "./src/model/player.js");
/* harmony import */ var _model_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/gameboard */ "./src/model/gameboard.js");
/* harmony import */ var _model_ships__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/ships */ "./src/model/ships.js");
/* harmony import */ var _view_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/dom */ "./src/view/dom.js");




class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.player1Board = new _model_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard(player1.getType());
    this.player2Board = new _model_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard(player2.getType());
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
  changeTurn() {
    let hit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (hit === true) return;
    if (this.currentPlayer === this.player1.getName()) {
      this.currentPlayer = this.player2.getName();
    } else {
      this.currentPlayer = this.player1.getName();
    }
  }
  changeCurrentStage() {
    this.currentStage = 'combat';
    _view_dom__WEBPACK_IMPORTED_MODULE_3__.dom.combatDisplayer();
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
    if (eventObject.player === 'human' && this.currentPlayer == this.player1.getName()) {
      return;
    }
    this.humanAttack(eventObject);
  }
  humanAttack(eventObject) {
    if (this.player2Board.getSquareContent(eventObject.y, eventObject.x) instanceof _model_ships__WEBPACK_IMPORTED_MODULE_2__.Ship) {
      this.player2Board.getSquareContent(eventObject.y, eventObject.x).hit(eventObject.y, eventObject.x);
      _view_dom__WEBPACK_IMPORTED_MODULE_3__.dom.drawActionToBoard({
        action: 'shot',
        target: 'ship',
        player: eventObject.player,
        x: eventObject.x,
        y: eventObject.y
      });
      if (this.player2Board.getSquareContent(eventObject.y, eventObject.x).isSunk()) {
        this.player2Board.shipWasSunk();
      }
      if (this.winChecker()) {
        _view_dom__WEBPACK_IMPORTED_MODULE_3__.dom.declareWinner('human');
      }
      this.aiAttack();
    } else if (this.player2Board.getSquareContent(eventObject.y, eventObject.x) === 'hit') {
      console.log('Already shot there chief');
    } else {
      this.player2Board.hitSquare(eventObject.y, eventObject.x);
      _view_dom__WEBPACK_IMPORTED_MODULE_3__.dom.drawActionToBoard({
        action: 'shot',
        target: 'ocean',
        player: eventObject.player,
        x: eventObject.x,
        y: eventObject.y
      });
      console.log('empty waters took a devastating hit');
      this.aiAttack();
    }
  }
  aiAttack() {
    let shotLocation = this.player1Board.getRandomCoordinates();
    console.log(shotLocation);
    console.log(this.player1Board.getSquareContent(shotLocation[0], shotLocation[1]));
    if (this.player1Board.getSquareContent(shotLocation[0], shotLocation[1]) instanceof _model_ships__WEBPACK_IMPORTED_MODULE_2__.Ship) {
      if (this.player1Board.getSquareContent(shotLocation[0], shotLocation[1]).wasItAlreadyHitThere(shotLocation[0], shotLocation[1]) === true) {
        return this.aiAttack();
      } else {
        console.log('ship is hit but not there yet');
        this.player1Board.getSquareContent(shotLocation[0], shotLocation[1]).hit(shotLocation[0], shotLocation[1]);
        if (this.player1Board.getSquareContent(shotLocation[0], shotLocation[1]).isSunk()) {
          this.player1Board.shipWasSunk();
        }
        _view_dom__WEBPACK_IMPORTED_MODULE_3__.dom.drawActionToBoard({
          action: 'shot',
          target: 'ship',
          player: 'human',
          x: shotLocation[1],
          y: shotLocation[0]
        });
        if (this.winChecker('AI')) {
          _view_dom__WEBPACK_IMPORTED_MODULE_3__.dom.declareWinner('AI');
        }
      }
    } else if (this.player1Board.getSquareContent(shotLocation[0], shotLocation[1]) === 'hit') {
      return this.aiAttack();
    } else {
      this.player1Board.hitSquare(shotLocation[0], shotLocation[1]);
      _view_dom__WEBPACK_IMPORTED_MODULE_3__.dom.drawActionToBoard({
        action: 'shot',
        target: 'ocean',
        player: 'human',
        x: shotLocation[1],
        y: shotLocation[0]
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
    this.currentStage === 'combat' ? this.combatController(eventObject) : this.currentStage === 'shipPlacement' ? this.placementController(eventObject) : null;
  }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _view_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/dom */ "./src/view/dom.js");
/* harmony import */ var _view_eventlisteners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/eventlisteners */ "./src/view/eventlisteners.js");



_view_dom__WEBPACK_IMPORTED_MODULE_1__.dom.createGameboards();
_view_eventlisteners__WEBPACK_IMPORTED_MODULE_2__.events.startListener();
_view_eventlisteners__WEBPACK_IMPORTED_MODULE_2__.events.orientationListener();
_view_eventlisteners__WEBPACK_IMPORTED_MODULE_2__.events.gridListener('human');
_view_eventlisteners__WEBPACK_IMPORTED_MODULE_2__.events.gridListener('AI');

/***/ }),

/***/ "./src/model/gameboard.js":
/*!********************************!*\
  !*** ./src/model/gameboard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/model/player.js");
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships */ "./src/model/ships.js");
/* harmony import */ var _controller_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/game */ "./src/controller/game.js");
/* harmony import */ var _view_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/dom */ "./src/view/dom.js");




class Gameboard {
  constructor(playerType) {
    this.sunkShips = 0;
    this.board = this.boardCreation();
    this.playerType = playerType;
    this.shots = [];
    this.shipArray = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
  }
  boardCreation() {
    let newBoard = new Array(10);
    for (let i = 0; i < newBoard.length; i++) {
      newBoard[i] = Array.from('0123456789');
    }
    return newBoard;
  }
  // Methods relating to gameboard - the content of square etc
  getSquareContent(x, y) {
    return this.board[x][y];
  }
  setSquareContent(x, y, content) {
    this.board[x][y] = content;
  }
  hitSquare(x, y) {
    // This needs to be reworked as now board is used to store Ship objects
    this.board[x][y] = 'hit';
  }
  getFullBoard() {
    return this.board;
  }
  getShipArray() {
    return this.shipArray;
  }

  // Ship properties - how many sunk ships / have all been sunk
  shipWasSunk() {
    this.sunkShips = this.sunkShips + 1;
  }
  getSunkShips() {
    return this.sunkShips;
  }
  isAllLost() {
    console.log(`sunk ships: ${this.sunkShips}`);
    return this.sunkShips === 5;
  }

  // To be used by the AI player for ship placement and shooty things
  getRandomCoordinates(placement) {
    let coords = [];
    let i = 2;
    while (i > 0) {
      let random = Math.random() * (9 - 0) + 0;
      coords.push(Math.round(random));
      i--;
    }
    // allows the method to be used when placing ships
    if (placement === true) {
      return coords;
    }
    // Recursive case to check if shots array already contains the generated number
    if (this.shots.some(shotSquare => shotSquare.every((digit, index) => digit === coords[index]))) {
      return this.getRandomCoordinates();
    }
    this.shots.push(coords);
    return coords;
  }
  getRandomOrientation() {
    let orientationArray = [];
    let i = 5;
    while (i > 0) {
      let random = Math.random() * (10 - 1) + 1;
      if (random >= 5) orientationArray.push('vertical');else orientationArray.push('horizontal');
      i--;
    }
    return orientationArray;
  }

  // Ships - placement, checking for possible collisions
  placeShip(_ref, orientation, ship, playerType) {
    let [x, y] = _ref;
    let length = ship.getSquares();
    let coordinates = [x, y];
    // Checks for legal moves
    // For AI new coordinates are generated until appropriate ones are found
    if (playerType === 'AI' && (this.legalMove([x, y], orientation, length) === false || this.notOccupied([x, y], orientation, length) === false)) {
      let newCoords = this.getRandomCoordinates(true);
      return this.placeShip(newCoords, orientation, ship, playerType);
    } else if (
    // this part is used to prevent the human player to make illegal placements
    this.legalMove([x, y], orientation, length) === false || this.notOccupied([x, y], orientation, length) === false) {
      console.log('Illegal move');
      return false;
    }
    // If coordinates are A-OK, we continue with placement
    if (orientation === 'horizontal') {
      while (length > 0) {
        this.setSquareContent(coordinates[0], coordinates[1], ship);
        _view_dom__WEBPACK_IMPORTED_MODULE_3__.dom.drawActionToBoard({
          action: 'placement',
          player: playerType,
          x: coordinates[1],
          y: coordinates[0]
        });
        coordinates[0]++;
        length--;
      }
    } else if (orientation === 'vertical') {
      while (length > 0) {
        this.setSquareContent(coordinates[0], coordinates[1], ship);
        _view_dom__WEBPACK_IMPORTED_MODULE_3__.dom.drawActionToBoard({
          action: 'placement',
          player: playerType,
          x: coordinates[1],
          y: coordinates[0]
        });
        coordinates[1]++;
        length--;
      }
    }
  }
  legalMove(_ref2, orientation, length) {
    let [x, y] = _ref2;
    let lastSquare = [x, y];
    if (orientation === 'horizontal') {
      lastSquare[0] = lastSquare[0] - 1 + length;
      /*       console.log(`last square is ${lastSquare[0]},${lastSquare[1]}`); */
    } else if (orientation === 'vertical') {
      lastSquare[1] = lastSquare[1] - 1 + length;
      /*       console.log(`last square is ${lastSquare[0]},${lastSquare[1]}`); */
    }

    if (lastSquare[0] <= 9 && lastSquare[1] <= 9) {
      return true;
    }
    return false;
  }
  notOccupied(_ref3, orientation, length) {
    let [x, y] = _ref3;
    if (orientation === 'horizontal') {
      while (length > 0) {
        if (this.getSquareContent(x, y) instanceof _ships__WEBPACK_IMPORTED_MODULE_1__.Ship) {
          return false;
        }
        x++;
        length--;
      }
    } else if (orientation === 'vertical') {
      while (length > 0) {
        if (this.getSquareContent(x, y) instanceof _ships__WEBPACK_IMPORTED_MODULE_1__.Ship) {
          return false;
        }
        y++;
        length--;
      }
    }
    return true;
  }
  aiShipPlacement() {
    let orientationArray = this.getRandomOrientation();
    let i = 0;
    while (i < 5) {
      let nextShip = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship(this.shipArray[i]);
      this.placeShip(this.getRandomCoordinates(true), orientationArray[0], nextShip, 'AI');
      i++;
      orientationArray.splice(0, 1);
    }
    let boardy = this.getFullBoard();
    console.table(boardy);
  }
  humanShipPlacement(eventObject) {
    if (this.shipArray.length < 1) {
      console.log('them ships were placed');
    }
    let nextShip = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship(this.shipArray[0]);
    if (this.placeShip([eventObject.y, eventObject.x], eventObject.orientation, nextShip, eventObject.player) === false) return;
    this.shipArray.splice(0, 1);
    let boardy = this.getFullBoard();
    console.table(boardy);
  }
}

/***/ }),

/***/ "./src/model/player.js":
/*!*****************************!*\
  !*** ./src/model/player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/model/gameboard.js");

class Player {
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

/***/ }),

/***/ "./src/model/ships.js":
/*!****************************!*\
  !*** ./src/model/ships.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(type) {
    this.type = type;
    this.health = this.getSquares();
    this.placesThatTookHits = [];
  }
  getSquares() {
    if (this.type === 'carrier') return 5;else if (this.type === 'battleship') return 4;else if (this.type === 'cruiser') return 3;else if (this.type === 'submarine') return 3;else if (this.type === 'destroyer') return 2;
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
    if (this.placesThatTookHits.some(shotSqare => shotSqare.every((digit, index) => digit === coords[index]))) {
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

/***/ }),

/***/ "./src/view/dom.js":
/*!*************************!*\
  !*** ./src/view/dom.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dom": () => (/* binding */ dom)
/* harmony export */ });
/* harmony import */ var _controller_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controller/game */ "./src/controller/game.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventlisteners */ "./src/view/eventlisteners.js");


const dom = (() => {
  function createGrid(board) {
    for (let i = 0; i <= 9; i++) {
      let column = document.createElement('div');
      column.classList.add('column');
      column.dataset.index = i;
      board.appendChild(column);
      for (let l = 0; l <= 9; l++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = l;
        column.appendChild(cell);
      }
    }
  }
  function createGameboards() {
    const humangameboard = document.querySelector('.humangameboard');
    const aigameboard = document.querySelector('.aigameboard');
    createGrid(humangameboard);
    createGrid(aigameboard);
  }
  function drawActionToBoard(drawObject) {
    if (drawObject.action === 'placement') drawShip(drawObject);
    if (drawObject.action === 'shot') drawShot(drawObject);
  }
  function drawShip(drawObject) {
    let playerBoard = 'humangameboard';
    if (drawObject.player === 'AI') playerBoard = 'aigameboard';
    if (drawObject.player === 'human') playerBoard = 'humangameboard';
    const cell = cellSelector(playerBoard, drawObject);
    cell.classList.add('ship');
  }
  function drawShot(drawObject) {
    let playerBoard = 'humangameboard';
    if (drawObject.player === 'AI') playerBoard = 'aigameboard';
    if (drawObject.player === 'human') playerBoard = 'humangameboard';
    const cell = cellSelector(playerBoard, drawObject);
    if (drawObject.target === 'ocean') {
      cell.classList.add('hitOcean');
    }
    if (drawObject.target === 'ship') {
      cell.classList.add('hitShip');
    }
  }
  function cellSelector(playerBoard, drawObject) {
    const selector = `.${playerBoard} .column[data-index="${drawObject.x}"] .cell:nth-child(${drawObject.y + 1})`;
    return document.querySelector(selector);
  }
  function declareWinner(winner) {
    console.log(winner);
    const dialog = document.querySelector('dialog');
    const text = document.querySelector('.winner');
    dialog.classList.add('dialogVisible');
    text.innerText = `The winner is the ${winner}`;
    dialog.showModal();
    _eventlisteners__WEBPACK_IMPORTED_MODULE_1__.events.resetListener();
  }
  function orientationDisplayer() {
    const orientationDisplay = document.querySelector('.orientationDisplay');
    if (orientationDisplay.innerText === 'horizontal') {
      orientationDisplay.innerText = 'vertical';
    } else {
      orientationDisplay.innerText = 'horizontal';
    }
  }
  function combatDisplayer() {
    const orientationDisplay = document.querySelector('.orientationDisplay');
    orientationDisplay.innerText = 'COMBAT! Shoot away!';
  }
  return {
    createGameboards,
    drawActionToBoard,
    declareWinner,
    orientationDisplayer,
    combatDisplayer
  };
})();

/***/ }),

/***/ "./src/view/eventlisteners.js":
/*!************************************!*\
  !*** ./src/view/eventlisteners.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "events": () => (/* binding */ events)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/view/dom.js");
/* harmony import */ var _controller_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/game */ "./src/controller/game.js");
/* harmony import */ var _model_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/player */ "./src/model/player.js");



const events = (() => {
  let humanGrid = document.querySelector('.humangameboard');
  let orientation = 'vertical';
  let newGame = undefined;
  function startListener() {
    const startButton = document.querySelector('#start');
    startButton.addEventListener('click', event => {
      if (typeof newGame === 'object') return;
      newGame = new _controller_game__WEBPACK_IMPORTED_MODULE_1__.Game(new _model_player__WEBPACK_IMPORTED_MODULE_2__.Player('antero', 'human'), new _model_player__WEBPACK_IMPORTED_MODULE_2__.Player('Bob', 'AI'));
      newGame.startGameLoop();
    });
  }
  function orientationListener() {
    const orientationButton = document.querySelector('#orientation');
    orientationButton.addEventListener('click', event => {
      orientation = orientation !== 'horizontal' ? 'horizontal' : 'vertical';
      _dom__WEBPACK_IMPORTED_MODULE_0__.dom.orientationDisplayer(orientation);
      console.log(orientation);
    });
  }
  function gridListener(player) {
    let humanGrid = document.querySelector('.humangameboard');
    let aiGrid = document.querySelector('.aigameboard');
    let columns = null;
    if (player === 'human') {
      columns = humanGrid.childNodes;
    } else columns = aiGrid.childNodes;
    columns.forEach(column => {
      column.addEventListener('click', square => {
        newGame.gameEvent({
          player: player,
          x: Number(square.target.parentElement.dataset.index),
          y: Number(square.target.dataset.index),
          orientation: orientation
        });
      });
    });
  }
  function resetListener() {
    let resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', () => {
      location.reload();
    });
  }
  return {
    startListener,
    orientationListener,
    gridListener,
    resetListener
  };
})();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* CSS HSL */\n:root {\n  --sky-blue: hsla(199, 64%, 73%, 1);\n  --blue-green: rgb(22, 108, 129);\n  --prussian-blue: hsla(200, 95%, 14%, 1);\n  --selective-yellow: hsla(43, 100%, 51%, 1);\n  --ut-orange: hsla(32, 100%, 49%, 1);\n  --cool-gray: hsla(218, 17%, 72%);\n  --deep-orange: rgb(201, 58, 15);\n}\n\nbody {\n  font-family: roboto, -apple-system, BlinkMacSystemFont, 'Open Sans',\n    'Helvetica Neue', sans-serif;\n  margin: 0;\n  color: var(--selective-yellow);\n  background-color: var(--prussian-blue);\n}\n\nmain,\nheader {\n  margin: 2%;\n}\n\nheader {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nbutton {\n  padding: 7px;\n}\n\ndialog {\n  z-index: 10;\n  margin-top: 10px;\n  padding: 5%;\n  background: var(--blue-green);\n  border: none;\n  border-radius: 1rem;\n}\n\ndialog::backdrop {\n  background-color: hsla(0, 0%, 0%, 0.404);\n}\n\n.dialogVisible {\n  display: flex;\n  flex-direction: column;\n}\n\n.controls,\n.gameboard-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.top {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n}\n\n.gameboard-container {\n  margin: 2%;\n}\n\n.humangameboard,\n.aigameboard {\n  display: flex;\n  border: 1px solid;\n}\n\n.column {\n  min-width: 30px;\n}\n\n.cell {\n  background-color: var(--prussian-blue);\n  border: 1px solid;\n  min-height: 30px;\n}\n\n.cell:hover {\n  background-color: var(--ut-orange);\n}\n\n.ship {\n  background-color: var(--blue-green);\n}\n\n.hitShip {\n  background-color: var(--deep-orange);\n}\n\n.hitOcean {\n  background-color: var(--ut-orange);\n}\n\n.orientationDisplay {\n  padding-left: 2%;\n  padding-right: 2%;\n  padding-top: 1%;\n  padding-bottom: 1%;\n  border: 1px solid;\n}\n\n.help {\n  padding-top: 5%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.start,\n.placement,\n.combat {\n  width: 40%;\n  text-align: center;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA,YAAY;AACZ;EACE,kCAAkC;EAClC,+BAA+B;EAC/B,uCAAuC;EACvC,0CAA0C;EAC1C,mCAAmC;EACnC,gCAAgC;EAChC,+BAA+B;AACjC;;AAEA;EACE;gCAC8B;EAC9B,SAAS;EACT,8BAA8B;EAC9B,sCAAsC;AACxC;;AAEA;;EAEE,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;EACX,gBAAgB;EAChB,WAAW;EACX,6BAA6B;EAC7B,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,wCAAwC;AAC1C;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;;EAEE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,UAAU;AACZ;;AAEA;;EAEE,aAAa;EACb,iBAAiB;AACnB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,sCAAsC;EACtC,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,eAAe;EACf,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;;EAGE,UAAU;EACV,kBAAkB;AACpB","sourcesContent":["/* CSS HSL */\n:root {\n  --sky-blue: hsla(199, 64%, 73%, 1);\n  --blue-green: rgb(22, 108, 129);\n  --prussian-blue: hsla(200, 95%, 14%, 1);\n  --selective-yellow: hsla(43, 100%, 51%, 1);\n  --ut-orange: hsla(32, 100%, 49%, 1);\n  --cool-gray: hsla(218, 17%, 72%);\n  --deep-orange: rgb(201, 58, 15);\n}\n\nbody {\n  font-family: roboto, -apple-system, BlinkMacSystemFont, 'Open Sans',\n    'Helvetica Neue', sans-serif;\n  margin: 0;\n  color: var(--selective-yellow);\n  background-color: var(--prussian-blue);\n}\n\nmain,\nheader {\n  margin: 2%;\n}\n\nheader {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nbutton {\n  padding: 7px;\n}\n\ndialog {\n  z-index: 10;\n  margin-top: 10px;\n  padding: 5%;\n  background: var(--blue-green);\n  border: none;\n  border-radius: 1rem;\n}\n\ndialog::backdrop {\n  background-color: hsla(0, 0%, 0%, 0.404);\n}\n\n.dialogVisible {\n  display: flex;\n  flex-direction: column;\n}\n\n.controls,\n.gameboard-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.top {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n}\n\n.gameboard-container {\n  margin: 2%;\n}\n\n.humangameboard,\n.aigameboard {\n  display: flex;\n  border: 1px solid;\n}\n\n.column {\n  min-width: 30px;\n}\n\n.cell {\n  background-color: var(--prussian-blue);\n  border: 1px solid;\n  min-height: 30px;\n}\n\n.cell:hover {\n  background-color: var(--ut-orange);\n}\n\n.ship {\n  background-color: var(--blue-green);\n}\n\n.hitShip {\n  background-color: var(--deep-orange);\n}\n\n.hitOcean {\n  background-color: var(--ut-orange);\n}\n\n.orientationDisplay {\n  padding-left: 2%;\n  padding-right: 2%;\n  padding-top: 1%;\n  padding-bottom: 1%;\n  border: 1px solid;\n}\n\n.help {\n  padding-top: 5%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.start,\n.placement,\n.combat {\n  width: 40%;\n  text-align: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUM7QUFDTTtBQUNUO0FBQ0o7QUFFM0IsTUFBTUksSUFBSSxDQUFDO0VBQ2hCQyxXQUFXQSxDQUFDQyxPQUFPLEVBQUVDLE9BQU8sRUFBRTtJQUM1QixJQUFJLENBQUNELE9BQU8sR0FBR0EsT0FBTztJQUN0QixJQUFJLENBQUNDLE9BQU8sR0FBR0EsT0FBTztJQUN0QixJQUFJLENBQUNDLFlBQVksR0FBRyxJQUFJUCx1REFBUyxDQUFDSyxPQUFPLENBQUNHLE9BQU8sRUFBRSxDQUFDO0lBQ3BELElBQUksQ0FBQ0MsWUFBWSxHQUFHLElBQUlULHVEQUFTLENBQUNNLE9BQU8sQ0FBQ0UsT0FBTyxFQUFFLENBQUM7SUFDcEQsSUFBSSxDQUFDRSxZQUFZLEdBQUcsZUFBZTtJQUNuQyxJQUFJLENBQUNDLGFBQWEsR0FBRyxJQUFJLENBQUNOLE9BQU8sQ0FBQ08sT0FBTyxFQUFFO0VBQzdDO0VBRUFDLGVBQWVBLENBQUEsRUFBRztJQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDUixPQUFPLENBQUNHLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQ0gsT0FBTyxDQUFDTyxPQUFPLEVBQUUsQ0FBQztFQUN6RDtFQUNBRSxlQUFlQSxDQUFBLEVBQUc7SUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQ1IsT0FBTyxDQUFDRSxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUNGLE9BQU8sQ0FBQ00sT0FBTyxFQUFFLENBQUM7RUFDekQ7RUFDQUcsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDakIsT0FBTyxJQUFJLENBQUNKLGFBQWE7RUFDM0I7RUFDQUssZUFBZUEsQ0FBQSxFQUFHO0lBQ2hCLE9BQU8sSUFBSSxDQUFDTixZQUFZO0VBQzFCO0VBQ0FPLFVBQVVBLENBQUEsRUFBYztJQUFBLElBQWJDLEdBQUcsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsS0FBSztJQUNwQixJQUFJRCxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ2xCLElBQUksSUFBSSxDQUFDUCxhQUFhLEtBQUssSUFBSSxDQUFDTixPQUFPLENBQUNPLE9BQU8sRUFBRSxFQUFFO01BQ2pELElBQUksQ0FBQ0QsYUFBYSxHQUFHLElBQUksQ0FBQ0wsT0FBTyxDQUFDTSxPQUFPLEVBQUU7SUFDN0MsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDRCxhQUFhLEdBQUcsSUFBSSxDQUFDTixPQUFPLENBQUNPLE9BQU8sRUFBRTtJQUM3QztFQUNGO0VBQ0FVLGtCQUFrQkEsQ0FBQSxFQUFHO0lBQ25CLElBQUksQ0FBQ1osWUFBWSxHQUFHLFFBQVE7SUFDNUJSLDBEQUFtQixFQUFFO0lBQ3JCc0IsT0FBTyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQ3ZCO0VBQ0FDLGFBQWFBLENBQUEsRUFBRztJQUNkRixPQUFPLENBQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDakIsSUFBSSxDQUFDaEIsWUFBWSxDQUFDa0IsZUFBZSxFQUFFO0VBQ3JDO0VBQ0FDLG1CQUFtQkEsQ0FBQ0MsV0FBVyxFQUFFO0lBQy9CLElBQUlBLFdBQVcsQ0FBQ0MsTUFBTSxLQUFLLElBQUksRUFBRTtJQUNqQyxJQUFJLElBQUksQ0FBQ3ZCLFlBQVksQ0FBQ3dCLFlBQVksRUFBRSxDQUFDWCxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ2pELElBQUksQ0FBQ2IsWUFBWSxDQUFDeUIsa0JBQWtCLENBQUNILFdBQVcsQ0FBQztNQUNqRCxJQUFJLENBQUNQLGtCQUFrQixFQUFFO01BQ3pCO0lBQ0Y7SUFDQSxJQUFJLENBQUNmLFlBQVksQ0FBQ3lCLGtCQUFrQixDQUFDSCxXQUFXLENBQUM7RUFDbkQ7RUFDQUksZ0JBQWdCQSxDQUFDSixXQUFXLEVBQUU7SUFDNUIsSUFDRUEsV0FBVyxDQUFDQyxNQUFNLEtBQUssT0FBTyxJQUM5QixJQUFJLENBQUNuQixhQUFhLElBQUksSUFBSSxDQUFDTixPQUFPLENBQUNPLE9BQU8sRUFBRSxFQUM1QztNQUNBO0lBQ0Y7SUFDQSxJQUFJLENBQUNzQixXQUFXLENBQUNMLFdBQVcsQ0FBQztFQUMvQjtFQUVBSyxXQUFXQSxDQUFDTCxXQUFXLEVBQUU7SUFDdkIsSUFDRSxJQUFJLENBQUNwQixZQUFZLENBQUMwQixnQkFBZ0IsQ0FDaENOLFdBQVcsQ0FBQ08sQ0FBQyxFQUNiUCxXQUFXLENBQUNRLENBQUMsQ0FDZCxZQUFZcEMsOENBQUksRUFDakI7TUFDQSxJQUFJLENBQUNRLFlBQVksQ0FDZDBCLGdCQUFnQixDQUFDTixXQUFXLENBQUNPLENBQUMsRUFBRVAsV0FBVyxDQUFDUSxDQUFDLENBQUMsQ0FDOUNuQixHQUFHLENBQUNXLFdBQVcsQ0FBQ08sQ0FBQyxFQUFFUCxXQUFXLENBQUNRLENBQUMsQ0FBQztNQUNwQ25DLDREQUFxQixDQUFDO1FBQ3BCcUMsTUFBTSxFQUFFLE1BQU07UUFDZEMsTUFBTSxFQUFFLE1BQU07UUFDZFYsTUFBTSxFQUFFRCxXQUFXLENBQUNDLE1BQU07UUFDMUJPLENBQUMsRUFBRVIsV0FBVyxDQUFDUSxDQUFDO1FBQ2hCRCxDQUFDLEVBQUVQLFdBQVcsQ0FBQ087TUFDakIsQ0FBQyxDQUFDO01BQ0YsSUFDRSxJQUFJLENBQUMzQixZQUFZLENBQ2QwQixnQkFBZ0IsQ0FBQ04sV0FBVyxDQUFDTyxDQUFDLEVBQUVQLFdBQVcsQ0FBQ1EsQ0FBQyxDQUFDLENBQzlDSSxNQUFNLEVBQUUsRUFDWDtRQUNBLElBQUksQ0FBQ2hDLFlBQVksQ0FBQ2lDLFdBQVcsRUFBRTtNQUNqQztNQUNBLElBQUksSUFBSSxDQUFDQyxVQUFVLEVBQUUsRUFBRTtRQUNyQnpDLHdEQUFpQixDQUFDLE9BQU8sQ0FBQztNQUM1QjtNQUNBLElBQUksQ0FBQzJDLFFBQVEsRUFBRTtJQUNqQixDQUFDLE1BQU0sSUFDTCxJQUFJLENBQUNwQyxZQUFZLENBQUMwQixnQkFBZ0IsQ0FBQ04sV0FBVyxDQUFDTyxDQUFDLEVBQUVQLFdBQVcsQ0FBQ1EsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUMxRTtNQUNBYixPQUFPLENBQUNDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQztJQUN6QyxDQUFDLE1BQU07TUFDTCxJQUFJLENBQUNoQixZQUFZLENBQUNxQyxTQUFTLENBQUNqQixXQUFXLENBQUNPLENBQUMsRUFBRVAsV0FBVyxDQUFDUSxDQUFDLENBQUM7TUFDekRuQyw0REFBcUIsQ0FBQztRQUNwQnFDLE1BQU0sRUFBRSxNQUFNO1FBQ2RDLE1BQU0sRUFBRSxPQUFPO1FBQ2ZWLE1BQU0sRUFBRUQsV0FBVyxDQUFDQyxNQUFNO1FBQzFCTyxDQUFDLEVBQUVSLFdBQVcsQ0FBQ1EsQ0FBQztRQUNoQkQsQ0FBQyxFQUFFUCxXQUFXLENBQUNPO01BQ2pCLENBQUMsQ0FBQztNQUNGWixPQUFPLENBQUNDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQztNQUNsRCxJQUFJLENBQUNvQixRQUFRLEVBQUU7SUFDakI7RUFDRjtFQUVBQSxRQUFRQSxDQUFBLEVBQUc7SUFDVCxJQUFJRSxZQUFZLEdBQUcsSUFBSSxDQUFDeEMsWUFBWSxDQUFDeUMsb0JBQW9CLEVBQUU7SUFDM0R4QixPQUFPLENBQUNDLEdBQUcsQ0FBQ3NCLFlBQVksQ0FBQztJQUN6QnZCLE9BQU8sQ0FBQ0MsR0FBRyxDQUNULElBQUksQ0FBQ2xCLFlBQVksQ0FBQzRCLGdCQUFnQixDQUFDWSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNyRTtJQUNELElBQ0UsSUFBSSxDQUFDeEMsWUFBWSxDQUFDNEIsZ0JBQWdCLENBQ2hDWSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQ2ZBLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FDaEIsWUFBWTlDLDhDQUFJLEVBQ2pCO01BQ0EsSUFDRSxJQUFJLENBQUNNLFlBQVksQ0FDZDRCLGdCQUFnQixDQUFDWSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsREUsb0JBQW9CLENBQUNGLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRUEsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUNsRTtRQUNBLE9BQU8sSUFBSSxDQUFDRixRQUFRLEVBQUU7TUFDeEIsQ0FBQyxNQUFNO1FBQ0xyQixPQUFPLENBQUNDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQztRQUM1QyxJQUFJLENBQUNsQixZQUFZLENBQ2Q0QixnQkFBZ0IsQ0FBQ1ksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFQSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbEQ3QixHQUFHLENBQUM2QixZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUNFLElBQUksQ0FBQ3hDLFlBQVksQ0FDZDRCLGdCQUFnQixDQUFDWSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsRE4sTUFBTSxFQUFFLEVBQ1g7VUFDQSxJQUFJLENBQUNsQyxZQUFZLENBQUNtQyxXQUFXLEVBQUU7UUFDakM7UUFDQXhDLDREQUFxQixDQUFDO1VBQ3BCcUMsTUFBTSxFQUFFLE1BQU07VUFDZEMsTUFBTSxFQUFFLE1BQU07VUFDZFYsTUFBTSxFQUFFLE9BQU87VUFDZk8sQ0FBQyxFQUFFVSxZQUFZLENBQUMsQ0FBQyxDQUFDO1VBQ2xCWCxDQUFDLEVBQUVXLFlBQVksQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDSixVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7VUFDekJ6Qyx3REFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDekI7TUFDRjtJQUNGLENBQUMsTUFBTSxJQUNMLElBQUksQ0FBQ0ssWUFBWSxDQUFDNEIsZ0JBQWdCLENBQUNZLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRUEsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQ3BFLEtBQUssRUFDTDtNQUNBLE9BQU8sSUFBSSxDQUFDRixRQUFRLEVBQUU7SUFDeEIsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDdEMsWUFBWSxDQUFDdUMsU0FBUyxDQUFDQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUM3RDdDLDREQUFxQixDQUFDO1FBQ3BCcUMsTUFBTSxFQUFFLE1BQU07UUFDZEMsTUFBTSxFQUFFLE9BQU87UUFDZlYsTUFBTSxFQUFFLE9BQU87UUFDZk8sQ0FBQyxFQUFFVSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2xCWCxDQUFDLEVBQUVXLFlBQVksQ0FBQyxDQUFDO01BQ25CLENBQUMsQ0FBQztJQUNKO0VBQ0Y7RUFFQUosVUFBVUEsQ0FBQ2IsTUFBTSxFQUFFO0lBQ2pCLElBQUlBLE1BQU0sS0FBSyxJQUFJLEVBQUU7TUFDbkIsSUFBSSxJQUFJLENBQUN2QixZQUFZLENBQUMyQyxTQUFTLEVBQUUsRUFBRTtRQUNqQyxPQUFPLElBQUk7TUFDYjtJQUNGLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQ3pDLFlBQVksQ0FBQ3lDLFNBQVMsRUFBRSxFQUFFO01BQ3hDMUIsT0FBTyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO01BQ3RCLE9BQU8sSUFBSTtJQUNiO0lBQ0EsT0FBTyxLQUFLO0VBQ2Q7RUFFQTBCLFNBQVNBLENBQUN0QixXQUFXLEVBQUU7SUFDckIsSUFBSSxDQUFDbkIsWUFBWSxLQUFLLFFBQVEsR0FDMUIsSUFBSSxDQUFDdUIsZ0JBQWdCLENBQUNKLFdBQVcsQ0FBQyxHQUNsQyxJQUFJLENBQUNuQixZQUFZLEtBQUssZUFBZSxHQUNyQyxJQUFJLENBQUNrQixtQkFBbUIsQ0FBQ0MsV0FBVyxDQUFDLEdBQ3JDLElBQUk7RUFDVjtBQUNGOzs7Ozs7Ozs7Ozs7OztBQzFMcUI7QUFDWTtBQUNjO0FBRS9DM0IsMkRBQW9CLEVBQUU7QUFDdEJrRCxzRUFBb0IsRUFBRTtBQUN0QkEsNEVBQTBCLEVBQUU7QUFDNUJBLHFFQUFtQixDQUFDLE9BQU8sQ0FBQztBQUM1QkEscUVBQW1CLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSUztBQUNIO0FBQ1c7QUFDUjtBQUUzQixNQUFNcEQsU0FBUyxDQUFDO0VBQ3JCSSxXQUFXQSxDQUFDcUQsVUFBVSxFQUFFO0lBQ3RCLElBQUksQ0FBQ0MsU0FBUyxHQUFHLENBQUM7SUFDbEIsSUFBSSxDQUFDQyxLQUFLLEdBQUcsSUFBSSxDQUFDQyxhQUFhLEVBQUU7SUFDakMsSUFBSSxDQUFDSCxVQUFVLEdBQUdBLFVBQVU7SUFDNUIsSUFBSSxDQUFDSSxLQUFLLEdBQUcsRUFBRTtJQUNmLElBQUksQ0FBQ0MsU0FBUyxHQUFHLENBQ2YsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsV0FBVyxFQUNYLFdBQVcsQ0FDWjtFQUNIO0VBQ0FGLGFBQWFBLENBQUEsRUFBRztJQUNkLElBQUlHLFFBQVEsR0FBRyxJQUFJQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQzVCLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixRQUFRLENBQUMzQyxNQUFNLEVBQUU2QyxDQUFDLEVBQUUsRUFBRTtNQUN4Q0YsUUFBUSxDQUFDRSxDQUFDLENBQUMsR0FBR0QsS0FBSyxDQUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3hDO0lBQ0EsT0FBT0gsUUFBUTtFQUNqQjtFQUNBO0VBQ0E1QixnQkFBZ0JBLENBQUNFLENBQUMsRUFBRUQsQ0FBQyxFQUFFO0lBQ3JCLE9BQU8sSUFBSSxDQUFDdUIsS0FBSyxDQUFDdEIsQ0FBQyxDQUFDLENBQUNELENBQUMsQ0FBQztFQUN6QjtFQUNBK0IsZ0JBQWdCQSxDQUFDOUIsQ0FBQyxFQUFFRCxDQUFDLEVBQUVnQyxPQUFPLEVBQUU7SUFDOUIsSUFBSSxDQUFDVCxLQUFLLENBQUN0QixDQUFDLENBQUMsQ0FBQ0QsQ0FBQyxDQUFDLEdBQUdnQyxPQUFPO0VBQzVCO0VBQ0F0QixTQUFTQSxDQUFDVCxDQUFDLEVBQUVELENBQUMsRUFBRTtJQUNkO0lBQ0EsSUFBSSxDQUFDdUIsS0FBSyxDQUFDdEIsQ0FBQyxDQUFDLENBQUNELENBQUMsQ0FBQyxHQUFHLEtBQUs7RUFDMUI7RUFDQWlDLFlBQVlBLENBQUEsRUFBRztJQUNiLE9BQU8sSUFBSSxDQUFDVixLQUFLO0VBQ25CO0VBQ0E1QixZQUFZQSxDQUFBLEVBQUc7SUFDYixPQUFPLElBQUksQ0FBQytCLFNBQVM7RUFDdkI7O0VBRUE7RUFDQXBCLFdBQVdBLENBQUEsRUFBRztJQUNaLElBQUksQ0FBQ2dCLFNBQVMsR0FBRyxJQUFJLENBQUNBLFNBQVMsR0FBRyxDQUFDO0VBQ3JDO0VBQ0FZLFlBQVlBLENBQUEsRUFBRztJQUNiLE9BQU8sSUFBSSxDQUFDWixTQUFTO0VBQ3ZCO0VBQ0FSLFNBQVNBLENBQUEsRUFBRztJQUNWMUIsT0FBTyxDQUFDQyxHQUFHLENBQUUsZUFBYyxJQUFJLENBQUNpQyxTQUFVLEVBQUMsQ0FBQztJQUM1QyxPQUFPLElBQUksQ0FBQ0EsU0FBUyxLQUFLLENBQUM7RUFDN0I7O0VBRUE7RUFDQVYsb0JBQW9CQSxDQUFDdUIsU0FBUyxFQUFFO0lBQzlCLElBQUlDLE1BQU0sR0FBRyxFQUFFO0lBQ2YsSUFBSVAsQ0FBQyxHQUFHLENBQUM7SUFDVCxPQUFPQSxDQUFDLEdBQUcsQ0FBQyxFQUFFO01BQ1osSUFBSVEsTUFBTSxHQUFHQyxJQUFJLENBQUNELE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO01BQ3hDRCxNQUFNLENBQUNHLElBQUksQ0FBQ0QsSUFBSSxDQUFDRSxLQUFLLENBQUNILE1BQU0sQ0FBQyxDQUFDO01BQy9CUixDQUFDLEVBQUU7SUFDTDtJQUNBO0lBQ0EsSUFBSU0sU0FBUyxLQUFLLElBQUksRUFBRTtNQUN0QixPQUFPQyxNQUFNO0lBQ2Y7SUFDQTtJQUNBLElBQ0UsSUFBSSxDQUFDWCxLQUFLLENBQUNnQixJQUFJLENBQUVDLFVBQVUsSUFDekJBLFVBQVUsQ0FBQ0MsS0FBSyxDQUFDLENBQUNDLEtBQUssRUFBRUMsS0FBSyxLQUFLRCxLQUFLLEtBQUtSLE1BQU0sQ0FBQ1MsS0FBSyxDQUFDLENBQUMsQ0FDNUQsRUFDRDtNQUNBLE9BQU8sSUFBSSxDQUFDakMsb0JBQW9CLEVBQUU7SUFDcEM7SUFDQSxJQUFJLENBQUNhLEtBQUssQ0FBQ2MsSUFBSSxDQUFDSCxNQUFNLENBQUM7SUFDdkIsT0FBT0EsTUFBTTtFQUNmO0VBQ0FVLG9CQUFvQkEsQ0FBQSxFQUFHO0lBQ3JCLElBQUlDLGdCQUFnQixHQUFHLEVBQUU7SUFDekIsSUFBSWxCLENBQUMsR0FBRyxDQUFDO0lBQ1QsT0FBT0EsQ0FBQyxHQUFHLENBQUMsRUFBRTtNQUNaLElBQUlRLE1BQU0sR0FBR0MsSUFBSSxDQUFDRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztNQUN6QyxJQUFJQSxNQUFNLElBQUksQ0FBQyxFQUFFVSxnQkFBZ0IsQ0FBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQzlDUSxnQkFBZ0IsQ0FBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQztNQUN4Q1YsQ0FBQyxFQUFFO0lBQ0w7SUFDQSxPQUFPa0IsZ0JBQWdCO0VBQ3pCOztFQUVBO0VBQ0FDLFNBQVNBLENBQUFDLElBQUEsRUFBU0MsV0FBVyxFQUFFQyxJQUFJLEVBQUU5QixVQUFVLEVBQUU7SUFBQSxJQUF2QyxDQUFDcEIsQ0FBQyxFQUFFRCxDQUFDLENBQUMsR0FBQWlELElBQUE7SUFDZCxJQUFJakUsTUFBTSxHQUFHbUUsSUFBSSxDQUFDQyxVQUFVLEVBQUU7SUFDOUIsSUFBSUMsV0FBVyxHQUFHLENBQUNwRCxDQUFDLEVBQUVELENBQUMsQ0FBQztJQUN4QjtJQUNBO0lBQ0EsSUFDRXFCLFVBQVUsS0FBSyxJQUFJLEtBQ2xCLElBQUksQ0FBQ2lDLFNBQVMsQ0FBQyxDQUFDckQsQ0FBQyxFQUFFRCxDQUFDLENBQUMsRUFBRWtELFdBQVcsRUFBRWxFLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFDcEQsSUFBSSxDQUFDdUUsV0FBVyxDQUFDLENBQUN0RCxDQUFDLEVBQUVELENBQUMsQ0FBQyxFQUFFa0QsV0FBVyxFQUFFbEUsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQzFEO01BQ0EsSUFBSXdFLFNBQVMsR0FBRyxJQUFJLENBQUM1QyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7TUFDL0MsT0FBTyxJQUFJLENBQUNvQyxTQUFTLENBQUNRLFNBQVMsRUFBRU4sV0FBVyxFQUFFQyxJQUFJLEVBQUU5QixVQUFVLENBQUM7SUFDakUsQ0FBQyxNQUFNO0lBQ0w7SUFDQSxJQUFJLENBQUNpQyxTQUFTLENBQUMsQ0FBQ3JELENBQUMsRUFBRUQsQ0FBQyxDQUFDLEVBQUVrRCxXQUFXLEVBQUVsRSxNQUFNLENBQUMsS0FBSyxLQUFLLElBQ3JELElBQUksQ0FBQ3VFLFdBQVcsQ0FBQyxDQUFDdEQsQ0FBQyxFQUFFRCxDQUFDLENBQUMsRUFBRWtELFdBQVcsRUFBRWxFLE1BQU0sQ0FBQyxLQUFLLEtBQUssRUFDdkQ7TUFDQUksT0FBTyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO01BQzNCLE9BQU8sS0FBSztJQUNkO0lBQ0E7SUFDQSxJQUFJNkQsV0FBVyxLQUFLLFlBQVksRUFBRTtNQUNoQyxPQUFPbEUsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNqQixJQUFJLENBQUMrQyxnQkFBZ0IsQ0FBQ3NCLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRUEsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFRixJQUFJLENBQUM7UUFDM0RyRiw0REFBcUIsQ0FBQztVQUNwQnFDLE1BQU0sRUFBRSxXQUFXO1VBQ25CVCxNQUFNLEVBQUUyQixVQUFVO1VBQ2xCcEIsQ0FBQyxFQUFFb0QsV0FBVyxDQUFDLENBQUMsQ0FBQztVQUNqQnJELENBQUMsRUFBRXFELFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQztRQUNGQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEJyRSxNQUFNLEVBQUU7TUFDVjtJQUNGLENBQUMsTUFBTSxJQUFJa0UsV0FBVyxLQUFLLFVBQVUsRUFBRTtNQUNyQyxPQUFPbEUsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNqQixJQUFJLENBQUMrQyxnQkFBZ0IsQ0FBQ3NCLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRUEsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFRixJQUFJLENBQUM7UUFDM0RyRiw0REFBcUIsQ0FBQztVQUNwQnFDLE1BQU0sRUFBRSxXQUFXO1VBQ25CVCxNQUFNLEVBQUUyQixVQUFVO1VBQ2xCcEIsQ0FBQyxFQUFFb0QsV0FBVyxDQUFDLENBQUMsQ0FBQztVQUNqQnJELENBQUMsRUFBRXFELFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQztRQUNGQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEJyRSxNQUFNLEVBQUU7TUFDVjtJQUNGO0VBQ0Y7RUFDQXNFLFNBQVNBLENBQUFHLEtBQUEsRUFBU1AsV0FBVyxFQUFFbEUsTUFBTSxFQUFFO0lBQUEsSUFBN0IsQ0FBQ2lCLENBQUMsRUFBRUQsQ0FBQyxDQUFDLEdBQUF5RCxLQUFBO0lBQ2QsSUFBSUMsVUFBVSxHQUFHLENBQUN6RCxDQUFDLEVBQUVELENBQUMsQ0FBQztJQUN2QixJQUFJa0QsV0FBVyxLQUFLLFlBQVksRUFBRTtNQUNoQ1EsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHQSxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHMUUsTUFBTTtNQUMxQztJQUNGLENBQUMsTUFBTSxJQUFJa0UsV0FBVyxLQUFLLFVBQVUsRUFBRTtNQUNyQ1EsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHQSxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHMUUsTUFBTTtNQUMxQztJQUNGOztJQUNBLElBQUkwRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJQSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO01BQzVDLE9BQU8sSUFBSTtJQUNiO0lBQ0EsT0FBTyxLQUFLO0VBQ2Q7RUFDQUgsV0FBV0EsQ0FBQUksS0FBQSxFQUFTVCxXQUFXLEVBQUVsRSxNQUFNLEVBQUU7SUFBQSxJQUE3QixDQUFDaUIsQ0FBQyxFQUFFRCxDQUFDLENBQUMsR0FBQTJELEtBQUE7SUFDaEIsSUFBSVQsV0FBVyxLQUFLLFlBQVksRUFBRTtNQUNoQyxPQUFPbEUsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNqQixJQUFJLElBQUksQ0FBQ2UsZ0JBQWdCLENBQUNFLENBQUMsRUFBRUQsQ0FBQyxDQUFDLFlBQVluQyx3Q0FBSSxFQUFFO1VBQy9DLE9BQU8sS0FBSztRQUNkO1FBQ0FvQyxDQUFDLEVBQUU7UUFDSGpCLE1BQU0sRUFBRTtNQUNWO0lBQ0YsQ0FBQyxNQUFNLElBQUlrRSxXQUFXLEtBQUssVUFBVSxFQUFFO01BQ3JDLE9BQU9sRSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2pCLElBQUksSUFBSSxDQUFDZSxnQkFBZ0IsQ0FBQ0UsQ0FBQyxFQUFFRCxDQUFDLENBQUMsWUFBWW5DLHdDQUFJLEVBQUU7VUFDL0MsT0FBTyxLQUFLO1FBQ2Q7UUFDQW1DLENBQUMsRUFBRTtRQUNIaEIsTUFBTSxFQUFFO01BQ1Y7SUFDRjtJQUNBLE9BQU8sSUFBSTtFQUNiO0VBRUFPLGVBQWVBLENBQUEsRUFBRztJQUNoQixJQUFJd0QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDRCxvQkFBb0IsRUFBRTtJQUVsRCxJQUFJakIsQ0FBQyxHQUFHLENBQUM7SUFDVCxPQUFPQSxDQUFDLEdBQUcsQ0FBQyxFQUFFO01BQ1osSUFBSStCLFFBQVEsR0FBRyxJQUFJL0Ysd0NBQUksQ0FBQyxJQUFJLENBQUM2RCxTQUFTLENBQUNHLENBQUMsQ0FBQyxDQUFDO01BQzFDLElBQUksQ0FBQ21CLFNBQVMsQ0FDWixJQUFJLENBQUNwQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFDL0JtQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFDbkJhLFFBQVEsRUFDUixJQUFJLENBQ0w7TUFDRC9CLENBQUMsRUFBRTtNQUNIa0IsZ0JBQWdCLENBQUNjLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9CO0lBQ0EsSUFBSUMsTUFBTSxHQUFHLElBQUksQ0FBQzdCLFlBQVksRUFBRTtJQUNoQzdDLE9BQU8sQ0FBQzJFLEtBQUssQ0FBQ0QsTUFBTSxDQUFDO0VBQ3ZCO0VBRUFsRSxrQkFBa0JBLENBQUNILFdBQVcsRUFBRTtJQUM5QixJQUFJLElBQUksQ0FBQ2lDLFNBQVMsQ0FBQzFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDN0JJLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHdCQUF3QixDQUFDO0lBQ3ZDO0lBQ0EsSUFBSXVFLFFBQVEsR0FBRyxJQUFJL0Ysd0NBQUksQ0FBQyxJQUFJLENBQUM2RCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsSUFDRSxJQUFJLENBQUNzQixTQUFTLENBQ1osQ0FBQ3ZELFdBQVcsQ0FBQ08sQ0FBQyxFQUFFUCxXQUFXLENBQUNRLENBQUMsQ0FBQyxFQUM5QlIsV0FBVyxDQUFDeUQsV0FBVyxFQUN2QlUsUUFBUSxFQUNSbkUsV0FBVyxDQUFDQyxNQUFNLENBQ25CLEtBQUssS0FBSyxFQUVYO0lBQ0YsSUFBSSxDQUFDZ0MsU0FBUyxDQUFDbUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsSUFBSUMsTUFBTSxHQUFHLElBQUksQ0FBQzdCLFlBQVksRUFBRTtJQUNoQzdDLE9BQU8sQ0FBQzJFLEtBQUssQ0FBQ0QsTUFBTSxDQUFDO0VBQ3ZCO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7OztBQ3BOd0M7QUFFakMsTUFBTW5HLE1BQU0sQ0FBQztFQUNsQkssV0FBV0EsQ0FBQ2dHLElBQUksRUFBRUMsSUFBSSxFQUFFO0lBQ3RCLElBQUksQ0FBQ0QsSUFBSSxHQUFHQSxJQUFJO0lBQ2hCLElBQUksQ0FBQ0MsSUFBSSxHQUFHQSxJQUFJO0lBQ2hCO0VBQ0Y7O0VBQ0E3RixPQUFPQSxDQUFBLEVBQUc7SUFDUixPQUFPLElBQUksQ0FBQzZGLElBQUk7RUFDbEI7RUFDQXpGLE9BQU9BLENBQUEsRUFBRztJQUNSLE9BQU8sSUFBSSxDQUFDd0YsSUFBSTtFQUNsQjtBQUNGOzs7Ozs7Ozs7Ozs7OztBQ2RPLE1BQU1uRyxJQUFJLENBQUM7RUFDaEJHLFdBQVdBLENBQUNpRyxJQUFJLEVBQUU7SUFDaEIsSUFBSSxDQUFDQSxJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSSxDQUFDZCxVQUFVLEVBQUU7SUFDL0IsSUFBSSxDQUFDZSxrQkFBa0IsR0FBRyxFQUFFO0VBQzlCO0VBRUFmLFVBQVVBLENBQUEsRUFBRztJQUNYLElBQUksSUFBSSxDQUFDYSxJQUFJLEtBQUssU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQ2pDLElBQUksSUFBSSxDQUFDQSxJQUFJLEtBQUssWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQ3pDLElBQUksSUFBSSxDQUFDQSxJQUFJLEtBQUssU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQ3RDLElBQUksSUFBSSxDQUFDQSxJQUFJLEtBQUssV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQ3hDLElBQUksSUFBSSxDQUFDQSxJQUFJLEtBQUssV0FBVyxFQUFFLE9BQU8sQ0FBQztFQUM5QztFQUVBN0YsT0FBT0EsQ0FBQSxFQUFHO0lBQ1IsT0FBTyxJQUFJLENBQUM2RixJQUFJO0VBQ2xCO0VBRUFHLFNBQVNBLENBQUEsRUFBRztJQUNWLE9BQU8sSUFBSSxDQUFDRixNQUFNO0VBQ3BCO0VBRUFwRixHQUFHQSxDQUFDa0IsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7SUFDUixJQUFJLElBQUksQ0FBQ1ksb0JBQW9CLENBQUNiLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQzlDLElBQUksSUFBSSxDQUFDaUUsTUFBTSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUNBLE1BQU0sR0FBRyxJQUFJLENBQUNBLE1BQU0sR0FBRyxDQUFDO0lBQ25ELElBQUksQ0FBQ0Msa0JBQWtCLENBQUM1QixJQUFJLENBQUMsQ0FBQ3ZDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUM7SUFDcENiLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQzZFLE1BQU0sQ0FBQztJQUN4QixPQUFPLElBQUksQ0FBQ0EsTUFBTTtFQUNwQjtFQUNBckQsb0JBQW9CQSxDQUFDYixDQUFDLEVBQUVDLENBQUMsRUFBRTtJQUN6QixJQUFJbUMsTUFBTSxHQUFHLENBQUNwQyxDQUFDLEVBQUVDLENBQUMsQ0FBQztJQUNuQixJQUNFLElBQUksQ0FBQ2tFLGtCQUFrQixDQUFDMUIsSUFBSSxDQUFFNEIsU0FBUyxJQUNyQ0EsU0FBUyxDQUFDMUIsS0FBSyxDQUFDLENBQUNDLEtBQUssRUFBRUMsS0FBSyxLQUFLRCxLQUFLLEtBQUtSLE1BQU0sQ0FBQ1MsS0FBSyxDQUFDLENBQUMsQ0FDM0QsRUFDRDtNQUNBekQsT0FBTyxDQUFDQyxHQUFHLENBQUMsb0NBQW9DLENBQUM7TUFDakQsT0FBTyxJQUFJO0lBQ2I7SUFDQUQsT0FBTyxDQUFDQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7SUFDaEMsT0FBTyxLQUFLO0VBQ2Q7RUFFQWdCLE1BQU1BLENBQUEsRUFBRztJQUNQLE9BQU8sSUFBSSxDQUFDNkQsTUFBTSxLQUFLLENBQUM7RUFDMUI7QUFDRjs7Ozs7Ozs7Ozs7Ozs7OztBQy9DMEM7QUFDQTtBQUNuQyxNQUFNcEcsR0FBRyxHQUFHLENBQUMsTUFBTTtFQUN4QixTQUFTd0csVUFBVUEsQ0FBQy9DLEtBQUssRUFBRTtJQUN6QixLQUFLLElBQUlNLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUVBLENBQUMsRUFBRSxFQUFFO01BQzNCLElBQUkwQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUMxQ0YsTUFBTSxDQUFDRyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDOUJKLE1BQU0sQ0FBQ0ssT0FBTyxDQUFDL0IsS0FBSyxHQUFHaEIsQ0FBQztNQUN4Qk4sS0FBSyxDQUFDc0QsV0FBVyxDQUFDTixNQUFNLENBQUM7TUFDekIsS0FBSyxJQUFJTyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBRTtRQUMzQixJQUFJQyxJQUFJLEdBQUdQLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUN4Q00sSUFBSSxDQUFDTCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDMUJJLElBQUksQ0FBQ0gsT0FBTyxDQUFDL0IsS0FBSyxHQUFHaUMsQ0FBQztRQUN0QlAsTUFBTSxDQUFDTSxXQUFXLENBQUNFLElBQUksQ0FBQztNQUMxQjtJQUNGO0VBQ0Y7RUFFQSxTQUFTOUQsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDMUIsTUFBTStELGNBQWMsR0FBR1IsUUFBUSxDQUFDUyxhQUFhLENBQUMsaUJBQWlCLENBQUM7SUFDaEUsTUFBTUMsV0FBVyxHQUFHVixRQUFRLENBQUNTLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDMURYLFVBQVUsQ0FBQ1UsY0FBYyxDQUFDO0lBQzFCVixVQUFVLENBQUNZLFdBQVcsQ0FBQztFQUN6QjtFQUVBLFNBQVNoRixpQkFBaUJBLENBQUNpRixVQUFVLEVBQUU7SUFDckMsSUFBSUEsVUFBVSxDQUFDaEYsTUFBTSxLQUFLLFdBQVcsRUFBRWlGLFFBQVEsQ0FBQ0QsVUFBVSxDQUFDO0lBQzNELElBQUlBLFVBQVUsQ0FBQ2hGLE1BQU0sS0FBSyxNQUFNLEVBQUVrRixRQUFRLENBQUNGLFVBQVUsQ0FBQztFQUN4RDtFQUNBLFNBQVNDLFFBQVFBLENBQUNELFVBQVUsRUFBRTtJQUM1QixJQUFJRyxXQUFXLEdBQUcsZ0JBQWdCO0lBQ2xDLElBQUlILFVBQVUsQ0FBQ3pGLE1BQU0sS0FBSyxJQUFJLEVBQUU0RixXQUFXLEdBQUcsYUFBYTtJQUMzRCxJQUFJSCxVQUFVLENBQUN6RixNQUFNLEtBQUssT0FBTyxFQUFFNEYsV0FBVyxHQUFHLGdCQUFnQjtJQUNqRSxNQUFNUCxJQUFJLEdBQUdRLFlBQVksQ0FBQ0QsV0FBVyxFQUFFSCxVQUFVLENBQUM7SUFDbERKLElBQUksQ0FBQ0wsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0VBQzVCO0VBRUEsU0FBU1UsUUFBUUEsQ0FBQ0YsVUFBVSxFQUFFO0lBQzVCLElBQUlHLFdBQVcsR0FBRyxnQkFBZ0I7SUFDbEMsSUFBSUgsVUFBVSxDQUFDekYsTUFBTSxLQUFLLElBQUksRUFBRTRGLFdBQVcsR0FBRyxhQUFhO0lBQzNELElBQUlILFVBQVUsQ0FBQ3pGLE1BQU0sS0FBSyxPQUFPLEVBQUU0RixXQUFXLEdBQUcsZ0JBQWdCO0lBQ2pFLE1BQU1QLElBQUksR0FBR1EsWUFBWSxDQUFDRCxXQUFXLEVBQUVILFVBQVUsQ0FBQztJQUVsRCxJQUFJQSxVQUFVLENBQUMvRSxNQUFNLEtBQUssT0FBTyxFQUFFO01BQ2pDMkUsSUFBSSxDQUFDTCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFDaEM7SUFDQSxJQUFJUSxVQUFVLENBQUMvRSxNQUFNLEtBQUssTUFBTSxFQUFFO01BQ2hDMkUsSUFBSSxDQUFDTCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDL0I7RUFDRjtFQUVBLFNBQVNZLFlBQVlBLENBQUNELFdBQVcsRUFBRUgsVUFBVSxFQUFFO0lBQzdDLE1BQU1LLFFBQVEsR0FBSSxJQUFHRixXQUFZLHdCQUMvQkgsVUFBVSxDQUFDbEYsQ0FDWixzQkFBcUJrRixVQUFVLENBQUNuRixDQUFDLEdBQUcsQ0FBRSxHQUFFO0lBQ3pDLE9BQU93RSxRQUFRLENBQUNTLGFBQWEsQ0FBQ08sUUFBUSxDQUFDO0VBQ3pDO0VBRUEsU0FBU2hGLGFBQWFBLENBQUNpRixNQUFNLEVBQUU7SUFDN0JyRyxPQUFPLENBQUNDLEdBQUcsQ0FBQ29HLE1BQU0sQ0FBQztJQUNuQixNQUFNQyxNQUFNLEdBQUdsQixRQUFRLENBQUNTLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDL0MsTUFBTVUsSUFBSSxHQUFHbkIsUUFBUSxDQUFDUyxhQUFhLENBQUMsU0FBUyxDQUFDO0lBQzlDUyxNQUFNLENBQUNoQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7SUFDckNnQixJQUFJLENBQUNDLFNBQVMsR0FBSSxxQkFBb0JILE1BQU8sRUFBQztJQUM5Q0MsTUFBTSxDQUFDRyxTQUFTLEVBQUU7SUFDbEI3RSxpRUFBb0IsRUFBRTtFQUN4QjtFQUVBLFNBQVMrRSxvQkFBb0JBLENBQUEsRUFBRztJQUM5QixNQUFNQyxrQkFBa0IsR0FBR3hCLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0lBQ3hFLElBQUllLGtCQUFrQixDQUFDSixTQUFTLEtBQUssWUFBWSxFQUFFO01BQ2pESSxrQkFBa0IsQ0FBQ0osU0FBUyxHQUFHLFVBQVU7SUFDM0MsQ0FBQyxNQUFNO01BQ0xJLGtCQUFrQixDQUFDSixTQUFTLEdBQUcsWUFBWTtJQUM3QztFQUNGO0VBRUEsU0FBU3pHLGVBQWVBLENBQUEsRUFBRztJQUN6QixNQUFNNkcsa0JBQWtCLEdBQUd4QixRQUFRLENBQUNTLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztJQUN4RWUsa0JBQWtCLENBQUNKLFNBQVMsR0FBRyxxQkFBcUI7RUFDdEQ7RUFFQSxPQUFPO0lBQ0wzRSxnQkFBZ0I7SUFDaEJmLGlCQUFpQjtJQUNqQk0sYUFBYTtJQUNidUYsb0JBQW9CO0lBQ3BCNUc7RUFDRixDQUFDO0FBQ0gsQ0FBQyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGd0I7QUFDYztBQUNEO0FBRWxDLE1BQU02QixNQUFNLEdBQUcsQ0FBQyxNQUFNO0VBQzNCLElBQUlpRixTQUFTLEdBQUd6QixRQUFRLENBQUNTLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztFQUN6RCxJQUFJL0IsV0FBVyxHQUFHLFVBQVU7RUFDNUIsSUFBSWdELE9BQU8sR0FBR2pILFNBQVM7RUFFdkIsU0FBU2lDLGFBQWFBLENBQUEsRUFBRztJQUN2QixNQUFNaUYsV0FBVyxHQUFHM0IsUUFBUSxDQUFDUyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3BEa0IsV0FBVyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdDLEtBQUssSUFBSztNQUMvQyxJQUFJLE9BQU9ILE9BQU8sS0FBSyxRQUFRLEVBQUU7TUFDakNBLE9BQU8sR0FBRyxJQUFJbkksa0RBQUksQ0FDaEIsSUFBSUosaURBQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQzdCLElBQUlBLGlEQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUN4QjtNQUNEdUksT0FBTyxDQUFDNUcsYUFBYSxFQUFFO0lBQ3pCLENBQUMsQ0FBQztFQUNKO0VBQ0EsU0FBUzZCLG1CQUFtQkEsQ0FBQSxFQUFHO0lBQzdCLE1BQU1tRixpQkFBaUIsR0FBRzlCLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUNoRXFCLGlCQUFpQixDQUFDRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdDLEtBQUssSUFBSztNQUNyRG5ELFdBQVcsR0FBR0EsV0FBVyxLQUFLLFlBQVksR0FBRyxZQUFZLEdBQUcsVUFBVTtNQUN0RXBGLDBEQUF3QixDQUFDb0YsV0FBVyxDQUFDO01BQ3JDOUQsT0FBTyxDQUFDQyxHQUFHLENBQUM2RCxXQUFXLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0VBQ0o7RUFDQSxTQUFTOUIsWUFBWUEsQ0FBQzFCLE1BQU0sRUFBRTtJQUM1QixJQUFJdUcsU0FBUyxHQUFHekIsUUFBUSxDQUFDUyxhQUFhLENBQUMsaUJBQWlCLENBQUM7SUFDekQsSUFBSXNCLE1BQU0sR0FBRy9CLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUNuRCxJQUFJdUIsT0FBTyxHQUFHLElBQUk7SUFDbEIsSUFBSTlHLE1BQU0sS0FBSyxPQUFPLEVBQUU7TUFDdEI4RyxPQUFPLEdBQUdQLFNBQVMsQ0FBQ1EsVUFBVTtJQUNoQyxDQUFDLE1BQU1ELE9BQU8sR0FBR0QsTUFBTSxDQUFDRSxVQUFVO0lBRWxDRCxPQUFPLENBQUNFLE9BQU8sQ0FBRW5DLE1BQU0sSUFBSztNQUMxQkEsTUFBTSxDQUFDNkIsZ0JBQWdCLENBQUMsT0FBTyxFQUFHTyxNQUFNLElBQUs7UUFDM0NULE9BQU8sQ0FBQ25GLFNBQVMsQ0FBQztVQUNoQnJCLE1BQU0sRUFBRUEsTUFBTTtVQUNkTyxDQUFDLEVBQUUyRyxNQUFNLENBQUNELE1BQU0sQ0FBQ3ZHLE1BQU0sQ0FBQ3lHLGFBQWEsQ0FBQ2pDLE9BQU8sQ0FBQy9CLEtBQUssQ0FBQztVQUNwRDdDLENBQUMsRUFBRTRHLE1BQU0sQ0FBQ0QsTUFBTSxDQUFDdkcsTUFBTSxDQUFDd0UsT0FBTyxDQUFDL0IsS0FBSyxDQUFDO1VBQ3RDSyxXQUFXLEVBQUVBO1FBQ2YsQ0FBQyxDQUFDO01BQ0osQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0o7RUFFQSxTQUFTNEMsYUFBYUEsQ0FBQSxFQUFHO0lBQ3ZCLElBQUlnQixXQUFXLEdBQUd0QyxRQUFRLENBQUNTLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDbEQ2QixXQUFXLENBQUNWLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO01BQzFDVyxRQUFRLENBQUNDLE1BQU0sRUFBRTtJQUNuQixDQUFDLENBQUM7RUFDSjtFQUVBLE9BQU87SUFBRTlGLGFBQWE7SUFBRUMsbUJBQW1CO0lBQUVDLFlBQVk7SUFBRTBFO0VBQWMsQ0FBQztBQUM1RSxDQUFDLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hESjtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0EsZ0VBQWdFLHVDQUF1QyxvQ0FBb0MsNENBQTRDLCtDQUErQyx3Q0FBd0MscUNBQXFDLG9DQUFvQyxHQUFHLFVBQVUsMkdBQTJHLGNBQWMsbUNBQW1DLDJDQUEyQyxHQUFHLG1CQUFtQixlQUFlLEdBQUcsWUFBWSxrQkFBa0IsNEJBQTRCLHdCQUF3QixHQUFHLFlBQVksaUJBQWlCLEdBQUcsWUFBWSxnQkFBZ0IscUJBQXFCLGdCQUFnQixrQ0FBa0MsaUJBQWlCLHdCQUF3QixHQUFHLHNCQUFzQiw2Q0FBNkMsR0FBRyxvQkFBb0Isa0JBQWtCLDJCQUEyQixHQUFHLHNDQUFzQyxrQkFBa0Isd0JBQXdCLGtDQUFrQyx3QkFBd0IsR0FBRyxVQUFVLGtCQUFrQix3QkFBd0Isa0NBQWtDLHdCQUF3QixHQUFHLDBCQUEwQixlQUFlLEdBQUcsb0NBQW9DLGtCQUFrQixzQkFBc0IsR0FBRyxhQUFhLG9CQUFvQixHQUFHLFdBQVcsMkNBQTJDLHNCQUFzQixxQkFBcUIsR0FBRyxpQkFBaUIsdUNBQXVDLEdBQUcsV0FBVyx3Q0FBd0MsR0FBRyxjQUFjLHlDQUF5QyxHQUFHLGVBQWUsdUNBQXVDLEdBQUcseUJBQXlCLHFCQUFxQixzQkFBc0Isb0JBQW9CLHVCQUF1QixzQkFBc0IsR0FBRyxXQUFXLG9CQUFvQixrQkFBa0IsMkJBQTJCLDRCQUE0Qix3QkFBd0IsR0FBRyxtQ0FBbUMsZUFBZSx1QkFBdUIsR0FBRyxTQUFTLHFGQUFxRixLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLEtBQUssT0FBTyxXQUFXLFlBQVksYUFBYSxPQUFPLE1BQU0sVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sT0FBTyxVQUFVLFlBQVksZ0RBQWdELHVDQUF1QyxvQ0FBb0MsNENBQTRDLCtDQUErQyx3Q0FBd0MscUNBQXFDLG9DQUFvQyxHQUFHLFVBQVUsMkdBQTJHLGNBQWMsbUNBQW1DLDJDQUEyQyxHQUFHLG1CQUFtQixlQUFlLEdBQUcsWUFBWSxrQkFBa0IsNEJBQTRCLHdCQUF3QixHQUFHLFlBQVksaUJBQWlCLEdBQUcsWUFBWSxnQkFBZ0IscUJBQXFCLGdCQUFnQixrQ0FBa0MsaUJBQWlCLHdCQUF3QixHQUFHLHNCQUFzQiw2Q0FBNkMsR0FBRyxvQkFBb0Isa0JBQWtCLDJCQUEyQixHQUFHLHNDQUFzQyxrQkFBa0Isd0JBQXdCLGtDQUFrQyx3QkFBd0IsR0FBRyxVQUFVLGtCQUFrQix3QkFBd0Isa0NBQWtDLHdCQUF3QixHQUFHLDBCQUEwQixlQUFlLEdBQUcsb0NBQW9DLGtCQUFrQixzQkFBc0IsR0FBRyxhQUFhLG9CQUFvQixHQUFHLFdBQVcsMkNBQTJDLHNCQUFzQixxQkFBcUIsR0FBRyxpQkFBaUIsdUNBQXVDLEdBQUcsV0FBVyx3Q0FBd0MsR0FBRyxjQUFjLHlDQUF5QyxHQUFHLGVBQWUsdUNBQXVDLEdBQUcseUJBQXlCLHFCQUFxQixzQkFBc0Isb0JBQW9CLHVCQUF1QixzQkFBc0IsR0FBRyxXQUFXLG9CQUFvQixrQkFBa0IsMkJBQTJCLDRCQUE0Qix3QkFBd0IsR0FBRyxtQ0FBbUMsZUFBZSx1QkFBdUIsR0FBRyxxQkFBcUI7QUFDeGlLO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDUDFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSw2RkFBYyxHQUFHLDZGQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlci9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2RlbC9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2RlbC9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2RlbC9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlldy9ldmVudGxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXllciB9IGZyb20gJy4uL21vZGVsL3BsYXllcic7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuLi9tb2RlbC9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4uL21vZGVsL3NoaXBzJztcbmltcG9ydCB7IGRvbSB9IGZyb20gJy4uL3ZpZXcvZG9tJztcblxuZXhwb3J0IGNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgdGhpcy5wbGF5ZXIxID0gcGxheWVyMTtcbiAgICB0aGlzLnBsYXllcjIgPSBwbGF5ZXIyO1xuICAgIHRoaXMucGxheWVyMUJvYXJkID0gbmV3IEdhbWVib2FyZChwbGF5ZXIxLmdldFR5cGUoKSk7XG4gICAgdGhpcy5wbGF5ZXIyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKHBsYXllcjIuZ2V0VHlwZSgpKTtcbiAgICB0aGlzLmN1cnJlbnRTdGFnZSA9ICdzaGlwUGxhY2VtZW50JztcbiAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjEuZ2V0TmFtZSgpO1xuICB9XG5cbiAgZ2V0UGxheWVyMVN0YXRzKCkge1xuICAgIHJldHVybiBbdGhpcy5wbGF5ZXIxLmdldFR5cGUoKSwgdGhpcy5wbGF5ZXIxLmdldE5hbWUoKV07XG4gIH1cbiAgZ2V0UGxheWVyMlN0YXRzKCkge1xuICAgIHJldHVybiBbdGhpcy5wbGF5ZXIyLmdldFR5cGUoKSwgdGhpcy5wbGF5ZXIyLmdldE5hbWUoKV07XG4gIH1cbiAgZ2V0Q3VycmVudFBsYXllcigpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50UGxheWVyO1xuICB9XG4gIGdldEN1cnJlbnRTdGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhZ2U7XG4gIH1cbiAgY2hhbmdlVHVybihoaXQgPSBmYWxzZSkge1xuICAgIGlmIChoaXQgPT09IHRydWUpIHJldHVybjtcbiAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjEuZ2V0TmFtZSgpKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjIuZ2V0TmFtZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjEuZ2V0TmFtZSgpO1xuICAgIH1cbiAgfVxuICBjaGFuZ2VDdXJyZW50U3RhZ2UoKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhZ2UgPSAnY29tYmF0JztcbiAgICBkb20uY29tYmF0RGlzcGxheWVyKCk7XG4gICAgY29uc29sZS5sb2coJ2NvbWJhdCcpO1xuICB9XG4gIHN0YXJ0R2FtZUxvb3AoKSB7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgdGhpcy5wbGF5ZXIyQm9hcmQuYWlTaGlwUGxhY2VtZW50KCk7XG4gIH1cbiAgcGxhY2VtZW50Q29udHJvbGxlcihldmVudE9iamVjdCkge1xuICAgIGlmIChldmVudE9iamVjdC5wbGF5ZXIgPT09ICdBSScpIHJldHVybjtcbiAgICBpZiAodGhpcy5wbGF5ZXIxQm9hcmQuZ2V0U2hpcEFycmF5KCkubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLnBsYXllcjFCb2FyZC5odW1hblNoaXBQbGFjZW1lbnQoZXZlbnRPYmplY3QpO1xuICAgICAgdGhpcy5jaGFuZ2VDdXJyZW50U3RhZ2UoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wbGF5ZXIxQm9hcmQuaHVtYW5TaGlwUGxhY2VtZW50KGV2ZW50T2JqZWN0KTtcbiAgfVxuICBjb21iYXRDb250cm9sbGVyKGV2ZW50T2JqZWN0KSB7XG4gICAgaWYgKFxuICAgICAgZXZlbnRPYmplY3QucGxheWVyID09PSAnaHVtYW4nICYmXG4gICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPT0gdGhpcy5wbGF5ZXIxLmdldE5hbWUoKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmh1bWFuQXR0YWNrKGV2ZW50T2JqZWN0KTtcbiAgfVxuXG4gIGh1bWFuQXR0YWNrKGV2ZW50T2JqZWN0KSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wbGF5ZXIyQm9hcmQuZ2V0U3F1YXJlQ29udGVudChcbiAgICAgICAgZXZlbnRPYmplY3QueSxcbiAgICAgICAgZXZlbnRPYmplY3QueFxuICAgICAgKSBpbnN0YW5jZW9mIFNoaXBcbiAgICApIHtcbiAgICAgIHRoaXMucGxheWVyMkJvYXJkXG4gICAgICAgIC5nZXRTcXVhcmVDb250ZW50KGV2ZW50T2JqZWN0LnksIGV2ZW50T2JqZWN0LngpXG4gICAgICAgIC5oaXQoZXZlbnRPYmplY3QueSwgZXZlbnRPYmplY3QueCk7XG4gICAgICBkb20uZHJhd0FjdGlvblRvQm9hcmQoe1xuICAgICAgICBhY3Rpb246ICdzaG90JyxcbiAgICAgICAgdGFyZ2V0OiAnc2hpcCcsXG4gICAgICAgIHBsYXllcjogZXZlbnRPYmplY3QucGxheWVyLFxuICAgICAgICB4OiBldmVudE9iamVjdC54LFxuICAgICAgICB5OiBldmVudE9iamVjdC55LFxuICAgICAgfSk7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMucGxheWVyMkJvYXJkXG4gICAgICAgICAgLmdldFNxdWFyZUNvbnRlbnQoZXZlbnRPYmplY3QueSwgZXZlbnRPYmplY3QueClcbiAgICAgICAgICAuaXNTdW5rKClcbiAgICAgICkge1xuICAgICAgICB0aGlzLnBsYXllcjJCb2FyZC5zaGlwV2FzU3VuaygpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMud2luQ2hlY2tlcigpKSB7XG4gICAgICAgIGRvbS5kZWNsYXJlV2lubmVyKCdodW1hbicpO1xuICAgICAgfVxuICAgICAgdGhpcy5haUF0dGFjaygpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnBsYXllcjJCb2FyZC5nZXRTcXVhcmVDb250ZW50KGV2ZW50T2JqZWN0LnksIGV2ZW50T2JqZWN0LngpID09PSAnaGl0J1xuICAgICkge1xuICAgICAgY29uc29sZS5sb2coJ0FscmVhZHkgc2hvdCB0aGVyZSBjaGllZicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBsYXllcjJCb2FyZC5oaXRTcXVhcmUoZXZlbnRPYmplY3QueSwgZXZlbnRPYmplY3QueCk7XG4gICAgICBkb20uZHJhd0FjdGlvblRvQm9hcmQoe1xuICAgICAgICBhY3Rpb246ICdzaG90JyxcbiAgICAgICAgdGFyZ2V0OiAnb2NlYW4nLFxuICAgICAgICBwbGF5ZXI6IGV2ZW50T2JqZWN0LnBsYXllcixcbiAgICAgICAgeDogZXZlbnRPYmplY3QueCxcbiAgICAgICAgeTogZXZlbnRPYmplY3QueSxcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coJ2VtcHR5IHdhdGVycyB0b29rIGEgZGV2YXN0YXRpbmcgaGl0Jyk7XG4gICAgICB0aGlzLmFpQXR0YWNrKCk7XG4gICAgfVxuICB9XG5cbiAgYWlBdHRhY2soKSB7XG4gICAgbGV0IHNob3RMb2NhdGlvbiA9IHRoaXMucGxheWVyMUJvYXJkLmdldFJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgY29uc29sZS5sb2coc2hvdExvY2F0aW9uKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIHRoaXMucGxheWVyMUJvYXJkLmdldFNxdWFyZUNvbnRlbnQoc2hvdExvY2F0aW9uWzBdLCBzaG90TG9jYXRpb25bMV0pXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnBsYXllcjFCb2FyZC5nZXRTcXVhcmVDb250ZW50KFxuICAgICAgICBzaG90TG9jYXRpb25bMF0sXG4gICAgICAgIHNob3RMb2NhdGlvblsxXVxuICAgICAgKSBpbnN0YW5jZW9mIFNoaXBcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wbGF5ZXIxQm9hcmRcbiAgICAgICAgICAuZ2V0U3F1YXJlQ29udGVudChzaG90TG9jYXRpb25bMF0sIHNob3RMb2NhdGlvblsxXSlcbiAgICAgICAgICAud2FzSXRBbHJlYWR5SGl0VGhlcmUoc2hvdExvY2F0aW9uWzBdLCBzaG90TG9jYXRpb25bMV0pID09PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWlBdHRhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGlzIGhpdCBidXQgbm90IHRoZXJlIHlldCcpO1xuICAgICAgICB0aGlzLnBsYXllcjFCb2FyZFxuICAgICAgICAgIC5nZXRTcXVhcmVDb250ZW50KHNob3RMb2NhdGlvblswXSwgc2hvdExvY2F0aW9uWzFdKVxuICAgICAgICAgIC5oaXQoc2hvdExvY2F0aW9uWzBdLCBzaG90TG9jYXRpb25bMV0pO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5wbGF5ZXIxQm9hcmRcbiAgICAgICAgICAgIC5nZXRTcXVhcmVDb250ZW50KHNob3RMb2NhdGlvblswXSwgc2hvdExvY2F0aW9uWzFdKVxuICAgICAgICAgICAgLmlzU3VuaygpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMucGxheWVyMUJvYXJkLnNoaXBXYXNTdW5rKCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9tLmRyYXdBY3Rpb25Ub0JvYXJkKHtcbiAgICAgICAgICBhY3Rpb246ICdzaG90JyxcbiAgICAgICAgICB0YXJnZXQ6ICdzaGlwJyxcbiAgICAgICAgICBwbGF5ZXI6ICdodW1hbicsXG4gICAgICAgICAgeDogc2hvdExvY2F0aW9uWzFdLFxuICAgICAgICAgIHk6IHNob3RMb2NhdGlvblswXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLndpbkNoZWNrZXIoJ0FJJykpIHtcbiAgICAgICAgICBkb20uZGVjbGFyZVdpbm5lcignQUknKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnBsYXllcjFCb2FyZC5nZXRTcXVhcmVDb250ZW50KHNob3RMb2NhdGlvblswXSwgc2hvdExvY2F0aW9uWzFdKSA9PT1cbiAgICAgICdoaXQnXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5haUF0dGFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBsYXllcjFCb2FyZC5oaXRTcXVhcmUoc2hvdExvY2F0aW9uWzBdLCBzaG90TG9jYXRpb25bMV0pO1xuICAgICAgZG9tLmRyYXdBY3Rpb25Ub0JvYXJkKHtcbiAgICAgICAgYWN0aW9uOiAnc2hvdCcsXG4gICAgICAgIHRhcmdldDogJ29jZWFuJyxcbiAgICAgICAgcGxheWVyOiAnaHVtYW4nLFxuICAgICAgICB4OiBzaG90TG9jYXRpb25bMV0sXG4gICAgICAgIHk6IHNob3RMb2NhdGlvblswXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHdpbkNoZWNrZXIocGxheWVyKSB7XG4gICAgaWYgKHBsYXllciA9PT0gJ0FJJykge1xuICAgICAgaWYgKHRoaXMucGxheWVyMUJvYXJkLmlzQWxsTG9zdCgpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIyQm9hcmQuaXNBbGxMb3N0KCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdBSSBMT1NUJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2FtZUV2ZW50KGV2ZW50T2JqZWN0KSB7XG4gICAgdGhpcy5jdXJyZW50U3RhZ2UgPT09ICdjb21iYXQnXG4gICAgICA/IHRoaXMuY29tYmF0Q29udHJvbGxlcihldmVudE9iamVjdClcbiAgICAgIDogdGhpcy5jdXJyZW50U3RhZ2UgPT09ICdzaGlwUGxhY2VtZW50J1xuICAgICAgPyB0aGlzLnBsYWNlbWVudENvbnRyb2xsZXIoZXZlbnRPYmplY3QpXG4gICAgICA6IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgZG9tIH0gZnJvbSAnLi92aWV3L2RvbSc7XG5pbXBvcnQgeyBldmVudHMgfSBmcm9tICcuL3ZpZXcvZXZlbnRsaXN0ZW5lcnMnO1xuXG5kb20uY3JlYXRlR2FtZWJvYXJkcygpO1xuZXZlbnRzLnN0YXJ0TGlzdGVuZXIoKTtcbmV2ZW50cy5vcmllbnRhdGlvbkxpc3RlbmVyKCk7XG5ldmVudHMuZ3JpZExpc3RlbmVyKCdodW1hbicpO1xuZXZlbnRzLmdyaWRMaXN0ZW5lcignQUknKTtcbiIsImltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXBzJztcbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi9jb250cm9sbGVyL2dhbWUnO1xuaW1wb3J0IHsgZG9tIH0gZnJvbSAnLi4vdmlldy9kb20nO1xuXG5leHBvcnQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IocGxheWVyVHlwZSkge1xuICAgIHRoaXMuc3Vua1NoaXBzID0gMDtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5ib2FyZENyZWF0aW9uKCk7XG4gICAgdGhpcy5wbGF5ZXJUeXBlID0gcGxheWVyVHlwZTtcbiAgICB0aGlzLnNob3RzID0gW107XG4gICAgdGhpcy5zaGlwQXJyYXkgPSBbXG4gICAgICAnY2FycmllcicsXG4gICAgICAnYmF0dGxlc2hpcCcsXG4gICAgICAnY3J1aXNlcicsXG4gICAgICAnc3VibWFyaW5lJyxcbiAgICAgICdkZXN0cm95ZXInLFxuICAgIF07XG4gIH1cbiAgYm9hcmRDcmVhdGlvbigpIHtcbiAgICBsZXQgbmV3Qm9hcmQgPSBuZXcgQXJyYXkoMTApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3Qm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5ld0JvYXJkW2ldID0gQXJyYXkuZnJvbSgnMDEyMzQ1Njc4OScpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3Qm9hcmQ7XG4gIH1cbiAgLy8gTWV0aG9kcyByZWxhdGluZyB0byBnYW1lYm9hcmQgLSB0aGUgY29udGVudCBvZiBzcXVhcmUgZXRjXG4gIGdldFNxdWFyZUNvbnRlbnQoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkW3hdW3ldO1xuICB9XG4gIHNldFNxdWFyZUNvbnRlbnQoeCwgeSwgY29udGVudCkge1xuICAgIHRoaXMuYm9hcmRbeF1beV0gPSBjb250ZW50O1xuICB9XG4gIGhpdFNxdWFyZSh4LCB5KSB7XG4gICAgLy8gVGhpcyBuZWVkcyB0byBiZSByZXdvcmtlZCBhcyBub3cgYm9hcmQgaXMgdXNlZCB0byBzdG9yZSBTaGlwIG9iamVjdHNcbiAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ2hpdCc7XG4gIH1cbiAgZ2V0RnVsbEJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkO1xuICB9XG4gIGdldFNoaXBBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwQXJyYXk7XG4gIH1cblxuICAvLyBTaGlwIHByb3BlcnRpZXMgLSBob3cgbWFueSBzdW5rIHNoaXBzIC8gaGF2ZSBhbGwgYmVlbiBzdW5rXG4gIHNoaXBXYXNTdW5rKCkge1xuICAgIHRoaXMuc3Vua1NoaXBzID0gdGhpcy5zdW5rU2hpcHMgKyAxO1xuICB9XG4gIGdldFN1bmtTaGlwcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdW5rU2hpcHM7XG4gIH1cbiAgaXNBbGxMb3N0KCkge1xuICAgIGNvbnNvbGUubG9nKGBzdW5rIHNoaXBzOiAke3RoaXMuc3Vua1NoaXBzfWApO1xuICAgIHJldHVybiB0aGlzLnN1bmtTaGlwcyA9PT0gNTtcbiAgfVxuXG4gIC8vIFRvIGJlIHVzZWQgYnkgdGhlIEFJIHBsYXllciBmb3Igc2hpcCBwbGFjZW1lbnQgYW5kIHNob290eSB0aGluZ3NcbiAgZ2V0UmFuZG9tQ29vcmRpbmF0ZXMocGxhY2VtZW50KSB7XG4gICAgbGV0IGNvb3JkcyA9IFtdO1xuICAgIGxldCBpID0gMjtcbiAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgIGxldCByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogKDkgLSAwKSArIDA7XG4gICAgICBjb29yZHMucHVzaChNYXRoLnJvdW5kKHJhbmRvbSkpO1xuICAgICAgaS0tO1xuICAgIH1cbiAgICAvLyBhbGxvd3MgdGhlIG1ldGhvZCB0byBiZSB1c2VkIHdoZW4gcGxhY2luZyBzaGlwc1xuICAgIGlmIChwbGFjZW1lbnQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBjb29yZHM7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZSBjYXNlIHRvIGNoZWNrIGlmIHNob3RzIGFycmF5IGFscmVhZHkgY29udGFpbnMgdGhlIGdlbmVyYXRlZCBudW1iZXJcbiAgICBpZiAoXG4gICAgICB0aGlzLnNob3RzLnNvbWUoKHNob3RTcXVhcmUpID0+XG4gICAgICAgIHNob3RTcXVhcmUuZXZlcnkoKGRpZ2l0LCBpbmRleCkgPT4gZGlnaXQgPT09IGNvb3Jkc1tpbmRleF0pXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRSYW5kb21Db29yZGluYXRlcygpO1xuICAgIH1cbiAgICB0aGlzLnNob3RzLnB1c2goY29vcmRzKTtcbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG4gIGdldFJhbmRvbU9yaWVudGF0aW9uKCkge1xuICAgIGxldCBvcmllbnRhdGlvbkFycmF5ID0gW107XG4gICAgbGV0IGkgPSA1O1xuICAgIHdoaWxlIChpID4gMCkge1xuICAgICAgbGV0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCkgKiAoMTAgLSAxKSArIDE7XG4gICAgICBpZiAocmFuZG9tID49IDUpIG9yaWVudGF0aW9uQXJyYXkucHVzaCgndmVydGljYWwnKTtcbiAgICAgIGVsc2Ugb3JpZW50YXRpb25BcnJheS5wdXNoKCdob3Jpem9udGFsJyk7XG4gICAgICBpLS07XG4gICAgfVxuICAgIHJldHVybiBvcmllbnRhdGlvbkFycmF5O1xuICB9XG5cbiAgLy8gU2hpcHMgLSBwbGFjZW1lbnQsIGNoZWNraW5nIGZvciBwb3NzaWJsZSBjb2xsaXNpb25zXG4gIHBsYWNlU2hpcChbeCwgeV0sIG9yaWVudGF0aW9uLCBzaGlwLCBwbGF5ZXJUeXBlKSB7XG4gICAgbGV0IGxlbmd0aCA9IHNoaXAuZ2V0U3F1YXJlcygpO1xuICAgIGxldCBjb29yZGluYXRlcyA9IFt4LCB5XTtcbiAgICAvLyBDaGVja3MgZm9yIGxlZ2FsIG1vdmVzXG4gICAgLy8gRm9yIEFJIG5ldyBjb29yZGluYXRlcyBhcmUgZ2VuZXJhdGVkIHVudGlsIGFwcHJvcHJpYXRlIG9uZXMgYXJlIGZvdW5kXG4gICAgaWYgKFxuICAgICAgcGxheWVyVHlwZSA9PT0gJ0FJJyAmJlxuICAgICAgKHRoaXMubGVnYWxNb3ZlKFt4LCB5XSwgb3JpZW50YXRpb24sIGxlbmd0aCkgPT09IGZhbHNlIHx8XG4gICAgICAgIHRoaXMubm90T2NjdXBpZWQoW3gsIHldLCBvcmllbnRhdGlvbiwgbGVuZ3RoKSA9PT0gZmFsc2UpXG4gICAgKSB7XG4gICAgICBsZXQgbmV3Q29vcmRzID0gdGhpcy5nZXRSYW5kb21Db29yZGluYXRlcyh0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzLnBsYWNlU2hpcChuZXdDb29yZHMsIG9yaWVudGF0aW9uLCBzaGlwLCBwbGF5ZXJUeXBlKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgLy8gdGhpcyBwYXJ0IGlzIHVzZWQgdG8gcHJldmVudCB0aGUgaHVtYW4gcGxheWVyIHRvIG1ha2UgaWxsZWdhbCBwbGFjZW1lbnRzXG4gICAgICB0aGlzLmxlZ2FsTW92ZShbeCwgeV0sIG9yaWVudGF0aW9uLCBsZW5ndGgpID09PSBmYWxzZSB8fFxuICAgICAgdGhpcy5ub3RPY2N1cGllZChbeCwgeV0sIG9yaWVudGF0aW9uLCBsZW5ndGgpID09PSBmYWxzZVxuICAgICkge1xuICAgICAgY29uc29sZS5sb2coJ0lsbGVnYWwgbW92ZScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJZiBjb29yZGluYXRlcyBhcmUgQS1PSywgd2UgY29udGludWUgd2l0aCBwbGFjZW1lbnRcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgd2hpbGUgKGxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zZXRTcXVhcmVDb250ZW50KGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSwgc2hpcCk7XG4gICAgICAgIGRvbS5kcmF3QWN0aW9uVG9Cb2FyZCh7XG4gICAgICAgICAgYWN0aW9uOiAncGxhY2VtZW50JyxcbiAgICAgICAgICBwbGF5ZXI6IHBsYXllclR5cGUsXG4gICAgICAgICAgeDogY29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgeTogY29vcmRpbmF0ZXNbMF0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb29yZGluYXRlc1swXSsrO1xuICAgICAgICBsZW5ndGgtLTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB3aGlsZSAobGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNldFNxdWFyZUNvbnRlbnQoY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdLCBzaGlwKTtcbiAgICAgICAgZG9tLmRyYXdBY3Rpb25Ub0JvYXJkKHtcbiAgICAgICAgICBhY3Rpb246ICdwbGFjZW1lbnQnLFxuICAgICAgICAgIHBsYXllcjogcGxheWVyVHlwZSxcbiAgICAgICAgICB4OiBjb29yZGluYXRlc1sxXSxcbiAgICAgICAgICB5OiBjb29yZGluYXRlc1swXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdKys7XG4gICAgICAgIGxlbmd0aC0tO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBsZWdhbE1vdmUoW3gsIHldLCBvcmllbnRhdGlvbiwgbGVuZ3RoKSB7XG4gICAgbGV0IGxhc3RTcXVhcmUgPSBbeCwgeV07XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGxhc3RTcXVhcmVbMF0gPSBsYXN0U3F1YXJlWzBdIC0gMSArIGxlbmd0aDtcbiAgICAgIC8qICAgICAgIGNvbnNvbGUubG9nKGBsYXN0IHNxdWFyZSBpcyAke2xhc3RTcXVhcmVbMF19LCR7bGFzdFNxdWFyZVsxXX1gKTsgKi9cbiAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICBsYXN0U3F1YXJlWzFdID0gbGFzdFNxdWFyZVsxXSAtIDEgKyBsZW5ndGg7XG4gICAgICAvKiAgICAgICBjb25zb2xlLmxvZyhgbGFzdCBzcXVhcmUgaXMgJHtsYXN0U3F1YXJlWzBdfSwke2xhc3RTcXVhcmVbMV19YCk7ICovXG4gICAgfVxuICAgIGlmIChsYXN0U3F1YXJlWzBdIDw9IDkgJiYgbGFzdFNxdWFyZVsxXSA8PSA5KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIG5vdE9jY3VwaWVkKFt4LCB5XSwgb3JpZW50YXRpb24sIGxlbmd0aCkge1xuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB3aGlsZSAobGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAodGhpcy5nZXRTcXVhcmVDb250ZW50KHgsIHkpIGluc3RhbmNlb2YgU2hpcCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB4Kys7XG4gICAgICAgIGxlbmd0aC0tO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHdoaWxlIChsZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFNxdWFyZUNvbnRlbnQoeCwgeSkgaW5zdGFuY2VvZiBTaGlwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHkrKztcbiAgICAgICAgbGVuZ3RoLS07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWlTaGlwUGxhY2VtZW50KCkge1xuICAgIGxldCBvcmllbnRhdGlvbkFycmF5ID0gdGhpcy5nZXRSYW5kb21PcmllbnRhdGlvbigpO1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChpIDwgNSkge1xuICAgICAgbGV0IG5leHRTaGlwID0gbmV3IFNoaXAodGhpcy5zaGlwQXJyYXlbaV0pO1xuICAgICAgdGhpcy5wbGFjZVNoaXAoXG4gICAgICAgIHRoaXMuZ2V0UmFuZG9tQ29vcmRpbmF0ZXModHJ1ZSksXG4gICAgICAgIG9yaWVudGF0aW9uQXJyYXlbMF0sXG4gICAgICAgIG5leHRTaGlwLFxuICAgICAgICAnQUknXG4gICAgICApO1xuICAgICAgaSsrO1xuICAgICAgb3JpZW50YXRpb25BcnJheS5zcGxpY2UoMCwgMSk7XG4gICAgfVxuICAgIGxldCBib2FyZHkgPSB0aGlzLmdldEZ1bGxCb2FyZCgpO1xuICAgIGNvbnNvbGUudGFibGUoYm9hcmR5KTtcbiAgfVxuXG4gIGh1bWFuU2hpcFBsYWNlbWVudChldmVudE9iamVjdCkge1xuICAgIGlmICh0aGlzLnNoaXBBcnJheS5sZW5ndGggPCAxKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhlbSBzaGlwcyB3ZXJlIHBsYWNlZCcpO1xuICAgIH1cbiAgICBsZXQgbmV4dFNoaXAgPSBuZXcgU2hpcCh0aGlzLnNoaXBBcnJheVswXSk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wbGFjZVNoaXAoXG4gICAgICAgIFtldmVudE9iamVjdC55LCBldmVudE9iamVjdC54XSxcbiAgICAgICAgZXZlbnRPYmplY3Qub3JpZW50YXRpb24sXG4gICAgICAgIG5leHRTaGlwLFxuICAgICAgICBldmVudE9iamVjdC5wbGF5ZXJcbiAgICAgICkgPT09IGZhbHNlXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuc2hpcEFycmF5LnNwbGljZSgwLCAxKTtcbiAgICBsZXQgYm9hcmR5ID0gdGhpcy5nZXRGdWxsQm9hcmQoKTtcbiAgICBjb25zb2xlLnRhYmxlKGJvYXJkeSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgLyogdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQodGhpcy50eXBlKTsgKi9cbiAgfVxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuaGVhbHRoID0gdGhpcy5nZXRTcXVhcmVzKCk7XG4gICAgdGhpcy5wbGFjZXNUaGF0VG9va0hpdHMgPSBbXTtcbiAgfVxuXG4gIGdldFNxdWFyZXMoKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2NhcnJpZXInKSByZXR1cm4gNTtcbiAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdiYXR0bGVzaGlwJykgcmV0dXJuIDQ7XG4gICAgZWxzZSBpZiAodGhpcy50eXBlID09PSAnY3J1aXNlcicpIHJldHVybiAzO1xuICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ3N1Ym1hcmluZScpIHJldHVybiAzO1xuICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2Rlc3Ryb3llcicpIHJldHVybiAyO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0SGVhbHRoKCkge1xuICAgIHJldHVybiB0aGlzLmhlYWx0aDtcbiAgfVxuXG4gIGhpdCh5LCB4KSB7XG4gICAgaWYgKHRoaXMud2FzSXRBbHJlYWR5SGl0VGhlcmUoeSwgeCkgPT09IHRydWUpIHJldHVybjtcbiAgICBpZiAodGhpcy5oZWFsdGggPj0gMSkgdGhpcy5oZWFsdGggPSB0aGlzLmhlYWx0aCAtIDE7XG4gICAgdGhpcy5wbGFjZXNUaGF0VG9va0hpdHMucHVzaChbeSwgeF0pO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaGVhbHRoKTtcbiAgICByZXR1cm4gdGhpcy5oZWFsdGg7XG4gIH1cbiAgd2FzSXRBbHJlYWR5SGl0VGhlcmUoeSwgeCkge1xuICAgIGxldCBjb29yZHMgPSBbeSwgeF07XG4gICAgaWYgKFxuICAgICAgdGhpcy5wbGFjZXNUaGF0VG9va0hpdHMuc29tZSgoc2hvdFNxYXJlKSA9PlxuICAgICAgICBzaG90U3FhcmUuZXZlcnkoKGRpZ2l0LCBpbmRleCkgPT4gZGlnaXQgPT09IGNvb3Jkc1tpbmRleF0pXG4gICAgICApXG4gICAgKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhpcyBzaGlwIGFscmVhZHkgdG9vayBhIGhpdCB0aGVyZScpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdubyBoaXRzIHRoZXJlIHlldCcpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oZWFsdGggPT09IDA7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi9jb250cm9sbGVyL2dhbWUnO1xuaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSAnLi9ldmVudGxpc3RlbmVycyc7XG5leHBvcnQgY29uc3QgZG9tID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gY3JlYXRlR3JpZChib2FyZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDk7IGkrKykge1xuICAgICAgbGV0IGNvbHVtbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoJ2NvbHVtbicpO1xuICAgICAgY29sdW1uLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY29sdW1uKTtcbiAgICAgIGZvciAobGV0IGwgPSAwOyBsIDw9IDk7IGwrKykge1xuICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgY2VsbC5kYXRhc2V0LmluZGV4ID0gbDtcbiAgICAgICAgY29sdW1uLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUdhbWVib2FyZHMoKSB7XG4gICAgY29uc3QgaHVtYW5nYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtYW5nYW1lYm9hcmQnKTtcbiAgICBjb25zdCBhaWdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5haWdhbWVib2FyZCcpO1xuICAgIGNyZWF0ZUdyaWQoaHVtYW5nYW1lYm9hcmQpO1xuICAgIGNyZWF0ZUdyaWQoYWlnYW1lYm9hcmQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0FjdGlvblRvQm9hcmQoZHJhd09iamVjdCkge1xuICAgIGlmIChkcmF3T2JqZWN0LmFjdGlvbiA9PT0gJ3BsYWNlbWVudCcpIGRyYXdTaGlwKGRyYXdPYmplY3QpO1xuICAgIGlmIChkcmF3T2JqZWN0LmFjdGlvbiA9PT0gJ3Nob3QnKSBkcmF3U2hvdChkcmF3T2JqZWN0KTtcbiAgfVxuICBmdW5jdGlvbiBkcmF3U2hpcChkcmF3T2JqZWN0KSB7XG4gICAgbGV0IHBsYXllckJvYXJkID0gJ2h1bWFuZ2FtZWJvYXJkJztcbiAgICBpZiAoZHJhd09iamVjdC5wbGF5ZXIgPT09ICdBSScpIHBsYXllckJvYXJkID0gJ2FpZ2FtZWJvYXJkJztcbiAgICBpZiAoZHJhd09iamVjdC5wbGF5ZXIgPT09ICdodW1hbicpIHBsYXllckJvYXJkID0gJ2h1bWFuZ2FtZWJvYXJkJztcbiAgICBjb25zdCBjZWxsID0gY2VsbFNlbGVjdG9yKHBsYXllckJvYXJkLCBkcmF3T2JqZWN0KTtcbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdTaG90KGRyYXdPYmplY3QpIHtcbiAgICBsZXQgcGxheWVyQm9hcmQgPSAnaHVtYW5nYW1lYm9hcmQnO1xuICAgIGlmIChkcmF3T2JqZWN0LnBsYXllciA9PT0gJ0FJJykgcGxheWVyQm9hcmQgPSAnYWlnYW1lYm9hcmQnO1xuICAgIGlmIChkcmF3T2JqZWN0LnBsYXllciA9PT0gJ2h1bWFuJykgcGxheWVyQm9hcmQgPSAnaHVtYW5nYW1lYm9hcmQnO1xuICAgIGNvbnN0IGNlbGwgPSBjZWxsU2VsZWN0b3IocGxheWVyQm9hcmQsIGRyYXdPYmplY3QpO1xuXG4gICAgaWYgKGRyYXdPYmplY3QudGFyZ2V0ID09PSAnb2NlYW4nKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdE9jZWFuJyk7XG4gICAgfVxuICAgIGlmIChkcmF3T2JqZWN0LnRhcmdldCA9PT0gJ3NoaXAnKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdFNoaXAnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjZWxsU2VsZWN0b3IocGxheWVyQm9hcmQsIGRyYXdPYmplY3QpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGAuJHtwbGF5ZXJCb2FyZH0gLmNvbHVtbltkYXRhLWluZGV4PVwiJHtcbiAgICAgIGRyYXdPYmplY3QueFxuICAgIH1cIl0gLmNlbGw6bnRoLWNoaWxkKCR7ZHJhd09iamVjdC55ICsgMX0pYDtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIH1cblxuICBmdW5jdGlvbiBkZWNsYXJlV2lubmVyKHdpbm5lcikge1xuICAgIGNvbnNvbGUubG9nKHdpbm5lcik7XG4gICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGlhbG9nJyk7XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5uZXInKTtcbiAgICBkaWFsb2cuY2xhc3NMaXN0LmFkZCgnZGlhbG9nVmlzaWJsZScpO1xuICAgIHRleHQuaW5uZXJUZXh0ID0gYFRoZSB3aW5uZXIgaXMgdGhlICR7d2lubmVyfWA7XG4gICAgZGlhbG9nLnNob3dNb2RhbCgpO1xuICAgIGV2ZW50cy5yZXNldExpc3RlbmVyKCk7XG4gIH1cblxuICBmdW5jdGlvbiBvcmllbnRhdGlvbkRpc3BsYXllcigpIHtcbiAgICBjb25zdCBvcmllbnRhdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3JpZW50YXRpb25EaXNwbGF5Jyk7XG4gICAgaWYgKG9yaWVudGF0aW9uRGlzcGxheS5pbm5lclRleHQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgb3JpZW50YXRpb25EaXNwbGF5LmlubmVyVGV4dCA9ICd2ZXJ0aWNhbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9yaWVudGF0aW9uRGlzcGxheS5pbm5lclRleHQgPSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY29tYmF0RGlzcGxheWVyKCkge1xuICAgIGNvbnN0IG9yaWVudGF0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmllbnRhdGlvbkRpc3BsYXknKTtcbiAgICBvcmllbnRhdGlvbkRpc3BsYXkuaW5uZXJUZXh0ID0gJ0NPTUJBVCEgU2hvb3QgYXdheSEnO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVHYW1lYm9hcmRzLFxuICAgIGRyYXdBY3Rpb25Ub0JvYXJkLFxuICAgIGRlY2xhcmVXaW5uZXIsXG4gICAgb3JpZW50YXRpb25EaXNwbGF5ZXIsXG4gICAgY29tYmF0RGlzcGxheWVyLFxuICB9O1xufSkoKTtcbiIsImltcG9ydCB7IGRvbSB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi9jb250cm9sbGVyL2dhbWUnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi4vbW9kZWwvcGxheWVyJztcblxuZXhwb3J0IGNvbnN0IGV2ZW50cyA9ICgoKSA9PiB7XG4gIGxldCBodW1hbkdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtYW5nYW1lYm9hcmQnKTtcbiAgbGV0IG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgbGV0IG5ld0dhbWUgPSB1bmRlZmluZWQ7XG5cbiAgZnVuY3Rpb24gc3RhcnRMaXN0ZW5lcigpIHtcbiAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydCcpO1xuICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIG5ld0dhbWUgPT09ICdvYmplY3QnKSByZXR1cm47XG4gICAgICBuZXdHYW1lID0gbmV3IEdhbWUoXG4gICAgICAgIG5ldyBQbGF5ZXIoJ2FudGVybycsICdodW1hbicpLFxuICAgICAgICBuZXcgUGxheWVyKCdCb2InLCAnQUknKVxuICAgICAgKTtcbiAgICAgIG5ld0dhbWUuc3RhcnRHYW1lTG9vcCgpO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG9yaWVudGF0aW9uTGlzdGVuZXIoKSB7XG4gICAgY29uc3Qgb3JpZW50YXRpb25CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb24nKTtcbiAgICBvcmllbnRhdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbiAhPT0gJ2hvcml6b250YWwnID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJztcbiAgICAgIGRvbS5vcmllbnRhdGlvbkRpc3BsYXllcihvcmllbnRhdGlvbik7XG4gICAgICBjb25zb2xlLmxvZyhvcmllbnRhdGlvbik7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gZ3JpZExpc3RlbmVyKHBsYXllcikge1xuICAgIGxldCBodW1hbkdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtYW5nYW1lYm9hcmQnKTtcbiAgICBsZXQgYWlHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFpZ2FtZWJvYXJkJyk7XG4gICAgbGV0IGNvbHVtbnMgPSBudWxsO1xuICAgIGlmIChwbGF5ZXIgPT09ICdodW1hbicpIHtcbiAgICAgIGNvbHVtbnMgPSBodW1hbkdyaWQuY2hpbGROb2RlcztcbiAgICB9IGVsc2UgY29sdW1ucyA9IGFpR3JpZC5jaGlsZE5vZGVzO1xuXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgIGNvbHVtbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChzcXVhcmUpID0+IHtcbiAgICAgICAgbmV3R2FtZS5nYW1lRXZlbnQoe1xuICAgICAgICAgIHBsYXllcjogcGxheWVyLFxuICAgICAgICAgIHg6IE51bWJlcihzcXVhcmUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleCksXG4gICAgICAgICAgeTogTnVtYmVyKHNxdWFyZS50YXJnZXQuZGF0YXNldC5pbmRleCksXG4gICAgICAgICAgb3JpZW50YXRpb246IG9yaWVudGF0aW9uLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRMaXN0ZW5lcigpIHtcbiAgICBsZXQgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXQnKTtcbiAgICByZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgc3RhcnRMaXN0ZW5lciwgb3JpZW50YXRpb25MaXN0ZW5lciwgZ3JpZExpc3RlbmVyLCByZXNldExpc3RlbmVyIH07XG59KSgpO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBDU1MgSFNMICovXFxuOnJvb3Qge1xcbiAgLS1za3ktYmx1ZTogaHNsYSgxOTksIDY0JSwgNzMlLCAxKTtcXG4gIC0tYmx1ZS1ncmVlbjogcmdiKDIyLCAxMDgsIDEyOSk7XFxuICAtLXBydXNzaWFuLWJsdWU6IGhzbGEoMjAwLCA5NSUsIDE0JSwgMSk7XFxuICAtLXNlbGVjdGl2ZS15ZWxsb3c6IGhzbGEoNDMsIDEwMCUsIDUxJSwgMSk7XFxuICAtLXV0LW9yYW5nZTogaHNsYSgzMiwgMTAwJSwgNDklLCAxKTtcXG4gIC0tY29vbC1ncmF5OiBoc2xhKDIxOCwgMTclLCA3MiUpO1xcbiAgLS1kZWVwLW9yYW5nZTogcmdiKDIwMSwgNTgsIDE1KTtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogcm9ib3RvLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdPcGVuIFNhbnMnLFxcbiAgICAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgbWFyZ2luOiAwO1xcbiAgY29sb3I6IHZhcigtLXNlbGVjdGl2ZS15ZWxsb3cpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJ1c3NpYW4tYmx1ZSk7XFxufVxcblxcbm1haW4sXFxuaGVhZGVyIHtcXG4gIG1hcmdpbjogMiU7XFxufVxcblxcbmhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgcGFkZGluZzogN3B4O1xcbn1cXG5cXG5kaWFsb2cge1xcbiAgei1pbmRleDogMTA7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgcGFkZGluZzogNSU7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1ibHVlLWdyZWVuKTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XFxufVxcblxcbmRpYWxvZzo6YmFja2Ryb3Age1xcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsYSgwLCAwJSwgMCUsIDAuNDA0KTtcXG59XFxuXFxuLmRpYWxvZ1Zpc2libGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5jb250cm9scyxcXG4uZ2FtZWJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnRvcCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmdhbWVib2FyZC1jb250YWluZXIge1xcbiAgbWFyZ2luOiAyJTtcXG59XFxuXFxuLmh1bWFuZ2FtZWJvYXJkLFxcbi5haWdhbWVib2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYm9yZGVyOiAxcHggc29saWQ7XFxufVxcblxcbi5jb2x1bW4ge1xcbiAgbWluLXdpZHRoOiAzMHB4O1xcbn1cXG5cXG4uY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcnVzc2lhbi1ibHVlKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbiAgbWluLWhlaWdodDogMzBweDtcXG59XFxuXFxuLmNlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdXQtb3JhbmdlKTtcXG59XFxuXFxuLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmx1ZS1ncmVlbik7XFxufVxcblxcbi5oaXRTaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRlZXAtb3JhbmdlKTtcXG59XFxuXFxuLmhpdE9jZWFuIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXV0LW9yYW5nZSk7XFxufVxcblxcbi5vcmllbnRhdGlvbkRpc3BsYXkge1xcbiAgcGFkZGluZy1sZWZ0OiAyJTtcXG4gIHBhZGRpbmctcmlnaHQ6IDIlO1xcbiAgcGFkZGluZy10b3A6IDElO1xcbiAgcGFkZGluZy1ib3R0b206IDElO1xcbiAgYm9yZGVyOiAxcHggc29saWQ7XFxufVxcblxcbi5oZWxwIHtcXG4gIHBhZGRpbmctdG9wOiA1JTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc3RhcnQsXFxuLnBsYWNlbWVudCxcXG4uY29tYmF0IHtcXG4gIHdpZHRoOiA0MCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsWUFBWTtBQUNaO0VBQ0Usa0NBQWtDO0VBQ2xDLCtCQUErQjtFQUMvQix1Q0FBdUM7RUFDdkMsMENBQTBDO0VBQzFDLG1DQUFtQztFQUNuQyxnQ0FBZ0M7RUFDaEMsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0U7Z0NBQzhCO0VBQzlCLFNBQVM7RUFDVCw4QkFBOEI7RUFDOUIsc0NBQXNDO0FBQ3hDOztBQUVBOztFQUVFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsNkJBQTZCO0VBQzdCLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBOztFQUVFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHNDQUFzQztFQUN0QyxpQkFBaUI7RUFDakIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0Usa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7OztFQUdFLFVBQVU7RUFDVixrQkFBa0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogQ1NTIEhTTCAqL1xcbjpyb290IHtcXG4gIC0tc2t5LWJsdWU6IGhzbGEoMTk5LCA2NCUsIDczJSwgMSk7XFxuICAtLWJsdWUtZ3JlZW46IHJnYigyMiwgMTA4LCAxMjkpO1xcbiAgLS1wcnVzc2lhbi1ibHVlOiBoc2xhKDIwMCwgOTUlLCAxNCUsIDEpO1xcbiAgLS1zZWxlY3RpdmUteWVsbG93OiBoc2xhKDQzLCAxMDAlLCA1MSUsIDEpO1xcbiAgLS11dC1vcmFuZ2U6IGhzbGEoMzIsIDEwMCUsIDQ5JSwgMSk7XFxuICAtLWNvb2wtZ3JheTogaHNsYSgyMTgsIDE3JSwgNzIlKTtcXG4gIC0tZGVlcC1vcmFuZ2U6IHJnYigyMDEsIDU4LCAxNSk7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IHJvYm90bywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnT3BlbiBTYW5zJyxcXG4gICAgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbjogMDtcXG4gIGNvbG9yOiB2YXIoLS1zZWxlY3RpdmUteWVsbG93KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBydXNzaWFuLWJsdWUpO1xcbn1cXG5cXG5tYWluLFxcbmhlYWRlciB7XFxuICBtYXJnaW46IDIlO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDdweDtcXG59XFxuXFxuZGlhbG9nIHtcXG4gIHotaW5kZXg6IDEwO1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIHBhZGRpbmc6IDUlO1xcbiAgYmFja2dyb3VuZDogdmFyKC0tYmx1ZS1ncmVlbik7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbn1cXG5cXG5kaWFsb2c6OmJhY2tkcm9wIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGhzbGEoMCwgMCUsIDAlLCAwLjQwNCk7XFxufVxcblxcbi5kaWFsb2dWaXNpYmxlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uY29udHJvbHMsXFxuLmdhbWVib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50b3Age1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lYm9hcmQtY29udGFpbmVyIHtcXG4gIG1hcmdpbjogMiU7XFxufVxcblxcbi5odW1hbmdhbWVib2FyZCxcXG4uYWlnYW1lYm9hcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbn1cXG5cXG4uY29sdW1uIHtcXG4gIG1pbi13aWR0aDogMzBweDtcXG59XFxuXFxuLmNlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJ1c3NpYW4tYmx1ZSk7XFxuICBib3JkZXI6IDFweCBzb2xpZDtcXG4gIG1pbi1oZWlnaHQ6IDMwcHg7XFxufVxcblxcbi5jZWxsOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXV0LW9yYW5nZSk7XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJsdWUtZ3JlZW4pO1xcbn1cXG5cXG4uaGl0U2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kZWVwLW9yYW5nZSk7XFxufVxcblxcbi5oaXRPY2VhbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS11dC1vcmFuZ2UpO1xcbn1cXG5cXG4ub3JpZW50YXRpb25EaXNwbGF5IHtcXG4gIHBhZGRpbmctbGVmdDogMiU7XFxuICBwYWRkaW5nLXJpZ2h0OiAyJTtcXG4gIHBhZGRpbmctdG9wOiAxJTtcXG4gIHBhZGRpbmctYm90dG9tOiAxJTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbn1cXG5cXG4uaGVscCB7XFxuICBwYWRkaW5nLXRvcDogNSU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0LFxcbi5wbGFjZW1lbnQsXFxuLmNvbWJhdCB7XFxuICB3aWR0aDogNDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbIlBsYXllciIsIkdhbWVib2FyZCIsIlNoaXAiLCJkb20iLCJHYW1lIiwiY29uc3RydWN0b3IiLCJwbGF5ZXIxIiwicGxheWVyMiIsInBsYXllcjFCb2FyZCIsImdldFR5cGUiLCJwbGF5ZXIyQm9hcmQiLCJjdXJyZW50U3RhZ2UiLCJjdXJyZW50UGxheWVyIiwiZ2V0TmFtZSIsImdldFBsYXllcjFTdGF0cyIsImdldFBsYXllcjJTdGF0cyIsImdldEN1cnJlbnRQbGF5ZXIiLCJnZXRDdXJyZW50U3RhZ2UiLCJjaGFuZ2VUdXJuIiwiaGl0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY2hhbmdlQ3VycmVudFN0YWdlIiwiY29tYmF0RGlzcGxheWVyIiwiY29uc29sZSIsImxvZyIsInN0YXJ0R2FtZUxvb3AiLCJhaVNoaXBQbGFjZW1lbnQiLCJwbGFjZW1lbnRDb250cm9sbGVyIiwiZXZlbnRPYmplY3QiLCJwbGF5ZXIiLCJnZXRTaGlwQXJyYXkiLCJodW1hblNoaXBQbGFjZW1lbnQiLCJjb21iYXRDb250cm9sbGVyIiwiaHVtYW5BdHRhY2siLCJnZXRTcXVhcmVDb250ZW50IiwieSIsIngiLCJkcmF3QWN0aW9uVG9Cb2FyZCIsImFjdGlvbiIsInRhcmdldCIsImlzU3VuayIsInNoaXBXYXNTdW5rIiwid2luQ2hlY2tlciIsImRlY2xhcmVXaW5uZXIiLCJhaUF0dGFjayIsImhpdFNxdWFyZSIsInNob3RMb2NhdGlvbiIsImdldFJhbmRvbUNvb3JkaW5hdGVzIiwid2FzSXRBbHJlYWR5SGl0VGhlcmUiLCJpc0FsbExvc3QiLCJnYW1lRXZlbnQiLCJldmVudHMiLCJjcmVhdGVHYW1lYm9hcmRzIiwic3RhcnRMaXN0ZW5lciIsIm9yaWVudGF0aW9uTGlzdGVuZXIiLCJncmlkTGlzdGVuZXIiLCJwbGF5ZXJUeXBlIiwic3Vua1NoaXBzIiwiYm9hcmQiLCJib2FyZENyZWF0aW9uIiwic2hvdHMiLCJzaGlwQXJyYXkiLCJuZXdCb2FyZCIsIkFycmF5IiwiaSIsImZyb20iLCJzZXRTcXVhcmVDb250ZW50IiwiY29udGVudCIsImdldEZ1bGxCb2FyZCIsImdldFN1bmtTaGlwcyIsInBsYWNlbWVudCIsImNvb3JkcyIsInJhbmRvbSIsIk1hdGgiLCJwdXNoIiwicm91bmQiLCJzb21lIiwic2hvdFNxdWFyZSIsImV2ZXJ5IiwiZGlnaXQiLCJpbmRleCIsImdldFJhbmRvbU9yaWVudGF0aW9uIiwib3JpZW50YXRpb25BcnJheSIsInBsYWNlU2hpcCIsIl9yZWYiLCJvcmllbnRhdGlvbiIsInNoaXAiLCJnZXRTcXVhcmVzIiwiY29vcmRpbmF0ZXMiLCJsZWdhbE1vdmUiLCJub3RPY2N1cGllZCIsIm5ld0Nvb3JkcyIsIl9yZWYyIiwibGFzdFNxdWFyZSIsIl9yZWYzIiwibmV4dFNoaXAiLCJzcGxpY2UiLCJib2FyZHkiLCJ0YWJsZSIsIm5hbWUiLCJ0eXBlIiwiaGVhbHRoIiwicGxhY2VzVGhhdFRvb2tIaXRzIiwiZ2V0SGVhbHRoIiwic2hvdFNxYXJlIiwiY3JlYXRlR3JpZCIsImNvbHVtbiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImRhdGFzZXQiLCJhcHBlbmRDaGlsZCIsImwiLCJjZWxsIiwiaHVtYW5nYW1lYm9hcmQiLCJxdWVyeVNlbGVjdG9yIiwiYWlnYW1lYm9hcmQiLCJkcmF3T2JqZWN0IiwiZHJhd1NoaXAiLCJkcmF3U2hvdCIsInBsYXllckJvYXJkIiwiY2VsbFNlbGVjdG9yIiwic2VsZWN0b3IiLCJ3aW5uZXIiLCJkaWFsb2ciLCJ0ZXh0IiwiaW5uZXJUZXh0Iiwic2hvd01vZGFsIiwicmVzZXRMaXN0ZW5lciIsIm9yaWVudGF0aW9uRGlzcGxheWVyIiwib3JpZW50YXRpb25EaXNwbGF5IiwiaHVtYW5HcmlkIiwibmV3R2FtZSIsInN0YXJ0QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib3JpZW50YXRpb25CdXR0b24iLCJhaUdyaWQiLCJjb2x1bW5zIiwiY2hpbGROb2RlcyIsImZvckVhY2giLCJzcXVhcmUiLCJOdW1iZXIiLCJwYXJlbnRFbGVtZW50IiwicmVzZXRCdXR0b24iLCJsb2NhdGlvbiIsInJlbG9hZCJdLCJzb3VyY2VSb290IjoiIn0=