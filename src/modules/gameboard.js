import {Ship, SHIP_TYPES} from '../modules/ship'; 

export class Gameboard {
    constructor () {
        this.shipsToPlace = Object.values(SHIP_TYPES)
        this.ships = [];
        this.missedShots = [];
        this.hitCoordinates = [];
    }

    placeShip(ship, startCoord, direction) {

        if (this.ships.some(placedShip => placedShip.ship.name === ship.name)) {
            
            return false;        }
        
        if (!this.isValidPlacement(startCoord, ship.length, direction)) {
            throw new Error('Invalid ship placement: out of bounds or overlapping.');  // Return false or throw an error if placement is invalid
        }
        
        let coordinates = this.generateShipCoordinates(startCoord, ship.length, direction);

        this.ships.push({ ship, coordinates });
        
         // Remove the placed ship from shipsToPlace
        this.shipsToPlace = this.shipsToPlace.filter(shipType => shipType.name !== ship.name);
    

        return true;  
    }


    placeShipsRandomly () {
         

        this.shipsToPlace.forEach(shipType => {
            let placed = false;

            while(!placed) {
                const randomCoord = this.getRandomCoordinates();
                const randomDirection = this.getRandomDirection();

                if (this.isValidPlacement(randomCoord, shipType.length, randomDirection)) {
                    const coordinates = this.generateShipCoordinates(randomCoord, shipType.length, randomDirection);
                    this.placeShip(new Ship(shipType.name, shipType.length), randomCoord, randomDirection);
                    placed = true;
                  }
            }
        });  
    }

    getRandomCoordinates() {
        return[Math.floor(Math.random() * 10), Math.floor(Math.random() * 10) ]
    }

    getRandomDirection() {
        return Math.random() < 0.5 ? 'horizontal' : 'vertical';
    }

    isValidPlacement(coord, shipLength, direction) {
        const [x, y] = coord;
      
        // Check boundaries
        if (direction === 'horizontal') {
          if (y + shipLength > 10) return false; 
        } else if (direction === 'vertical') {
          if (x + shipLength > 10) return false;
        }
      
        // Check for overlap with other ships
        const proposedCoordinates = this.generateShipCoordinates(coord, shipLength, direction);
        for (let ship of this.ships) {
          for (let shipCoord of ship.coordinates) {
            for (let proposedCoord of proposedCoordinates) {
              if (shipCoord[0] === proposedCoord[0] && shipCoord[1] === proposedCoord[1]) {
                return false; 
              }
            }
          }
        }
      
        return true; 
      }

    generateShipCoordinates(coord, shipLength, direction) {
        const [x, y] = coord;
        const coordinates = [];

        for (let i = 0; i < shipLength; i++) {
            if (direction === 'horizontal') {
            coordinates.push([x, y + i]); 
            } else if (direction === 'vertical') {
            coordinates.push([x + i, y ]); 
            }
        }

            return coordinates;
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
