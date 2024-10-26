import {Player} from '../modules/player' ;
import {display} from '../modules/display' ;


export const gameFlow = (function () {
    let player1, player2, currentPlayer, gameOver;

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

    async function initGame() {
        player1 = new Player(true); //computer player
        player2 = new Player(false); //human player


        await initComputerShipPlacement();
        initHumanShipPlacement('random');

        await display.updateStatusMessage("All Ships have been placed. Let the Game Begin!");
        currentPlayer = player1
        takeTurnPlayer1()
    }

    function initComputerShipPlacement() {
        return new Promise((resolve) => {
            display.updateStatusMessage("Player 1 is placing thier Ships...");
            player1.gameboard.placeShipsRandomly();
            display.renderGameboard('player1', player1.gameboard);
            display.renderUnplacedShips('player1', player1.gameboard)
            
            
            setTimeout(() => resolve(), 4000);
        })
            
    }

    function initHumanShipPlacement(version) {
        
        if (version == 'manual') {
            if (player2.gameboard.shipsToPlace.length === 0) {
            
                display.toggleBoard('player2', 'inactive');
                return;
            }
    
            display.getShip((selectedShip) => {
                display.getCellData((selectedCoordinate) => {
                    display.getDirection((selectedDirection) => {
                        
                        player2.gameboard.placeShip(selectedShip, selectedCoordinate, selectedDirection)
                        
                        display.renderGameboard('player2', player2.gameboard)
                        display.renderUnplacedShips('player2', player2.gameboard)
                        display.toggleBoard('player2', 'inactive')
                        display.updateStatusMessage('select your next ship...')
                        initHumanShipPlacement('manual');
                    })
                })
            }) 
        } else if (version == 'random') {
            display.updateStatusMessage("Player 2 ships are being placed...");
            player2.gameboard.placeShipsRandomly();
            display.renderGameboard('player2', player2.gameboard);
            display.renderUnplacedShips('player2', player2.gameboard)  
        }
            
}



        function takeTurnPlayer1() {
            if (gameOver) return;
            currentPlayer.makeAttack(player2.gameboard);
            display.renderGameboard('player2', player2.gameboard);
            checkForGameOver();
            if (!gameOver) {
                switchTurns();
            }
        }
        
        function takeTurnPlayer2() {
            if (gameOver) return;
            display.getCellData((selectedCoordinate) => {
                currentPlayer.makeAttack(player1.gameboard, selectedCoordinate);
                display.renderGameboard('player1', player1.gameboard);
                checkForGameOver();
                if (!gameOver) {
                    switchTurns();
                }
            });
        }
        
        function switchTurns() {
            // Toggle the board status based on the current player
            if (currentPlayer === player1) {
                // Player 1 just played; make Player 2's board active for their turn
                display.toggleBoard('player1', 'inactive');
                display.toggleBoard('player2', 'active');
                currentPlayer = player2;
            } else {
                // Player 2 just played; make Player 1's board active for their turn
                display.toggleBoard('player2', 'inactive');
                display.toggleBoard('player1', 'active');
                currentPlayer = player1;
            }
        
            console.log(`Switched turns, now it's ${currentPlayer === player1 ? "Player 1" : "Player 2"}'s turn.`);

        
            // Start the next turn based on the current player
            setTimeout(() => {
                if (currentPlayer === player1) {
                    takeTurnPlayer1();
                } else {
                    takeTurnPlayer2();
                }
            }, 1500); // Optional delay
        }
        
        


    function checkForGameOver() {
        if (player1.gameboard.areAllShipsSunk()) {
            gameOver = true;
            display.renderGameOver(player2);
        
        } else if (player2.gameboard.areAllShipsSunk()) {
            gameOver = true;
            display.renderGameOver(player1)
        }
    }

    

    return {
        initPageLoad,
        initGame,
        
    }
})();