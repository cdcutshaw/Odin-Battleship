import Ship from '../modules/ship';

describe ('Ship', () => {
    test('should have a length', () => {
        const ship = new Ship(3);
        expect(ship.length).toBe(3);
    });
});

