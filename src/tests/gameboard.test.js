import { Gameboard } from '../modules/gameboard';
import { Ship, SHIP_TYPES } from '../modules/ship';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('should be able to place Ships at specific coordinates of gameboard', () => {
    const ship = new Ship('ship 1', 3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.ships).toContainEqual({
      ship: ship,
      coordinates: [[0, 0], [0, 1], [0, 2]],
    });
  });

  test('receiveAttack() should determine if a pair of coordinates hit a ship then call hit() on that ship', () => {
    const ship = new Ship('ship 1', 3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.receiveAttack([0, 1]);
    expect(ship.hits).toBe(1);
  });

  test('receiveAttack() should record coordinates of missed attacks', () => {
    gameboard.receiveAttack([5, 5]);
    expect(gameboard.missedShots).toContainEqual([5, 5]);
  });

  test('should not hit the same spot twice', () => {
    gameboard.receiveAttack([5, 5]);
    gameboard.receiveAttack([5, 5]);
    expect(gameboard.missedShots).toHaveLength(1);
  });

  test('should report if all ships are sunk', () => {
    const ship1 = new Ship('ship 1', 2);
    const ship2 = new Ship('ship 1', 2);
    gameboard.placeShip(ship1, [0, 0], 'horizontal');
    gameboard.placeShip(ship2, [2, 2], 'vertical');

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([2, 2]);
    gameboard.receiveAttack([3, 2]);

    expect(gameboard.areAllShipsSunk()).toBe(true);
  });

  test('should report if all ships are not sunk', () => {
    const ship1 = new Ship('ship 1', 2);
    const ship2 = new Ship('ship 1', 2);
    gameboard.placeShip(ship1, [0, 0], 'horizontal');
    gameboard.placeShip(ship2, [2, 2], 'vertical');

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([2, 2]);

    expect(gameboard.areAllShipsSunk()).toBe(false);
  });

  test('placeShip() should work with SHIP_TYPES', () => {
    const carrier = new Ship(SHIP_TYPES.cruiser.name, SHIP_TYPES.cruiser.length);
    gameboard.placeShip(carrier, [0, 0], 'horizontal');

    expect(gameboard.ships).toContainEqual({
      ship: carrier,
      coordinates: [[0, 0], [0, 1], [0, 2]],
    });
  });

  test('placeShipsRandomly() should place the correct number of ships', () => {
    gameboard.placeShipsRandomly();
    expect(gameboard.ships.length).toBe(Object.keys(SHIP_TYPES).length);
  });

  test('placeShip() should throw an error for invalid placement', () => {
    const ship = new Ship('ship 1', 3);
    expect(() => {
      gameboard.placeShip(ship, [0, 0], 'horizontal'); 
      gameboard.placeShip(ship, [0, 1], 'vertical');
    }).toThrow('Invalid ship placement: out of bounds or overlapping.');
  });

  
  test('placeShip() should throw an error if placing out of bounds', () => {
    const ship = new Ship('ship 1', 3);
    expect(() => {
      gameboard.placeShip(ship, [0, 9], 'vertical'); 
    }).toThrow('Invalid ship placement: out of bounds or overlapping.');
  });

  test('should not register a hit or miss when attacking the same spot twice', () => {
   const ship = new Ship('ship 1', 3);
   gameboard.placeShip(ship, [0, 0], 'horizontal');
   gameboard.receiveAttack([0, 0]);
   const hitCount = ship.hits;
   gameboard.receiveAttack([0, 0]);
   expect(ship.hits).toBe(hitCount); 
   expect(gameboard.hitCoordinates).toHaveLength(1);
 });

 
});