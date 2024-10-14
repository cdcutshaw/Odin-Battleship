import Ship from '../modules/ship';

describe ('Ship', () => {
    test('should have a length', () => {
        const ship = new Ship(3);
        expect(ship.length).toBe(3);
    });

    test('should include start with 0 hits', () => {
        const ship = new Ship(3);
        expect(ship.hits).toBe(0);
    }); 
    
    test('should not be sunk initially', () => {
        const ship = new Ship(3);
        expect(ship.isSunk()).toBe(false)
    });

    test('hit() should increase the hit count', () => {
        const ship = new Ship(3); 
        ship.hit();
        expect(ship.hits).toBe(1);
    });
     
    test('isSunk() should return true when hits = length', () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);

    });

    test('isSink() should return false when hits are < length', () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });

    test('hit() should not increase hits beyond lenght', () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.hits).toBe(2);


    })
});

