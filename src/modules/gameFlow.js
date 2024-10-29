import { Player } from '../modules/player';
import { display } from '../modules/display';
import { Ship } from './ship';

export const gameFlow = (function () {
    let player1, player2, currentPlayer, gameOver;

    // INITIALIZATION FUNCTIONS
    function initPageLoad() {
        display.updateStatusMessage('');
        player1 = new Player(true);  // opponent(computer)
        player2 = new Player(false); // human player

        display.renderGameboard('player1');
        display.renderGameboard('player2');
        display.renderUnplacedShips('player1', player1.gameboard);
        display.renderUnplacedShips('player2', player2.gameboard);
        display.toggleBoard('player1', 'inactive');
        display.toggleBoard('player2', 'inactive');
    }

    async function initGame() {
        display.updateStatusMessage("Please select a ship to begin placement");
        await initComputerShipPlacement();
        await initHumanShipPlacement('manual'); 

        currentPlayer = player1;
        takeTurnPlayer1();
    }

    // SHIP PLACEMENT FUNCTIONS
    function initComputerShipPlacement() {
        return new Promise((resolve) => {
            player1.gameboard.placeShipsRandomly();
            display.renderGameboard('player1', player1.gameboard);
            display.renderUnplacedShips('player1', player1.gameboard);
            setTimeout(() => resolve(), 1000);  
        });
    }

    function initHumanShipPlacement(version) {
        return new Promise((resolve) => {
            if (version === 'manual') {
                if (player2.gameboard.shipsToPlace.length === 0) {
                    finalizePlacement();
                    setTimeout(() => resolve(), 1000);
                    return;
                }
        
                display.getShip((shipData) => {
                    const selectedShip = new Ship(shipData.name, shipData.length); 
                    display.getCellData((selectedCoordinate) => {
                        display.getDirection((selectedDirection) => {
                            player2.gameboard.placeShip(selectedShip, selectedCoordinate, selectedDirection);
                            display.renderGameboard('player2', player2.gameboard);
                            display.renderUnplacedShips('player2', player2.gameboard);
                            display.toggleBoard('player2', 'inactive');
                            display.updateStatusMessage('Select your next ship...');

                            initHumanShipPlacement('manual').then(resolve);
                        });
                    });
                });
            //Option to add in functionality to allow player to choose randomized placemenmt in future implementation
            } else if (version === 'random') {
                display.updateStatusMessage("Player 2 ships are being placed...");
                player2.gameboard.placeShipsRandomly();
                display.renderGameboard('player2', player2.gameboard);
                display.renderUnplacedShips('player2', player2.gameboard);
                resolve();
            }
        });
    }

    function finalizePlacement() {
        display.toggleBoard('player2', 'inactive');
        display.clearCellListeners();
        display.updateStatusMessage("All Ships have been placed. Let the Game Begin!");
    }

    // TURN FUNCTIONS
    function takeTurnPlayer1() {
        if (gameOver) return;
        display.updateStatusMessage("Opponent's turn to strike");
        currentPlayer.makeAttack(player2.gameboard);
        display.renderGameboard('player2', player2.gameboard);
        checkForGameOver();

        if (!gameOver) {
            switchTurns();
        }
    }
    
    function takeTurnPlayer2() {
        if (gameOver) return;
        display.updateStatusMessage("Your turn to strike");
        
        display.getCellData((selectedCoordinate) => {
            currentPlayer.makeAttack(player1.gameboard, selectedCoordinate);
            display.renderGameboard('player1', player1.gameboard);
            checkForGameOver();

            if (!gameOver) {
                switchTurns();
            }
        });
    }

    // GAME CONTROL FUNCTIONS
    function switchTurns() {
        if (currentPlayer === player1) {
            display.toggleBoard('player1', 'active');
            display.toggleBoard('player2', 'inactive');
            currentPlayer = player2;
        } else {
            display.toggleBoard('player2', 'active');
            display.toggleBoard('player1', 'inactive');
            currentPlayer = player1;
        }

        setTimeout(() => {
            currentPlayer === player1 ? takeTurnPlayer1() : takeTurnPlayer2();
        }, 1000); 
    }

    function checkForGameOver() {
        if (player1.gameboard.areAllShipsSunk()) {
            gameOver = true;
            display.renderGameOver('player2');
        } else if (player2.gameboard.areAllShipsSunk()) {
            gameOver = true;
            display.renderGameOver('player1');
        }
    }

    return {
        initPageLoad,
        initGame,
    };
})();
