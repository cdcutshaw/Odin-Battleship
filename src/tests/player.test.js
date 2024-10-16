import {Player} from '../modules/player' ;
import {Gameboard} from '../modules/gameboard' ;
import {Ship} from '../modules/ship';

describe('Player', () => {
    let humanPlayer;
    let computerPlayer;
    let opponentGameboard;

    beforeEach(() => {
        humanPlayer = new Player(false);
        computerPlayer = new Player(true);
        opponentGameboard = new Gameboard();

        const ship = new Ship(3);
        opponentGameboard.placeShip(ship, [0,0], 'horizontal');
    });

    test('should initialize with a Gameboard', () => {
        expect(humanPlayer.gameboard).toBeInstanceOf(Gameboard);
        expect(computerPlayer.gameboard).toBeInstanceOf(Gameboard);
    });

    test('should throw an error if isComputer is not a boolean', () => {
        expect(() => new Player("yes")).toThrow('isComputer must be a boolean');
        expect(() => new Player(1)).toThrow('isComputer must be a boolean');
        expect(() => new Player(null)).toThrow('isComputer must be a boolean');
      });

    test('should correctly identify as computer or human', () => {
        expect(humanPlayer.isComputer).toBe(false);
        expect(computerPlayer.isComputer).toBe(true);
    });

    test('human player should make an attack with provided coordinates', () =>{
        const coord = [0, 0];
        humanPlayer.makeAttack(opponentGameboard, coord);
        const attacked = opponentGameboard.hitCoordinates.some(
            (c) => c[0] === coord[0] && c[1] === coord[1]
          );
        expect(attacked).toBe(true);
    });

    test('computer player should make a random, valid attack', () => {
        computerPlayer.randomMove = jest.fn().mockReturnValue([1,1]);

        computerPlayer.makeAttack(opponentGameboard);
        expect(computerPlayer.randomMove).toHaveBeenCalled();
        const attacked = opponentGameboard.hitCoordinates.some(
            (c) => c[0] === 1 && c[1] === 1
        );
        expect(attacked).toBe(true);
    });

    test('compute player should not attack the same coordinate twice', () => {
        computerPlayer.randomMove = jest
            .fn()
            .mockReturnValueOnce([2, 2])
            .mockReturnValueOnce([2, 2]);
           
            computerPlayer.makeAttack(opponentGameboard);
            computerPlayer.makeAttack(opponentGameboard);

            const attacks = opponentGameboard.hitCoordinates.filter((c) => c[0] == 2 && c[1] ==2);
            expect(attacks).toHaveLength(1);
    });

    test('computer player should generate random valid coordinates', () => {
        const move = computerPlayer.randomMove();
        expect(move).toHaveLength(2);
        expect(move[0]).toBeGreaterThanOrEqual(0);
        expect(move[0]).toBeLessThan(10); 
        expect(move[1]).toBeGreaterThanOrEqual(0);
        expect(move[1]).toBeLessThan(10);
      });
})