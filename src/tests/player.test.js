import { Player } from '../model/player';

describe('Player: test for returning name and type', () => {
  test('Player name is returned as expected', () => {
    const newPlayer = new Player('antero', 'human');
    expect(newPlayer.getName()).toBe('antero');
  });
  test('Player type is returned as expected', () => {
    const newPlayer = new Player('antero', 'human');
    expect(newPlayer.getType()).toBe('human');
  });
});
