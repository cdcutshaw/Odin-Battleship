export const setupTest = "testsss";

export const SHIP_TYPES = {
    carrier: { name: 'Carrier', length: 5 },
    battleship: { name: 'Battleship', length: 4 },
    cruiser: { name: 'Cruiser', length: 3 },
    submarine: { name: 'Submarine', length: 3 },
    destroyer: { name: 'Destroyer', length: 2 }
  };

export class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = 0;
    }

    hit() {
        if (this.hits < this.length) {
            this.hits += 1;
        }
    }

    isSunk() {
        if (this.hits >= this.length) {
            return true;
        }
        else return false;
    }
}



