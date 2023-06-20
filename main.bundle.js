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
  }
  startGameLoop() {
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
      alert('Already shot there chief');
    } else {
      this.player2Board.hitSquare(eventObject.y, eventObject.x);
      _view_dom__WEBPACK_IMPORTED_MODULE_3__.dom.drawActionToBoard({
        action: 'shot',
        target: 'ocean',
        player: eventObject.player,
        x: eventObject.x,
        y: eventObject.y
      });
      this.aiAttack();
    }
  }
  aiAttack() {
    let shotLocation = this.player1Board.getRandomCoordinates();
    if (this.player1Board.getSquareContent(shotLocation[0], shotLocation[1]) instanceof _model_ships__WEBPACK_IMPORTED_MODULE_2__.Ship) {
      if (this.player1Board.getSquareContent(shotLocation[0], shotLocation[1]).wasItAlreadyHitThere(shotLocation[0], shotLocation[1]) === true) {
        return this.aiAttack();
      } else {
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
      alert('Illegal move');
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
    } else if (orientation === 'vertical') {
      lastSquare[1] = lastSquare[1] - 1 + length;
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
  }
  humanShipPlacement(eventObject) {
    if (this.shipArray.length < 1) {}
    let nextShip = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship(this.shipArray[0]);
    if (this.placeShip([eventObject.y, eventObject.x], eventObject.orientation, nextShip, eventObject.player) === false) return;
    this.shipArray.splice(0, 1);
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
    return this.health;
  }
  wasItAlreadyHitThere(y, x) {
    let coords = [y, x];
    if (this.placesThatTookHits.some(shotSqare => shotSqare.every((digit, index) => digit === coords[index]))) {
      return true;
    }
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
    if (drawObject.player === 'AI') return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlci9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2RlbC9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2RlbC9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2RlbC9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlldy9ldmVudGxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXllciB9IGZyb20gJy4uL21vZGVsL3BsYXllcic7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuLi9tb2RlbC9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4uL21vZGVsL3NoaXBzJztcbmltcG9ydCB7IGRvbSB9IGZyb20gJy4uL3ZpZXcvZG9tJztcblxuZXhwb3J0IGNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgdGhpcy5wbGF5ZXIxID0gcGxheWVyMTtcbiAgICB0aGlzLnBsYXllcjIgPSBwbGF5ZXIyO1xuICAgIHRoaXMucGxheWVyMUJvYXJkID0gbmV3IEdhbWVib2FyZChwbGF5ZXIxLmdldFR5cGUoKSk7XG4gICAgdGhpcy5wbGF5ZXIyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKHBsYXllcjIuZ2V0VHlwZSgpKTtcbiAgICB0aGlzLmN1cnJlbnRTdGFnZSA9ICdzaGlwUGxhY2VtZW50JztcbiAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjEuZ2V0TmFtZSgpO1xuICB9XG5cbiAgZ2V0UGxheWVyMVN0YXRzKCkge1xuICAgIHJldHVybiBbdGhpcy5wbGF5ZXIxLmdldFR5cGUoKSwgdGhpcy5wbGF5ZXIxLmdldE5hbWUoKV07XG4gIH1cbiAgZ2V0UGxheWVyMlN0YXRzKCkge1xuICAgIHJldHVybiBbdGhpcy5wbGF5ZXIyLmdldFR5cGUoKSwgdGhpcy5wbGF5ZXIyLmdldE5hbWUoKV07XG4gIH1cbiAgZ2V0Q3VycmVudFBsYXllcigpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50UGxheWVyO1xuICB9XG4gIGdldEN1cnJlbnRTdGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhZ2U7XG4gIH1cbiAgY2hhbmdlVHVybihoaXQgPSBmYWxzZSkge1xuICAgIGlmIChoaXQgPT09IHRydWUpIHJldHVybjtcbiAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjEuZ2V0TmFtZSgpKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjIuZ2V0TmFtZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjEuZ2V0TmFtZSgpO1xuICAgIH1cbiAgfVxuICBjaGFuZ2VDdXJyZW50U3RhZ2UoKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhZ2UgPSAnY29tYmF0JztcbiAgICBkb20uY29tYmF0RGlzcGxheWVyKCk7XG4gIH1cbiAgc3RhcnRHYW1lTG9vcCgpIHtcbiAgICB0aGlzLnBsYXllcjJCb2FyZC5haVNoaXBQbGFjZW1lbnQoKTtcbiAgfVxuICBwbGFjZW1lbnRDb250cm9sbGVyKGV2ZW50T2JqZWN0KSB7XG4gICAgaWYgKGV2ZW50T2JqZWN0LnBsYXllciA9PT0gJ0FJJykgcmV0dXJuO1xuICAgIGlmICh0aGlzLnBsYXllcjFCb2FyZC5nZXRTaGlwQXJyYXkoKS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMucGxheWVyMUJvYXJkLmh1bWFuU2hpcFBsYWNlbWVudChldmVudE9iamVjdCk7XG4gICAgICB0aGlzLmNoYW5nZUN1cnJlbnRTdGFnZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBsYXllcjFCb2FyZC5odW1hblNoaXBQbGFjZW1lbnQoZXZlbnRPYmplY3QpO1xuICB9XG4gIGNvbWJhdENvbnRyb2xsZXIoZXZlbnRPYmplY3QpIHtcbiAgICBpZiAoXG4gICAgICBldmVudE9iamVjdC5wbGF5ZXIgPT09ICdodW1hbicgJiZcbiAgICAgIHRoaXMuY3VycmVudFBsYXllciA9PSB0aGlzLnBsYXllcjEuZ2V0TmFtZSgpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaHVtYW5BdHRhY2soZXZlbnRPYmplY3QpO1xuICB9XG5cbiAgaHVtYW5BdHRhY2soZXZlbnRPYmplY3QpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnBsYXllcjJCb2FyZC5nZXRTcXVhcmVDb250ZW50KFxuICAgICAgICBldmVudE9iamVjdC55LFxuICAgICAgICBldmVudE9iamVjdC54XG4gICAgICApIGluc3RhbmNlb2YgU2hpcFxuICAgICkge1xuICAgICAgdGhpcy5wbGF5ZXIyQm9hcmRcbiAgICAgICAgLmdldFNxdWFyZUNvbnRlbnQoZXZlbnRPYmplY3QueSwgZXZlbnRPYmplY3QueClcbiAgICAgICAgLmhpdChldmVudE9iamVjdC55LCBldmVudE9iamVjdC54KTtcbiAgICAgIGRvbS5kcmF3QWN0aW9uVG9Cb2FyZCh7XG4gICAgICAgIGFjdGlvbjogJ3Nob3QnLFxuICAgICAgICB0YXJnZXQ6ICdzaGlwJyxcbiAgICAgICAgcGxheWVyOiBldmVudE9iamVjdC5wbGF5ZXIsXG4gICAgICAgIHg6IGV2ZW50T2JqZWN0LngsXG4gICAgICAgIHk6IGV2ZW50T2JqZWN0LnksXG4gICAgICB9KTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wbGF5ZXIyQm9hcmRcbiAgICAgICAgICAuZ2V0U3F1YXJlQ29udGVudChldmVudE9iamVjdC55LCBldmVudE9iamVjdC54KVxuICAgICAgICAgIC5pc1N1bmsoKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucGxheWVyMkJvYXJkLnNoaXBXYXNTdW5rKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy53aW5DaGVja2VyKCkpIHtcbiAgICAgICAgZG9tLmRlY2xhcmVXaW5uZXIoJ2h1bWFuJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmFpQXR0YWNrKCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucGxheWVyMkJvYXJkLmdldFNxdWFyZUNvbnRlbnQoZXZlbnRPYmplY3QueSwgZXZlbnRPYmplY3QueCkgPT09ICdoaXQnXG4gICAgKSB7XG4gICAgICBhbGVydCgnQWxyZWFkeSBzaG90IHRoZXJlIGNoaWVmJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGxheWVyMkJvYXJkLmhpdFNxdWFyZShldmVudE9iamVjdC55LCBldmVudE9iamVjdC54KTtcbiAgICAgIGRvbS5kcmF3QWN0aW9uVG9Cb2FyZCh7XG4gICAgICAgIGFjdGlvbjogJ3Nob3QnLFxuICAgICAgICB0YXJnZXQ6ICdvY2VhbicsXG4gICAgICAgIHBsYXllcjogZXZlbnRPYmplY3QucGxheWVyLFxuICAgICAgICB4OiBldmVudE9iamVjdC54LFxuICAgICAgICB5OiBldmVudE9iamVjdC55LFxuICAgICAgfSk7XG4gICAgICB0aGlzLmFpQXR0YWNrKCk7XG4gICAgfVxuICB9XG5cbiAgYWlBdHRhY2soKSB7XG4gICAgbGV0IHNob3RMb2NhdGlvbiA9IHRoaXMucGxheWVyMUJvYXJkLmdldFJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wbGF5ZXIxQm9hcmQuZ2V0U3F1YXJlQ29udGVudChcbiAgICAgICAgc2hvdExvY2F0aW9uWzBdLFxuICAgICAgICBzaG90TG9jYXRpb25bMV1cbiAgICAgICkgaW5zdGFuY2VvZiBTaGlwXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMucGxheWVyMUJvYXJkXG4gICAgICAgICAgLmdldFNxdWFyZUNvbnRlbnQoc2hvdExvY2F0aW9uWzBdLCBzaG90TG9jYXRpb25bMV0pXG4gICAgICAgICAgLndhc0l0QWxyZWFkeUhpdFRoZXJlKHNob3RMb2NhdGlvblswXSwgc2hvdExvY2F0aW9uWzFdKSA9PT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFpQXR0YWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBsYXllcjFCb2FyZFxuICAgICAgICAgIC5nZXRTcXVhcmVDb250ZW50KHNob3RMb2NhdGlvblswXSwgc2hvdExvY2F0aW9uWzFdKVxuICAgICAgICAgIC5oaXQoc2hvdExvY2F0aW9uWzBdLCBzaG90TG9jYXRpb25bMV0pO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5wbGF5ZXIxQm9hcmRcbiAgICAgICAgICAgIC5nZXRTcXVhcmVDb250ZW50KHNob3RMb2NhdGlvblswXSwgc2hvdExvY2F0aW9uWzFdKVxuICAgICAgICAgICAgLmlzU3VuaygpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMucGxheWVyMUJvYXJkLnNoaXBXYXNTdW5rKCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9tLmRyYXdBY3Rpb25Ub0JvYXJkKHtcbiAgICAgICAgICBhY3Rpb246ICdzaG90JyxcbiAgICAgICAgICB0YXJnZXQ6ICdzaGlwJyxcbiAgICAgICAgICBwbGF5ZXI6ICdodW1hbicsXG4gICAgICAgICAgeDogc2hvdExvY2F0aW9uWzFdLFxuICAgICAgICAgIHk6IHNob3RMb2NhdGlvblswXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLndpbkNoZWNrZXIoJ0FJJykpIHtcbiAgICAgICAgICBkb20uZGVjbGFyZVdpbm5lcignQUknKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnBsYXllcjFCb2FyZC5nZXRTcXVhcmVDb250ZW50KHNob3RMb2NhdGlvblswXSwgc2hvdExvY2F0aW9uWzFdKSA9PT1cbiAgICAgICdoaXQnXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5haUF0dGFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBsYXllcjFCb2FyZC5oaXRTcXVhcmUoc2hvdExvY2F0aW9uWzBdLCBzaG90TG9jYXRpb25bMV0pO1xuICAgICAgZG9tLmRyYXdBY3Rpb25Ub0JvYXJkKHtcbiAgICAgICAgYWN0aW9uOiAnc2hvdCcsXG4gICAgICAgIHRhcmdldDogJ29jZWFuJyxcbiAgICAgICAgcGxheWVyOiAnaHVtYW4nLFxuICAgICAgICB4OiBzaG90TG9jYXRpb25bMV0sXG4gICAgICAgIHk6IHNob3RMb2NhdGlvblswXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHdpbkNoZWNrZXIocGxheWVyKSB7XG4gICAgaWYgKHBsYXllciA9PT0gJ0FJJykge1xuICAgICAgaWYgKHRoaXMucGxheWVyMUJvYXJkLmlzQWxsTG9zdCgpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIyQm9hcmQuaXNBbGxMb3N0KCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnYW1lRXZlbnQoZXZlbnRPYmplY3QpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGFnZSA9PT0gJ2NvbWJhdCdcbiAgICAgID8gdGhpcy5jb21iYXRDb250cm9sbGVyKGV2ZW50T2JqZWN0KVxuICAgICAgOiB0aGlzLmN1cnJlbnRTdGFnZSA9PT0gJ3NoaXBQbGFjZW1lbnQnXG4gICAgICA/IHRoaXMucGxhY2VtZW50Q29udHJvbGxlcihldmVudE9iamVjdClcbiAgICAgIDogbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBkb20gfSBmcm9tICcuL3ZpZXcvZG9tJztcbmltcG9ydCB7IGV2ZW50cyB9IGZyb20gJy4vdmlldy9ldmVudGxpc3RlbmVycyc7XG5cbmRvbS5jcmVhdGVHYW1lYm9hcmRzKCk7XG5ldmVudHMuc3RhcnRMaXN0ZW5lcigpO1xuZXZlbnRzLm9yaWVudGF0aW9uTGlzdGVuZXIoKTtcbmV2ZW50cy5ncmlkTGlzdGVuZXIoJ2h1bWFuJyk7XG5ldmVudHMuZ3JpZExpc3RlbmVyKCdBSScpO1xuIiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcHMnO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uL2NvbnRyb2xsZXIvZ2FtZSc7XG5pbXBvcnQgeyBkb20gfSBmcm9tICcuLi92aWV3L2RvbSc7XG5cbmV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcihwbGF5ZXJUeXBlKSB7XG4gICAgdGhpcy5zdW5rU2hpcHMgPSAwO1xuICAgIHRoaXMuYm9hcmQgPSB0aGlzLmJvYXJkQ3JlYXRpb24oKTtcbiAgICB0aGlzLnBsYXllclR5cGUgPSBwbGF5ZXJUeXBlO1xuICAgIHRoaXMuc2hvdHMgPSBbXTtcbiAgICB0aGlzLnNoaXBBcnJheSA9IFtcbiAgICAgICdjYXJyaWVyJyxcbiAgICAgICdiYXR0bGVzaGlwJyxcbiAgICAgICdjcnVpc2VyJyxcbiAgICAgICdzdWJtYXJpbmUnLFxuICAgICAgJ2Rlc3Ryb3llcicsXG4gICAgXTtcbiAgfVxuICBib2FyZENyZWF0aW9uKCkge1xuICAgIGxldCBuZXdCb2FyZCA9IG5ldyBBcnJheSgxMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdCb2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgbmV3Qm9hcmRbaV0gPSBBcnJheS5mcm9tKCcwMTIzNDU2Nzg5Jyk7XG4gICAgfVxuICAgIHJldHVybiBuZXdCb2FyZDtcbiAgfVxuICAvLyBNZXRob2RzIHJlbGF0aW5nIHRvIGdhbWVib2FyZCAtIHRoZSBjb250ZW50IG9mIHNxdWFyZSBldGNcbiAgZ2V0U3F1YXJlQ29udGVudCh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRbeF1beV07XG4gIH1cbiAgc2V0U3F1YXJlQ29udGVudCh4LCB5LCBjb250ZW50KSB7XG4gICAgdGhpcy5ib2FyZFt4XVt5XSA9IGNvbnRlbnQ7XG4gIH1cbiAgaGl0U3F1YXJlKHgsIHkpIHtcbiAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIHJld29ya2VkIGFzIG5vdyBib2FyZCBpcyB1c2VkIHRvIHN0b3JlIFNoaXAgb2JqZWN0c1xuICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgfVxuICBnZXRGdWxsQm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQ7XG4gIH1cbiAgZ2V0U2hpcEFycmF5KCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBBcnJheTtcbiAgfVxuXG4gIC8vIFNoaXAgcHJvcGVydGllcyAtIGhvdyBtYW55IHN1bmsgc2hpcHMgLyBoYXZlIGFsbCBiZWVuIHN1bmtcbiAgc2hpcFdhc1N1bmsoKSB7XG4gICAgdGhpcy5zdW5rU2hpcHMgPSB0aGlzLnN1bmtTaGlwcyArIDE7XG4gIH1cbiAgZ2V0U3Vua1NoaXBzKCkge1xuICAgIHJldHVybiB0aGlzLnN1bmtTaGlwcztcbiAgfVxuICBpc0FsbExvc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3Vua1NoaXBzID09PSA1O1xuICB9XG5cbiAgLy8gVG8gYmUgdXNlZCBieSB0aGUgQUkgcGxheWVyIGZvciBzaGlwIHBsYWNlbWVudCBhbmQgc2hvb3R5IHRoaW5nc1xuICBnZXRSYW5kb21Db29yZGluYXRlcyhwbGFjZW1lbnQpIHtcbiAgICBsZXQgY29vcmRzID0gW107XG4gICAgbGV0IGkgPSAyO1xuICAgIHdoaWxlIChpID4gMCkge1xuICAgICAgbGV0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCkgKiAoOSAtIDApICsgMDtcbiAgICAgIGNvb3Jkcy5wdXNoKE1hdGgucm91bmQocmFuZG9tKSk7XG4gICAgICBpLS07XG4gICAgfVxuICAgIC8vIGFsbG93cyB0aGUgbWV0aG9kIHRvIGJlIHVzZWQgd2hlbiBwbGFjaW5nIHNoaXBzXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGNvb3JkcztcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlIGNhc2UgdG8gY2hlY2sgaWYgc2hvdHMgYXJyYXkgYWxyZWFkeSBjb250YWlucyB0aGUgZ2VuZXJhdGVkIG51bWJlclxuICAgIGlmIChcbiAgICAgIHRoaXMuc2hvdHMuc29tZSgoc2hvdFNxdWFyZSkgPT5cbiAgICAgICAgc2hvdFNxdWFyZS5ldmVyeSgoZGlnaXQsIGluZGV4KSA9PiBkaWdpdCA9PT0gY29vcmRzW2luZGV4XSlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgfVxuICAgIHRoaXMuc2hvdHMucHVzaChjb29yZHMpO1xuICAgIHJldHVybiBjb29yZHM7XG4gIH1cbiAgZ2V0UmFuZG9tT3JpZW50YXRpb24oKSB7XG4gICAgbGV0IG9yaWVudGF0aW9uQXJyYXkgPSBbXTtcbiAgICBsZXQgaSA9IDU7XG4gICAgd2hpbGUgKGkgPiAwKSB7XG4gICAgICBsZXQgcmFuZG9tID0gTWF0aC5yYW5kb20oKSAqICgxMCAtIDEpICsgMTtcbiAgICAgIGlmIChyYW5kb20gPj0gNSkgb3JpZW50YXRpb25BcnJheS5wdXNoKCd2ZXJ0aWNhbCcpO1xuICAgICAgZWxzZSBvcmllbnRhdGlvbkFycmF5LnB1c2goJ2hvcml6b250YWwnKTtcbiAgICAgIGktLTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWVudGF0aW9uQXJyYXk7XG4gIH1cblxuICAvLyBTaGlwcyAtIHBsYWNlbWVudCwgY2hlY2tpbmcgZm9yIHBvc3NpYmxlIGNvbGxpc2lvbnNcbiAgcGxhY2VTaGlwKFt4LCB5XSwgb3JpZW50YXRpb24sIHNoaXAsIHBsYXllclR5cGUpIHtcbiAgICBsZXQgbGVuZ3RoID0gc2hpcC5nZXRTcXVhcmVzKCk7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gW3gsIHldO1xuICAgIC8vIENoZWNrcyBmb3IgbGVnYWwgbW92ZXNcbiAgICAvLyBGb3IgQUkgbmV3IGNvb3JkaW5hdGVzIGFyZSBnZW5lcmF0ZWQgdW50aWwgYXBwcm9wcmlhdGUgb25lcyBhcmUgZm91bmRcbiAgICBpZiAoXG4gICAgICBwbGF5ZXJUeXBlID09PSAnQUknICYmXG4gICAgICAodGhpcy5sZWdhbE1vdmUoW3gsIHldLCBvcmllbnRhdGlvbiwgbGVuZ3RoKSA9PT0gZmFsc2UgfHxcbiAgICAgICAgdGhpcy5ub3RPY2N1cGllZChbeCwgeV0sIG9yaWVudGF0aW9uLCBsZW5ndGgpID09PSBmYWxzZSlcbiAgICApIHtcbiAgICAgIGxldCBuZXdDb29yZHMgPSB0aGlzLmdldFJhbmRvbUNvb3JkaW5hdGVzKHRydWUpO1xuICAgICAgcmV0dXJuIHRoaXMucGxhY2VTaGlwKG5ld0Nvb3Jkcywgb3JpZW50YXRpb24sIHNoaXAsIHBsYXllclR5cGUpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAvLyB0aGlzIHBhcnQgaXMgdXNlZCB0byBwcmV2ZW50IHRoZSBodW1hbiBwbGF5ZXIgdG8gbWFrZSBpbGxlZ2FsIHBsYWNlbWVudHNcbiAgICAgIHRoaXMubGVnYWxNb3ZlKFt4LCB5XSwgb3JpZW50YXRpb24sIGxlbmd0aCkgPT09IGZhbHNlIHx8XG4gICAgICB0aGlzLm5vdE9jY3VwaWVkKFt4LCB5XSwgb3JpZW50YXRpb24sIGxlbmd0aCkgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICBhbGVydCgnSWxsZWdhbCBtb3ZlJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIElmIGNvb3JkaW5hdGVzIGFyZSBBLU9LLCB3ZSBjb250aW51ZSB3aXRoIHBsYWNlbWVudFxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB3aGlsZSAobGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNldFNxdWFyZUNvbnRlbnQoY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdLCBzaGlwKTtcbiAgICAgICAgZG9tLmRyYXdBY3Rpb25Ub0JvYXJkKHtcbiAgICAgICAgICBhY3Rpb246ICdwbGFjZW1lbnQnLFxuICAgICAgICAgIHBsYXllcjogcGxheWVyVHlwZSxcbiAgICAgICAgICB4OiBjb29yZGluYXRlc1sxXSxcbiAgICAgICAgICB5OiBjb29yZGluYXRlc1swXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvb3JkaW5hdGVzWzBdKys7XG4gICAgICAgIGxlbmd0aC0tO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHdoaWxlIChsZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc2V0U3F1YXJlQ29udGVudChjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0sIHNoaXApO1xuICAgICAgICBkb20uZHJhd0FjdGlvblRvQm9hcmQoe1xuICAgICAgICAgIGFjdGlvbjogJ3BsYWNlbWVudCcsXG4gICAgICAgICAgcGxheWVyOiBwbGF5ZXJUeXBlLFxuICAgICAgICAgIHg6IGNvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgIHk6IGNvb3JkaW5hdGVzWzBdLFxuICAgICAgICB9KTtcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0rKztcbiAgICAgICAgbGVuZ3RoLS07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGxlZ2FsTW92ZShbeCwgeV0sIG9yaWVudGF0aW9uLCBsZW5ndGgpIHtcbiAgICBsZXQgbGFzdFNxdWFyZSA9IFt4LCB5XTtcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgbGFzdFNxdWFyZVswXSA9IGxhc3RTcXVhcmVbMF0gLSAxICsgbGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGxhc3RTcXVhcmVbMV0gPSBsYXN0U3F1YXJlWzFdIC0gMSArIGxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGxhc3RTcXVhcmVbMF0gPD0gOSAmJiBsYXN0U3F1YXJlWzFdIDw9IDkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbm90T2NjdXBpZWQoW3gsIHldLCBvcmllbnRhdGlvbiwgbGVuZ3RoKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHdoaWxlIChsZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFNxdWFyZUNvbnRlbnQoeCwgeSkgaW5zdGFuY2VvZiBTaGlwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHgrKztcbiAgICAgICAgbGVuZ3RoLS07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgd2hpbGUgKGxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3F1YXJlQ29udGVudCh4LCB5KSBpbnN0YW5jZW9mIFNoaXApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgeSsrO1xuICAgICAgICBsZW5ndGgtLTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhaVNoaXBQbGFjZW1lbnQoKSB7XG4gICAgbGV0IG9yaWVudGF0aW9uQXJyYXkgPSB0aGlzLmdldFJhbmRvbU9yaWVudGF0aW9uKCk7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCA1KSB7XG4gICAgICBsZXQgbmV4dFNoaXAgPSBuZXcgU2hpcCh0aGlzLnNoaXBBcnJheVtpXSk7XG4gICAgICB0aGlzLnBsYWNlU2hpcChcbiAgICAgICAgdGhpcy5nZXRSYW5kb21Db29yZGluYXRlcyh0cnVlKSxcbiAgICAgICAgb3JpZW50YXRpb25BcnJheVswXSxcbiAgICAgICAgbmV4dFNoaXAsXG4gICAgICAgICdBSSdcbiAgICAgICk7XG4gICAgICBpKys7XG4gICAgICBvcmllbnRhdGlvbkFycmF5LnNwbGljZSgwLCAxKTtcbiAgICB9XG4gIH1cblxuICBodW1hblNoaXBQbGFjZW1lbnQoZXZlbnRPYmplY3QpIHtcbiAgICBpZiAodGhpcy5zaGlwQXJyYXkubGVuZ3RoIDwgMSkge1xuICAgIH1cbiAgICBsZXQgbmV4dFNoaXAgPSBuZXcgU2hpcCh0aGlzLnNoaXBBcnJheVswXSk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wbGFjZVNoaXAoXG4gICAgICAgIFtldmVudE9iamVjdC55LCBldmVudE9iamVjdC54XSxcbiAgICAgICAgZXZlbnRPYmplY3Qub3JpZW50YXRpb24sXG4gICAgICAgIG5leHRTaGlwLFxuICAgICAgICBldmVudE9iamVjdC5wbGF5ZXJcbiAgICAgICkgPT09IGZhbHNlXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuc2hpcEFycmF5LnNwbGljZSgwLCAxKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAvKiB0aGlzLmJvYXJkID0gbmV3IEdhbWVib2FyZCh0aGlzLnR5cGUpOyAqL1xuICB9XG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5oZWFsdGggPSB0aGlzLmdldFNxdWFyZXMoKTtcbiAgICB0aGlzLnBsYWNlc1RoYXRUb29rSGl0cyA9IFtdO1xuICB9XG5cbiAgZ2V0U3F1YXJlcygpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAnY2FycmllcicpIHJldHVybiA1O1xuICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2JhdHRsZXNoaXAnKSByZXR1cm4gNDtcbiAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdjcnVpc2VyJykgcmV0dXJuIDM7XG4gICAgZWxzZSBpZiAodGhpcy50eXBlID09PSAnc3VibWFyaW5lJykgcmV0dXJuIDM7XG4gICAgZWxzZSBpZiAodGhpcy50eXBlID09PSAnZGVzdHJveWVyJykgcmV0dXJuIDI7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBnZXRIZWFsdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVhbHRoO1xuICB9XG5cbiAgaGl0KHksIHgpIHtcbiAgICBpZiAodGhpcy53YXNJdEFscmVhZHlIaXRUaGVyZSh5LCB4KSA9PT0gdHJ1ZSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmhlYWx0aCA+PSAxKSB0aGlzLmhlYWx0aCA9IHRoaXMuaGVhbHRoIC0gMTtcbiAgICB0aGlzLnBsYWNlc1RoYXRUb29rSGl0cy5wdXNoKFt5LCB4XSk7XG4gICAgcmV0dXJuIHRoaXMuaGVhbHRoO1xuICB9XG4gIHdhc0l0QWxyZWFkeUhpdFRoZXJlKHksIHgpIHtcbiAgICBsZXQgY29vcmRzID0gW3ksIHhdO1xuICAgIGlmIChcbiAgICAgIHRoaXMucGxhY2VzVGhhdFRvb2tIaXRzLnNvbWUoKHNob3RTcWFyZSkgPT5cbiAgICAgICAgc2hvdFNxYXJlLmV2ZXJ5KChkaWdpdCwgaW5kZXgpID0+IGRpZ2l0ID09PSBjb29yZHNbaW5kZXhdKVxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oZWFsdGggPT09IDA7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi9jb250cm9sbGVyL2dhbWUnO1xuaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSAnLi9ldmVudGxpc3RlbmVycyc7XG5leHBvcnQgY29uc3QgZG9tID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gY3JlYXRlR3JpZChib2FyZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDk7IGkrKykge1xuICAgICAgbGV0IGNvbHVtbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoJ2NvbHVtbicpO1xuICAgICAgY29sdW1uLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY29sdW1uKTtcbiAgICAgIGZvciAobGV0IGwgPSAwOyBsIDw9IDk7IGwrKykge1xuICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgY2VsbC5kYXRhc2V0LmluZGV4ID0gbDtcbiAgICAgICAgY29sdW1uLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUdhbWVib2FyZHMoKSB7XG4gICAgY29uc3QgaHVtYW5nYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtYW5nYW1lYm9hcmQnKTtcbiAgICBjb25zdCBhaWdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5haWdhbWVib2FyZCcpO1xuICAgIGNyZWF0ZUdyaWQoaHVtYW5nYW1lYm9hcmQpO1xuICAgIGNyZWF0ZUdyaWQoYWlnYW1lYm9hcmQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0FjdGlvblRvQm9hcmQoZHJhd09iamVjdCkge1xuICAgIGlmIChkcmF3T2JqZWN0LmFjdGlvbiA9PT0gJ3BsYWNlbWVudCcpIGRyYXdTaGlwKGRyYXdPYmplY3QpO1xuICAgIGlmIChkcmF3T2JqZWN0LmFjdGlvbiA9PT0gJ3Nob3QnKSBkcmF3U2hvdChkcmF3T2JqZWN0KTtcbiAgfVxuICBmdW5jdGlvbiBkcmF3U2hpcChkcmF3T2JqZWN0KSB7XG4gICAgbGV0IHBsYXllckJvYXJkID0gJ2h1bWFuZ2FtZWJvYXJkJztcbiAgICBpZiAoZHJhd09iamVjdC5wbGF5ZXIgPT09ICdBSScpIHJldHVybjtcbiAgICBpZiAoZHJhd09iamVjdC5wbGF5ZXIgPT09ICdodW1hbicpIHBsYXllckJvYXJkID0gJ2h1bWFuZ2FtZWJvYXJkJztcbiAgICBjb25zdCBjZWxsID0gY2VsbFNlbGVjdG9yKHBsYXllckJvYXJkLCBkcmF3T2JqZWN0KTtcbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdTaG90KGRyYXdPYmplY3QpIHtcbiAgICBsZXQgcGxheWVyQm9hcmQgPSAnaHVtYW5nYW1lYm9hcmQnO1xuICAgIGlmIChkcmF3T2JqZWN0LnBsYXllciA9PT0gJ0FJJykgcGxheWVyQm9hcmQgPSAnYWlnYW1lYm9hcmQnO1xuICAgIGlmIChkcmF3T2JqZWN0LnBsYXllciA9PT0gJ2h1bWFuJykgcGxheWVyQm9hcmQgPSAnaHVtYW5nYW1lYm9hcmQnO1xuICAgIGNvbnN0IGNlbGwgPSBjZWxsU2VsZWN0b3IocGxheWVyQm9hcmQsIGRyYXdPYmplY3QpO1xuXG4gICAgaWYgKGRyYXdPYmplY3QudGFyZ2V0ID09PSAnb2NlYW4nKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdE9jZWFuJyk7XG4gICAgfVxuICAgIGlmIChkcmF3T2JqZWN0LnRhcmdldCA9PT0gJ3NoaXAnKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdFNoaXAnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjZWxsU2VsZWN0b3IocGxheWVyQm9hcmQsIGRyYXdPYmplY3QpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGAuJHtwbGF5ZXJCb2FyZH0gLmNvbHVtbltkYXRhLWluZGV4PVwiJHtcbiAgICAgIGRyYXdPYmplY3QueFxuICAgIH1cIl0gLmNlbGw6bnRoLWNoaWxkKCR7ZHJhd09iamVjdC55ICsgMX0pYDtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIH1cblxuICBmdW5jdGlvbiBkZWNsYXJlV2lubmVyKHdpbm5lcikge1xuICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZycpO1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyJyk7XG4gICAgZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ2RpYWxvZ1Zpc2libGUnKTtcbiAgICB0ZXh0LmlubmVyVGV4dCA9IGBUaGUgd2lubmVyIGlzIHRoZSAke3dpbm5lcn1gO1xuICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICBldmVudHMucmVzZXRMaXN0ZW5lcigpO1xuICB9XG5cbiAgZnVuY3Rpb24gb3JpZW50YXRpb25EaXNwbGF5ZXIoKSB7XG4gICAgY29uc3Qgb3JpZW50YXRpb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9yaWVudGF0aW9uRGlzcGxheScpO1xuICAgIGlmIChvcmllbnRhdGlvbkRpc3BsYXkuaW5uZXJUZXh0ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIG9yaWVudGF0aW9uRGlzcGxheS5pbm5lclRleHQgPSAndmVydGljYWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmllbnRhdGlvbkRpc3BsYXkuaW5uZXJUZXh0ID0gJ2hvcml6b250YWwnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbWJhdERpc3BsYXllcigpIHtcbiAgICBjb25zdCBvcmllbnRhdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3JpZW50YXRpb25EaXNwbGF5Jyk7XG4gICAgb3JpZW50YXRpb25EaXNwbGF5LmlubmVyVGV4dCA9ICdDT01CQVQhIFNob290IGF3YXkhJztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlR2FtZWJvYXJkcyxcbiAgICBkcmF3QWN0aW9uVG9Cb2FyZCxcbiAgICBkZWNsYXJlV2lubmVyLFxuICAgIG9yaWVudGF0aW9uRGlzcGxheWVyLFxuICAgIGNvbWJhdERpc3BsYXllcixcbiAgfTtcbn0pKCk7XG4iLCJpbXBvcnQgeyBkb20gfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vY29udHJvbGxlci9nYW1lJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4uL21vZGVsL3BsYXllcic7XG5cbmV4cG9ydCBjb25zdCBldmVudHMgPSAoKCkgPT4ge1xuICBsZXQgaHVtYW5HcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWFuZ2FtZWJvYXJkJyk7XG4gIGxldCBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gIGxldCBuZXdHYW1lID0gdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIHN0YXJ0TGlzdGVuZXIoKSB7XG4gICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQnKTtcbiAgICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBuZXdHYW1lID09PSAnb2JqZWN0JykgcmV0dXJuO1xuICAgICAgbmV3R2FtZSA9IG5ldyBHYW1lKFxuICAgICAgICBuZXcgUGxheWVyKCdhbnRlcm8nLCAnaHVtYW4nKSxcbiAgICAgICAgbmV3IFBsYXllcignQm9iJywgJ0FJJylcbiAgICAgICk7XG4gICAgICBuZXdHYW1lLnN0YXJ0R2FtZUxvb3AoKTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBvcmllbnRhdGlvbkxpc3RlbmVyKCkge1xuICAgIGNvbnN0IG9yaWVudGF0aW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yaWVudGF0aW9uJyk7XG4gICAgb3JpZW50YXRpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIG9yaWVudGF0aW9uID0gb3JpZW50YXRpb24gIT09ICdob3Jpem9udGFsJyA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCc7XG4gICAgICBkb20ub3JpZW50YXRpb25EaXNwbGF5ZXIob3JpZW50YXRpb24pO1xuICAgICAgY29uc29sZS5sb2cob3JpZW50YXRpb24pO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGdyaWRMaXN0ZW5lcihwbGF5ZXIpIHtcbiAgICBsZXQgaHVtYW5HcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWFuZ2FtZWJvYXJkJyk7XG4gICAgbGV0IGFpR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5haWdhbWVib2FyZCcpO1xuICAgIGxldCBjb2x1bW5zID0gbnVsbDtcbiAgICBpZiAocGxheWVyID09PSAnaHVtYW4nKSB7XG4gICAgICBjb2x1bW5zID0gaHVtYW5HcmlkLmNoaWxkTm9kZXM7XG4gICAgfSBlbHNlIGNvbHVtbnMgPSBhaUdyaWQuY2hpbGROb2RlcztcblxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICBjb2x1bW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoc3F1YXJlKSA9PiB7XG4gICAgICAgIG5ld0dhbWUuZ2FtZUV2ZW50KHtcbiAgICAgICAgICBwbGF5ZXI6IHBsYXllcixcbiAgICAgICAgICB4OiBOdW1iZXIoc3F1YXJlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXgpLFxuICAgICAgICAgIHk6IE51bWJlcihzcXVhcmUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpLFxuICAgICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbixcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0TGlzdGVuZXIoKSB7XG4gICAgbGV0IHJlc2V0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2V0Jyk7XG4gICAgcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7IHN0YXJ0TGlzdGVuZXIsIG9yaWVudGF0aW9uTGlzdGVuZXIsIGdyaWRMaXN0ZW5lciwgcmVzZXRMaXN0ZW5lciB9O1xufSkoKTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogQ1NTIEhTTCAqL1xcbjpyb290IHtcXG4gIC0tc2t5LWJsdWU6IGhzbGEoMTk5LCA2NCUsIDczJSwgMSk7XFxuICAtLWJsdWUtZ3JlZW46IHJnYigyMiwgMTA4LCAxMjkpO1xcbiAgLS1wcnVzc2lhbi1ibHVlOiBoc2xhKDIwMCwgOTUlLCAxNCUsIDEpO1xcbiAgLS1zZWxlY3RpdmUteWVsbG93OiBoc2xhKDQzLCAxMDAlLCA1MSUsIDEpO1xcbiAgLS11dC1vcmFuZ2U6IGhzbGEoMzIsIDEwMCUsIDQ5JSwgMSk7XFxuICAtLWNvb2wtZ3JheTogaHNsYSgyMTgsIDE3JSwgNzIlKTtcXG4gIC0tZGVlcC1vcmFuZ2U6IHJnYigyMDEsIDU4LCAxNSk7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IHJvYm90bywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnT3BlbiBTYW5zJyxcXG4gICAgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbjogMDtcXG4gIGNvbG9yOiB2YXIoLS1zZWxlY3RpdmUteWVsbG93KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBydXNzaWFuLWJsdWUpO1xcbn1cXG5cXG5tYWluLFxcbmhlYWRlciB7XFxuICBtYXJnaW46IDIlO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDdweDtcXG59XFxuXFxuZGlhbG9nIHtcXG4gIHotaW5kZXg6IDEwO1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIHBhZGRpbmc6IDUlO1xcbiAgYmFja2dyb3VuZDogdmFyKC0tYmx1ZS1ncmVlbik7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbn1cXG5cXG5kaWFsb2c6OmJhY2tkcm9wIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGhzbGEoMCwgMCUsIDAlLCAwLjQwNCk7XFxufVxcblxcbi5kaWFsb2dWaXNpYmxlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uY29udHJvbHMsXFxuLmdhbWVib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50b3Age1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lYm9hcmQtY29udGFpbmVyIHtcXG4gIG1hcmdpbjogMiU7XFxufVxcblxcbi5odW1hbmdhbWVib2FyZCxcXG4uYWlnYW1lYm9hcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbn1cXG5cXG4uY29sdW1uIHtcXG4gIG1pbi13aWR0aDogMzBweDtcXG59XFxuXFxuLmNlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJ1c3NpYW4tYmx1ZSk7XFxuICBib3JkZXI6IDFweCBzb2xpZDtcXG4gIG1pbi1oZWlnaHQ6IDMwcHg7XFxufVxcblxcbi5jZWxsOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXV0LW9yYW5nZSk7XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJsdWUtZ3JlZW4pO1xcbn1cXG5cXG4uaGl0U2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kZWVwLW9yYW5nZSk7XFxufVxcblxcbi5oaXRPY2VhbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS11dC1vcmFuZ2UpO1xcbn1cXG5cXG4ub3JpZW50YXRpb25EaXNwbGF5IHtcXG4gIHBhZGRpbmctbGVmdDogMiU7XFxuICBwYWRkaW5nLXJpZ2h0OiAyJTtcXG4gIHBhZGRpbmctdG9wOiAxJTtcXG4gIHBhZGRpbmctYm90dG9tOiAxJTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbn1cXG5cXG4uaGVscCB7XFxuICBwYWRkaW5nLXRvcDogNSU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0LFxcbi5wbGFjZW1lbnQsXFxuLmNvbWJhdCB7XFxuICB3aWR0aDogNDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLFlBQVk7QUFDWjtFQUNFLGtDQUFrQztFQUNsQywrQkFBK0I7RUFDL0IsdUNBQXVDO0VBQ3ZDLDBDQUEwQztFQUMxQyxtQ0FBbUM7RUFDbkMsZ0NBQWdDO0VBQ2hDLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFO2dDQUM4QjtFQUM5QixTQUFTO0VBQ1QsOEJBQThCO0VBQzlCLHNDQUFzQztBQUN4Qzs7QUFFQTs7RUFFRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLDZCQUE2QjtFQUM3QixZQUFZO0VBQ1osbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxzQ0FBc0M7RUFDdEMsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBOzs7RUFHRSxVQUFVO0VBQ1Ysa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIENTUyBIU0wgKi9cXG46cm9vdCB7XFxuICAtLXNreS1ibHVlOiBoc2xhKDE5OSwgNjQlLCA3MyUsIDEpO1xcbiAgLS1ibHVlLWdyZWVuOiByZ2IoMjIsIDEwOCwgMTI5KTtcXG4gIC0tcHJ1c3NpYW4tYmx1ZTogaHNsYSgyMDAsIDk1JSwgMTQlLCAxKTtcXG4gIC0tc2VsZWN0aXZlLXllbGxvdzogaHNsYSg0MywgMTAwJSwgNTElLCAxKTtcXG4gIC0tdXQtb3JhbmdlOiBoc2xhKDMyLCAxMDAlLCA0OSUsIDEpO1xcbiAgLS1jb29sLWdyYXk6IGhzbGEoMjE4LCAxNyUsIDcyJSk7XFxuICAtLWRlZXAtb3JhbmdlOiByZ2IoMjAxLCA1OCwgMTUpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiByb2JvdG8sIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ09wZW4gU2FucycsXFxuICAgICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW46IDA7XFxuICBjb2xvcjogdmFyKC0tc2VsZWN0aXZlLXllbGxvdyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcnVzc2lhbi1ibHVlKTtcXG59XFxuXFxubWFpbixcXG5oZWFkZXIge1xcbiAgbWFyZ2luOiAyJTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBwYWRkaW5nOiA3cHg7XFxufVxcblxcbmRpYWxvZyB7XFxuICB6LWluZGV4OiAxMDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBwYWRkaW5nOiA1JTtcXG4gIGJhY2tncm91bmQ6IHZhcigtLWJsdWUtZ3JlZW4pO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG59XFxuXFxuZGlhbG9nOjpiYWNrZHJvcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2xhKDAsIDAlLCAwJSwgMC40MDQpO1xcbn1cXG5cXG4uZGlhbG9nVmlzaWJsZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLmNvbnRyb2xzLFxcbi5nYW1lYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4udG9wIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZ2FtZWJvYXJkLWNvbnRhaW5lciB7XFxuICBtYXJnaW46IDIlO1xcbn1cXG5cXG4uaHVtYW5nYW1lYm9hcmQsXFxuLmFpZ2FtZWJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBib3JkZXI6IDFweCBzb2xpZDtcXG59XFxuXFxuLmNvbHVtbiB7XFxuICBtaW4td2lkdGg6IDMwcHg7XFxufVxcblxcbi5jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBydXNzaWFuLWJsdWUpO1xcbiAgYm9yZGVyOiAxcHggc29saWQ7XFxuICBtaW4taGVpZ2h0OiAzMHB4O1xcbn1cXG5cXG4uY2VsbDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS11dC1vcmFuZ2UpO1xcbn1cXG5cXG4uc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ibHVlLWdyZWVuKTtcXG59XFxuXFxuLmhpdFNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGVlcC1vcmFuZ2UpO1xcbn1cXG5cXG4uaGl0T2NlYW4ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdXQtb3JhbmdlKTtcXG59XFxuXFxuLm9yaWVudGF0aW9uRGlzcGxheSB7XFxuICBwYWRkaW5nLWxlZnQ6IDIlO1xcbiAgcGFkZGluZy1yaWdodDogMiU7XFxuICBwYWRkaW5nLXRvcDogMSU7XFxuICBwYWRkaW5nLWJvdHRvbTogMSU7XFxuICBib3JkZXI6IDFweCBzb2xpZDtcXG59XFxuXFxuLmhlbHAge1xcbiAgcGFkZGluZy10b3A6IDUlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydCxcXG4ucGxhY2VtZW50LFxcbi5jb21iYXQge1xcbiAgd2lkdGg6IDQwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJQbGF5ZXIiLCJHYW1lYm9hcmQiLCJTaGlwIiwiZG9tIiwiR2FtZSIsImNvbnN0cnVjdG9yIiwicGxheWVyMSIsInBsYXllcjIiLCJwbGF5ZXIxQm9hcmQiLCJnZXRUeXBlIiwicGxheWVyMkJvYXJkIiwiY3VycmVudFN0YWdlIiwiY3VycmVudFBsYXllciIsImdldE5hbWUiLCJnZXRQbGF5ZXIxU3RhdHMiLCJnZXRQbGF5ZXIyU3RhdHMiLCJnZXRDdXJyZW50UGxheWVyIiwiZ2V0Q3VycmVudFN0YWdlIiwiY2hhbmdlVHVybiIsImhpdCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNoYW5nZUN1cnJlbnRTdGFnZSIsImNvbWJhdERpc3BsYXllciIsInN0YXJ0R2FtZUxvb3AiLCJhaVNoaXBQbGFjZW1lbnQiLCJwbGFjZW1lbnRDb250cm9sbGVyIiwiZXZlbnRPYmplY3QiLCJwbGF5ZXIiLCJnZXRTaGlwQXJyYXkiLCJodW1hblNoaXBQbGFjZW1lbnQiLCJjb21iYXRDb250cm9sbGVyIiwiaHVtYW5BdHRhY2siLCJnZXRTcXVhcmVDb250ZW50IiwieSIsIngiLCJkcmF3QWN0aW9uVG9Cb2FyZCIsImFjdGlvbiIsInRhcmdldCIsImlzU3VuayIsInNoaXBXYXNTdW5rIiwid2luQ2hlY2tlciIsImRlY2xhcmVXaW5uZXIiLCJhaUF0dGFjayIsImFsZXJ0IiwiaGl0U3F1YXJlIiwic2hvdExvY2F0aW9uIiwiZ2V0UmFuZG9tQ29vcmRpbmF0ZXMiLCJ3YXNJdEFscmVhZHlIaXRUaGVyZSIsImlzQWxsTG9zdCIsImdhbWVFdmVudCIsImV2ZW50cyIsImNyZWF0ZUdhbWVib2FyZHMiLCJzdGFydExpc3RlbmVyIiwib3JpZW50YXRpb25MaXN0ZW5lciIsImdyaWRMaXN0ZW5lciIsInBsYXllclR5cGUiLCJzdW5rU2hpcHMiLCJib2FyZCIsImJvYXJkQ3JlYXRpb24iLCJzaG90cyIsInNoaXBBcnJheSIsIm5ld0JvYXJkIiwiQXJyYXkiLCJpIiwiZnJvbSIsInNldFNxdWFyZUNvbnRlbnQiLCJjb250ZW50IiwiZ2V0RnVsbEJvYXJkIiwiZ2V0U3Vua1NoaXBzIiwicGxhY2VtZW50IiwiY29vcmRzIiwicmFuZG9tIiwiTWF0aCIsInB1c2giLCJyb3VuZCIsInNvbWUiLCJzaG90U3F1YXJlIiwiZXZlcnkiLCJkaWdpdCIsImluZGV4IiwiZ2V0UmFuZG9tT3JpZW50YXRpb24iLCJvcmllbnRhdGlvbkFycmF5IiwicGxhY2VTaGlwIiwiX3JlZiIsIm9yaWVudGF0aW9uIiwic2hpcCIsImdldFNxdWFyZXMiLCJjb29yZGluYXRlcyIsImxlZ2FsTW92ZSIsIm5vdE9jY3VwaWVkIiwibmV3Q29vcmRzIiwiX3JlZjIiLCJsYXN0U3F1YXJlIiwiX3JlZjMiLCJuZXh0U2hpcCIsInNwbGljZSIsIm5hbWUiLCJ0eXBlIiwiaGVhbHRoIiwicGxhY2VzVGhhdFRvb2tIaXRzIiwiZ2V0SGVhbHRoIiwic2hvdFNxYXJlIiwiY3JlYXRlR3JpZCIsImNvbHVtbiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImRhdGFzZXQiLCJhcHBlbmRDaGlsZCIsImwiLCJjZWxsIiwiaHVtYW5nYW1lYm9hcmQiLCJxdWVyeVNlbGVjdG9yIiwiYWlnYW1lYm9hcmQiLCJkcmF3T2JqZWN0IiwiZHJhd1NoaXAiLCJkcmF3U2hvdCIsInBsYXllckJvYXJkIiwiY2VsbFNlbGVjdG9yIiwic2VsZWN0b3IiLCJ3aW5uZXIiLCJkaWFsb2ciLCJ0ZXh0IiwiaW5uZXJUZXh0Iiwic2hvd01vZGFsIiwicmVzZXRMaXN0ZW5lciIsIm9yaWVudGF0aW9uRGlzcGxheWVyIiwib3JpZW50YXRpb25EaXNwbGF5IiwiaHVtYW5HcmlkIiwibmV3R2FtZSIsInN0YXJ0QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib3JpZW50YXRpb25CdXR0b24iLCJjb25zb2xlIiwibG9nIiwiYWlHcmlkIiwiY29sdW1ucyIsImNoaWxkTm9kZXMiLCJmb3JFYWNoIiwic3F1YXJlIiwiTnVtYmVyIiwicGFyZW50RWxlbWVudCIsInJlc2V0QnV0dG9uIiwibG9jYXRpb24iLCJyZWxvYWQiXSwic291cmNlUm9vdCI6IiJ9