export const display = (function () {

    // RENDER FUNCTIONS
    function renderUnplacedShips(playerID, gameboard) {
        const shipsContainer = document.getElementById(`shipsToBePlaced-${playerID}`);
        shipsContainer.innerHTML = ''; 

        gameboard.shipsToPlace.forEach(ship => {
            const shipLabel = document.createElement('h4');
            const shipElement = document.createElement('div');
            shipLabel.innerText = ship.name;
            shipElement.appendChild(shipLabel);
            
            shipElement.classList.add(`ship-${playerID}`);
            shipElement.dataset.shipName = ship.name;
            shipElement.dataset.shipLength = ship.length;

            for (let i = 0; i < ship.length; i++) {
                const cell = document.createElement('div');
                cell.classList.add('ship-cell');
                shipElement.appendChild(cell);
            }
            shipsContainer.appendChild(shipElement);
        });
    }

    function renderGameboard(playerID, gameboard = null) {
        const boardElement = document.getElementById(`${playerID}-board`);
        boardElement.innerHTML = '';  

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                boardElement.appendChild(cell);
            }
        }

        if (gameboard) {
            renderShips(playerID, gameboard);
            renderHits(playerID, gameboard);
            renderMisses(playerID, gameboard);
        }
    }

    function renderShips(playerID, gameboard) {
        gameboard.ships.forEach(({ ship, coordinates }) => {
            coordinates.forEach(coord => {
                const cell = document.querySelector(`#${playerID}-board .cell[data-x="${coord[0]}"][data-y="${coord[1]}"]`);
                if (cell) cell.classList.add(`shipCell-${playerID}`);
            });
        });
    }

    function renderHits(playerID, gameboard) {
        if (gameboard.hitCoordinates && Array.isArray(gameboard.hitCoordinates)) {
            gameboard.hitCoordinates.forEach(hit => {
                const hitCell = document.querySelector(`#${playerID}-board .cell[data-x="${hit[0]}"][data-y="${hit[1]}"]`);
                if (hitCell) {
                    hitCell.textContent = "X";
                    hitCell.classList.add('hit');
                }
            });
        }
    }

    function renderMisses(playerID, gameboard) {
        if (gameboard.missedShots && Array.isArray(gameboard.missedShots)) {
            gameboard.missedShots.forEach(miss => {
                const missCell = document.querySelector(`#${playerID}-board .cell[data-x="${miss[0]}"][data-y="${miss[1]}"]`);
                if (missCell) {
                    missCell.classList.remove('hit');
                    missCell.textContent = "";
                    missCell.classList.add('miss');
                }
            });
        }
    }

    function renderGameOver(winner) {
        const message = winner === 'player2' ? 'You Win!' : 'Opponent Wins!';
        updateStatusMessage(message);

        toggleBoard('player1', 'inactive');
        toggleBoard('player2', 'inactive');
    }


    // EVENT HANDLING FUNCTIONS
    function getShip(callback) { 
        document.querySelectorAll('.ship-player2').forEach(ship => {
            ship.addEventListener('click', () => {
                const shipName = ship.dataset.shipName;
                const shipLength = parseInt(ship.dataset.shipLength, 10);
                ship.style.border = "thick solid black";
                updateStatusMessage(`Now select a cell to place your ${shipName}...`);
                toggleBoard('player2', 'active');
                callback({ name: shipName, length: shipLength });
            });
        });
    }

    function getCellData(callback) {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const x = parseInt(e.target.dataset.x, 10); 
                const y = parseInt(e.target.dataset.y, 10); 
                callback([x, y]);
            });
        });
    }

    function getDirection(callback) {
        document.querySelector('dialog').showModal();
        document.getElementById('placeShipBtn').addEventListener('click', () => {
            const selectedDirection = document.getElementById('directionSelect').value;
            document.querySelector('dialog').close();
            callback(selectedDirection);
        });
    }


    // HELPER FUNCTIONS
    function updateStatusMessage(message) {
        const messageElement = document.getElementById('gameStatusMessage');
        messageElement.textContent = message;  
    }
    
    function toggleBoard(playerID, activeStatus) {
        const playerBoard = document.getElementById(`${playerID}-board`);
        playerBoard.classList.toggle('disabled', activeStatus === 'inactive');
    }

    function disableBtn(btn) {
        btn.disabled = true;
    }

    function enableBtn(btn) {
        btn.disabled = false;
    }

    function clearCellListeners() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.replaceWith(cell.cloneNode(true));  
        });
    }

    
    return {
        renderUnplacedShips,
        renderGameboard,
        renderGameOver,
        getShip,
        getCellData,
        getDirection,
        updateStatusMessage,
        toggleBoard,
        disableBtn,
        enableBtn,
        clearCellListeners
    };
})();
