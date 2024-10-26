import {gameFlow} from '../modules/gameFlow'; 
import { SHIP_TYPES } from './ship';

export const display = (function () {
    
    function renderUnplacedShips (playerID, gameboard) {
        
        const shipsContainer = document.getElementById(`shipsToBePlaced-${playerID}`)
        shipsContainer.innerHTML = ''; 

        gameboard.shipsToPlace.forEach(ship => {
            const shipLabel = document.createElement('h3');
            const shipElement = document.createElement('div');
            shipLabel.innerText = ship.name;
            shipElement.appendChild(shipLabel);
            
            shipElement.classList.add(`ship-${playerID}`);
            shipElement.dataset.shipName = ship.name;
            shipElement.dataset.shipLength = ship.length;

            for (let i=0; i < ship.length; i++) {
                const cell = document.createElement('div');
                cell.classList.add('ship-cell');
                shipElement.appendChild(cell)
            }
            shipsContainer.appendChild(shipElement)
        });   
    }

    function updateStatusMessage(message, displayTime = 3000) {
        return new Promise((resolve) => {
            const messageElement = document.getElementById('gameStatusMessage');
            messageElement.textContent = message;
    
            setTimeout(() => {
                messageElement.textContent = ''; // Clear the message after the displayTime
                resolve();  // Resolve the promise after the time has elapsed
            }, displayTime);
        });
    }

    function disableBtn(btn) {
        btn.disabled = true;
    }

    function enableBtn(btn) {
        btn.disabled = False;
    }

    function getShip (callback) { 
        document.querySelectorAll('.ship-player2').forEach(ship => {
            ship.addEventListener('click', () => {
                const shipName = ship.dataset.shipName;
                const selectedShip = SHIP_TYPES[shipName.toLowerCase()]
                ship.style.border = "thick solid black"
                updateStatusMessage(`Now select a cell to place your ${shipName}`)
                toggleBoard('player2', 'active')
                callback(selectedShip)
            })
        })
    }

    function getCellData(callback) {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
            const x = parseInt(e.target.dataset.x, 10); 
            const y = parseInt(e.target.dataset.y, 10); 
            let selectedCoordinate = [x, y];
                callback(selectedCoordinate)
            });
            
        });
    }

    function getDirection (callback) {
        document.querySelector('dialog').showModal();
        document.getElementById('placeShipBtn').addEventListener('click', () => {
            let selectedDirection = document.getElementById('directionSelect').value;
            document.querySelector('dialog').close();
            callback(selectedDirection)
        });
    }

    function toggleBoard(playerID, activeStatus) {
        console.log(`Toggling ${playerID}'s board to ${activeStatus}`);

        let playerBoard = document.getElementById(`${playerID}-board`);
        if (activeStatus == 'inactive')  {
            playerBoard.classList.add('disabled')
        } else if (activeStatus == 'active') {
            playerBoard.classList.remove('disabled')
        }
        
    }

    function renderGameboard(playerID, gameboard = null) {
        const boardElement = document.getElementById(`${playerID}-board`);
        boardElement.innerHTML = '';  // Clear the board for a fresh render
        
        // Create an empty board
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                boardElement.appendChild(cell);
            }
        }
    
        // If a gameboard is provided, render the ships
        if (gameboard) {
            // Render ships
            gameboard.ships.forEach(({ ship, coordinates }) => {
                coordinates.forEach((coord) => {
                    const cell = document.querySelector(`#${playerID}-board .cell[data-x="${coord[0]}"][data-y="${coord[1]}"]`);
                    if (cell) {
                        cell.classList.add(`shipCell-${playerID}`);
                    }
                });
            });
    
            // Render hits
            if (gameboard.hitCoordinates && Array.isArray(gameboard.hitCoordinates)) {
                gameboard.hitCoordinates.forEach((hit) => {
                    const hitCell = document.querySelector(`#${playerID}-board .cell[data-x="${hit[0]}"][data-y="${hit[1]}"]`);
                    if (hitCell) {
                        hitCell.textContent = "X"
                        hitCell.classList.add('hit');  // Add a 'hit' class to visually distinguish hit cells
                    }
                });
            }
    
            // Render missed shots (optional, if you have a 'missedCoordinates' array)
            if (gameboard.missedShots && Array.isArray(gameboard.missedShots)) {
                gameboard.missedShots.forEach((miss) => {
                    const missCell = document.querySelector(`#${playerID}-board .cell[data-x="${miss[0]}"][data-y="${miss[1]}"]`);
                    if (missCell) {
                        missCell.classList.remove('hit')
                        missCell.textContent = ""
                        missCell.classList.add('miss');  // Add a 'miss' class for missed shots
                    }
                });
            }
        }
    }
    
    
      function renderGameOver(winner) {
        const message = winner === player1 ? 'You Win!' : 'Computer Wins!';
        const gameOverMessage = document.getElementById('game-over-message');
        gameOverMessage.textContent = message;
    
        // Disable further moves
        toggleBoard('inactive');
      }
    
    

    return {
        renderUnplacedShips,
        updateStatusMessage,
        toggleBoard,
        getShip,
        getCellData,
        getDirection,
        renderGameboard, 
        disableBtn,
        renderGameOver,
        
    }
})();  