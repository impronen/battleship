import { Player } from '../model/player';

describe('Player: tests for things related to shots', () => {
  test('Shots array is returned as it should be', () => {
    const newPlayer = new Player('antero', 'human');
    newPlayer.saveShot([1, 1]);
    newPlayer.saveShot([5, 3]);
    expect(newPlayer.checkShots()).toStrictEqual([
      [1, 1],
      [5, 3],
    ]);
  });
});

describe('Player: AI functionality', () => {
  test('Random coordinates are produced', () => {
    const newPlayer = new Player('BOB', 'AI');
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    newPlayer.getRandomCoordinates();
    expect(newPlayer.checkShots().length).toBe(16);
  });
});
