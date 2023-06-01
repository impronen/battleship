# Battleship

## Initial planning 17/05/2023

### What you need to be doing?

Components will be

- ship(s)
- gameboard (one for each player)
- game loop controller
- interface / DOM controller
- DOM element creator

### Ship

Properties it needs

- type of ship
- how many tiles it takes
- coordinate storage for placement (or this could be a property of the gameboard, more thought on this)
- orientation
- hit counter
- isSunk() which takes in how many tiles and how many hits

Tests for ship class

- square number
- name
- health
- sunk when health is zero
- health doesn't go down after sinking
- ship isn't sunk when health is above zero

### Gameboard

Properties it needs

- placeShip (takes in coordinates, ship type and orientation) - needs to check if from that point there is board left & squares aren't occupied
- hasItBeenShot - receives coordinates and checks if those have been shot already
- receiveAttack - which takes in coordinates, checks if there is a ship there, sends a signal to the ship to decrease health, marks those coordinates as "shot" (an array?)
- isAllLost - checks if all ships have been sunk, for this just have a sunkships counter

### Game loop

1. both players set their ships (have a variable to store if the ship is horizontal or vertical)
2. turn based combat, each player takes a turn and and has 1 shot to opponent's board
3. after a shot, DOM handles if the shot was a hit
4. state of board and ship is saved, if ship health is 0 it is removed from players ship list
5. if hit was detected, the next turn is also for the same player unless the enemy's ship count is zero in which case the current player is declared a winner

---

### Where we at - 28/05/2023

Currently the start game creates a new instance of game and passes in the players, which is first in the state of ship setting. Few ways I could do this - the AI ship setting could be done automatically and then have a function for controlling what is triggered by a click on the gameboard - we probably need to separate the creation of the grids so that they have different classes or some identifier - this way I can then have the event listener trigger a different action based on a) game state and b) which players grid was clicked.

Next: trace the differences of actions between the grids - what happens in _players_ grid vs what happens in the AI grid. Then build the controller that can then call the different methods and listen to the state - this could be done with a while loop, where the game state is listened and have the final stage of game loop be "win" => then the controller declares a winner.

### AI ship placement algo

1. generate an array of random orientations and push them to array
2. place ship types to an simple array so they are accessible
3. iterate through said array on a while loop and pick up the ship type and run Gameboard.placeShip with Player.getRandomCoordinates() passed in as the xy array, orientation array content as middle parameter and ship type array as third

### Human ship placement algo

How to go about testing the game loop?

- build a test where the turn is changed and have a mock value to be passed as the hit = true

---

### QUESTION

Question time for Antero's Battleship woes...

I have been unable to comprehend why some of the methods in my Gameboard class don't work. The class instance is initialized like this:

```js
class Gameboard {
    this._sunkShips = 0;
    this._board = Array(10).fill(Array(10).fill(null));
  }
}
```

So we have a 2D array for my board.
And then we have the troubling method:

```js
  setSquareContent(x, y, content) {
    this._board[x][y] = content;
  }
```

To give context, this method, is used in another method, where x = 1, y = 5 and ship is an ship object that I want to place to the coordinates:

```js
  placeShip([x, y], orientation, ship) {
    let length = ship.getSquares();
    let type = ship.getType();
    let coordinates = [x, y];
    console.log(typeof type);
    // Checks for legal move (ship will be in the grid + no ships in there)
    if (this.legalMove([x, y], orientation, length) === false) {
      console.log('error outside');
      return 'ERROR - outside the board!';
    }
    if (this.isOccupied([x, y], orientation, length) === true) {
      console.log('error occupied');
      return 'ERROR - there be ships there already';
    }
    // We continue with placement
    if (orientation === 'horizontal') {
      console.log('horizontal placement underway');
      while (length > 0) {
        this.setSquareContent(coordinates[0], coordinates[1], ship.type);
        console.log(coordinates[0], coordinates[1]);
        console.log(this.getSquareContent(x, y));
        console.table(this._board);
        coordinates[1]++;
        length--;
      }
    } else if (orientation === 'vertical') {
      console.log('vertical placement underway');
      while (length > 0) {
        this.setSquareContent([x, y], ship);
        y--;
        length--;
      }
    }
  }
```

The result is that in my 2D array all squares in the column indicated (starting from 5) are filled with the ship name/type. This is confusing as my thinking is that the variable for y axis would guide the setting. It does work perfectly as expected in another method, where I return the passed in coordinate:

```js
 getSquareContent(x, y) {
    return this._board[x][y];
  }
```

I have fiddled with different ways of passing the coordinates in, having them in an array and as single variables but either the method breaks completely or results in the same, faulty result. I'm not sure how to google this or where to go from here, so any and all guidance is appreciated.

**This issue was result of weirdness with fill() method, which caused the same instance of null to be spread about to all the squares**

---

## State of the ship 30/05/2023

Ship placement for AI is working, kinda. The legalMove() method appears to be faulty, as sometimes ships are placed outside of the board. I have not yet found any other possible bugs

Tomorrows task: try to figure out how to make legalMove() work. Also if either legalMove() or isOccupied() return errors, the AI player will be one ship short of the normal amount. This needs to be done with some kind of exeption handling. See if you can listen to a error returning inside the method when it is called, so it bubbles back upwards and causes a new set of coordinates to be selected until situation is satisfactory.

---

### Question time 1/6/2023

Question about accessing methods between classes. Again we are talking about my battleship.

My stuff is currently organized in the following manner:

At the game start, an instance of Game class is created.

```js
class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentStage = 'shipPlacement';
    this.currentPlayer = this.player1.getName();
  }
}
```

I feed instances of Player to this constructor, which in turn create instances of Gameboard class for each player. So we have a kind of a nesting doll type of structure, where class instances are passed in to constructors successively.

```js
const newGame = new Game(
  new Player('antero', 'human'),
  new Player('Bob', 'AI')
);
```

and

```js
class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
    this.shots = [];
    this.board = new Gameboard(this.type);
  }
```

Now I currently have a method getRandomCoordinates(), which return an array of five coordinates that are inside the board. The array is used inside the Gameboard for AI ship placement, it's iterated over to place all needed ships. For each ship, this method calls in 2 other methods from inside the Gameboard to check if the move is a legal (ie. ship can fit the grid) and no ships are placed on the squares yet.

And with all that out of the way, herein lies the problem. If a coordinate is faulty, I need to get a new pair and rerun the check to these new coordinates until we have one where the coordinates pass the test.

So I import my Player class to the Gameboard module. But... When I try to invoke the method from inside Player, I get a TypeError - getRandomCoordinates() is not a function. I have tried to establish a inheritance relation between these classes with extend but for some reason, this also produces an error when my code is run - this error says that Player cannot be accessed before initialization.

While placing and random number generator inside the Gameboard won't be a big deal, I don't want to do it as I've already got one and redundancy and all that. There is also a sneaking suspicion that the cause for this behaviour is something I should probably be aware anyway.

So: what the heck and why?

The whole repo is here <https://github.com/impronen/battleship> and I'll gladly share more examples / bits of the code etc.

**Idea from Discord**: Have you considered to let the Game class to be responsible for each board?
I'm not sure that players need to manage the copy of their board, it also can help with the decoupling.
