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
