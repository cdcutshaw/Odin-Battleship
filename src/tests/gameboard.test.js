import {Gameboard} from '../modules/gameboard' ;
import {Ship} from '../modules/ship'

describe('Gameboard', () => {
    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('should be able to place Ships at specific coordinates of gameboard', () => {
        const ship = new Ship(3);
        gameboard.placeShip(ship, [0,0], 'horizontal');
        expect(gameboard.ships).toContainEqual({
            ship: ship,
            coordinates:[[0,0], [0,1], [0,2]],
        });
    });
     test('receiveAttack() should determine if a pair of coordinates hit a ship then call hit() on that ship', () =>{
        const ship = new Ship(3);
        gameboard.placeShip(ship, [0,0], 'horizontal');
        gameboard.receiveAttack([0,1]);
        expect(ship.hits).toBe(1);
     });

     test('receiveAttack() should record coordinates of missed attacks', () => {
        gameboard.receiveAttack([5,5]); 
        expect(gameboard.missedShots).toContainEqual([5,5]);
     });

     test('should not hit the same spot twice', () => {
        gameboard.receiveAttack([5,5]); 
        gameboard.receiveAttack([5,5]); 
        expect(gameboard.missedShots).toHaveLength(1);
     });

     test('should report if all ships are sunk', () => {
        const ship1 =  new Ship(2);
        const ship2 = new Ship(2);
        gameboard.placeShip(ship1, [0,0], 'horizontal');
        gameboard.placeShip(ship2, [2,2], 'vertical');
        
        gameboard.receiveAttack([0,0]);
        gameboard.receiveAttack([0,1]);
        gameboard.receiveAttack([2,2]);
        gameboard.receiveAttack([3,2]);

        expect(gameboard.areAllShipsSunk()).toBe(true);
     });
     test('should report if all ships are not sunk', () => {
        const ship1 =  new Ship(2);
        const ship2 = new Ship(2);
        gameboard.placeShip(ship1, [0,0], 'horizontal');
        gameboard.placeShip(ship2, [2,2], 'vertical');
        
        gameboard.receiveAttack([0,0]);
        gameboard.receiveAttack([0,1]);
        gameboard.receiveAttack([2,2]);
        

        expect(gameboard.areAllShipsSunk()).toBe(false);
     });
})