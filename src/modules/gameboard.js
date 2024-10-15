import {Ship} from '../modules/ship';

export class Gameboard {
    constructor () {
        this.ships = [];
        this.missedShots = [];
        this.hitCoordinates = [];
    }

    placeShip (ship, startCoord, direction) {
        let coordinates = [];
        const [x, y] = startCoord;

        for (let i =0; i < ship.length; i++) {
            if (direction == 'horizontal') {
                coordinates.push([x, y+i]);
            } else if (direction == 'vertical') {
                coordinates.push([x+i, y])
            }
        }
        this.ships.push({ship, coordinates});
    }

    receiveAttack(coord) {
        if(this.hitCoordinates.some(c => c[0] == coord[0] && c[1] == coord[1])) {
            return;
        };
        this.hitCoordinates.push(coord);

        let hitShip = this.ships.find(({coordinates}) => 
        coordinates.some(c => c[0] == coord[0] && c[1] == coord[1])
        );
        if(hitShip) {
            hitShip.ship.hit();
        } else {
            this.missedShots.push(coord);
        }
    }
    areAllShipsSunk() {
        return this.ships.every(({ship}) => ship.isSunk());
    }
}