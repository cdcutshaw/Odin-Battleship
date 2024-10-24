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

    function updateStatusMessage(message) {
        const statusMessage = document.getElementById('gameStatusMessage');
        statusMessage.textContent = message;
      }

    function disableBtn(btn) {
        btn.disabled = true;
    }

    function enableBtn(btn) {
        btn.disabled = False;
    }

    function onCellClick() {
        
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
                const x = parseInt(e.target.dataset.x);
                const y = parseInt(e.target.dataset.y);
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

    function generateModalList () {
        //generates ship dropdown based on available ships
    }

    function toggleBoard(playerID, activeStatus) {
        let playerBoard = document.getElementById(`${playerID}-board`);
        if (activeStatus == 'inactive')  {
            playerBoard.classList.add('disabled')
        } else if (activeStatus == 'active') {
            playerBoard.classList.remove('disabled')
        }
        
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
                        cell.classList.add(`shipCell-${playerID}`);
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
        renderUnplacedShips,
        updateStatusMessage,
        toggleBoard,
        getShip,
        getCellData,
        getDirection,
        renderGameStart,
        renderGameboard, 
        disableBtn
    }
})();  