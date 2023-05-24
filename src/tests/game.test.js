import { Game } from '../controller/game';
import { Player } from '../model/player';

describe('Game: all class instances are created', () => {
  test('Human player is generated', () => {
    const newGame = new Game(
      new Player('antero', 'human'),
      new Player('Bob', 'AI')
    );
    expect(newGame.getPlayer1Stats()).toStrictEqual(['human', 'antero']);
  });
  test('AI player is generated', () => {
    const newGame = new Game(
      new Player('antero', 'human'),
      new Player('Bob', 'AI')
    );
    expect(newGame.getPlayer2Stats()).toStrictEqual(['AI', 'Bob']);
  });
  test('Human players gameboard is generated', () => {});
  test('AI players gameboard is generated', () => {});
});

describe('Game: turns are changed appropriately', () => {
  test('turn is changed if a no ship is hit HUMAN => AI', () => {
    const newGame = new Game(
      new Player('antero', 'human'),
      new Player('Bob', 'AI')
    );
    newGame.changeTurn();
    expect(newGame.getCurrentPlayer()).toBe('Bob');
  });
  test('turn is changed if a no ship is hit AI => HUMAN', () => {
    const newGame = new Game(
      new Player('antero', 'human'),
      new Player('Bob', 'AI')
    );
    newGame.changeTurn();
    newGame.changeTurn();
    expect(newGame.getCurrentPlayer()).toBe('antero');
  });
});
