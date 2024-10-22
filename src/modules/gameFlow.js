import {Player} from '../modules/player' ;
import {SHIP_TYPES} from '../modules/ship' ;
import {display} from '../modules/display' ;


export const gameFlow = (function () {
    let player1, player2, currentPlayer, gameOver;

    function initGame() {
        player1 = new Player(true); //computer player
        player2 = new Player(false); //human player

        currentPlayer = player1;

        player1.gameboard.placeShipsRandomly();
        display.renderGameboard('player1', player1.gameboard);
    }

    function switchTurns() {

    }

    function takeTurn() {

    }

    function checkForGameOver() {

    }

    return {
        initGame,
    }
})();