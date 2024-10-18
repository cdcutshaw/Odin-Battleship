

export const display = (function () {
    function renderEmptyBoard(playerID) {
        const board = document.getElementById(`${playerID}-board`);

        board.innerHTML = '';

        for(let x = 0; x < 10; x++) {
            for(let y = 0; y < 10; y++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                board.appendChild(cell);
            }
        }
    }

    function updateStatusMessage(message) {
        const statusMessage = document.getElementById('gameStatusMessage');
        statusMessage.textContent = message;
      }

    function renderGameStart(){

    }

    function renderGameboard () {

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
        renderEmptyBoard,
        updateStatusMessage,
    }
})();