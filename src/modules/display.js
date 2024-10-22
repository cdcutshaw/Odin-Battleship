import {SHIP_TYPES} from '../modules/ship'; 
import {gameFlow} from '../modules/gameFlow'; 

export const display = (function () {
    
    function renderUnplacedShips (playerID) {
        const shipsToPlace = Object.values(SHIP_TYPES);
        const shipsContainer = document.getElementById(`shipsToBePlaced-${playerID}`)
        shipsContainer.innerHTML = ''; 

        shipsToPlace.forEach(ship => {
            const shipLabel = document.createElement('h3');
            const shipElement = document.createElement('div');
            shipLabel.innerText = ship.name;
            shipsContainer.appendChild(shipLabel);
            shipElement.classList.add('ship');
            shipElement.dataset.shipName = ship.name;

            for (let i=0; i < ship.length; i++) {
                const cell = document.createElement('div');
                cell.classList.add('ship-cell');
                shipElement.appendChild(cell)
            }
            shipsContainer.appendChild(shipElement)
        });

        
    }

    function updateStatusMessage(message) {
        const statusMessage = document.getElementById('gameStatusMessage');
        statusMessage.textContent = message;
      }

    function renderGameStart(){
        
    }

    function renderGameboard(playerID, gameboard = null) {
        const boardElement = document.getElementById(`${playerID}-board`);
        boardElement.innerHTML = '';
    
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
            gameboard.ships.forEach(({ ship, coordinates }) => {
                coordinates.forEach((coord) => {
                    const cell = document.querySelector(`#${playerID}-board .cell[data-x="${coord[0]}"][data-y="${coord[1]}"]`);
                    if (cell) {
                        cell.classList.add(`ship-${playerID}`);
                    }
                });
            });
        }
    }

    function updateTurn(){

    }

    function renderGameOver(){

    }

    function handlePlayerClick() {

    }

    function enablePlayerMoves() {

    }

    return {
        /* renderEmptyBoard, */
        renderUnplacedShips,
        updateStatusMessage,
        renderGameStart,
        renderGameboard
    }
})();