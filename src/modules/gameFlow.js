import {Player} from '../modules/player' ;
import {display} from '../modules/display' ;


export const gameFlow = (function () {
    let player1, player2, currentPlayer, gameOver;
    let currentDirection = 'horizontal'

    function initPageLoad() {
        
    player1 = new Player(true); //computer player
    player2 = new Player(false); //human player

    display.renderGameboard('player1')
    display.renderGameboard('player2')
    display.renderUnplacedShips('player1', player1.gameboard)
    display.renderUnplacedShips('player2', player2.gameboard)
    display.toggleBoard('player1', 'inactive'),
    display.toggleBoard('player2', 'inactive')

    }

    function initGame() {
        player1 = new Player(true); //computer player
        player2 = new Player(false); //human player

        currentPlayer = player1;

        initComputerShipPlacement();
        initHumanShipPlacement();
         
    }

    function initComputerShipPlacement() {
        player1.gameboard.placeShipsRandomly();
        display.renderGameboard('player1', player1.gameboard);
        display.renderUnplacedShips('player1', player1.gameboard)
        display.updateStatusMessage("Player 1 has placed thier ships. Player 2, select a ship to begin placement...")
        
    }

    function initHumanShipPlacement() {
        display.getShip((selectedShip) => {
            console.log(selectedShip)
            display.getCellData((selectedCoordinate) => {
                console.log(selectedCoordinate)
                display.getDirection((selectedDirection) => {
                    console.log(selectedDirection)

                    player2.gameboard.placeShip(selectedShip, selectedCoordinate, selectedDirection)
                    display.renderGameboard('player2', player2.gameboard)
                    display.renderUnplacedShips('player2', player2.gameboard)
                })
            })
        })
        

        
}

    function switchTurns() {

    }

    function takeTurn() {

    }

    function checkForGameOver() {

    }

    return {
        initPageLoad,
        initGame,
    }
})();