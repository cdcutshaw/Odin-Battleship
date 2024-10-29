import {Gameboard} from '../modules/gameboard' ;

export class Player  {
    constructor (isComputer) {
        if(typeof isComputer !== 'boolean') {
            throw new Error ('isComputer must be a boolean');
        }

        this.isComputer = isComputer;
        this.gameboard = new Gameboard();
        this.previousMoves = [];
    }

    makeAttack(opponentGameboard, coord = null) {
        if(this.isComputer) {
            coord = this.randomMove(opponentGameboard)
        };

        if(coord) {
            opponentGameboard.receiveAttack(coord); 
        }
    }

    randomMove(opponentGameboard) {
        let x, y, coord;

        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            coord = [x, y];
        }
        while (
            this.previousMoves.some((c) => c[0] == coord[0] && c[1] ==  coord[1])
        );
        return coord;
    }
}