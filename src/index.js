import "./styles.css";
import { display } from "./modules/display"
import { gameFlow } from "./modules/gameFlow";

window.onload = function() {
    display.renderGameboard('player1')
    display.renderGameboard('player2')
    display.renderUnplacedShips('player1')
    display.renderUnplacedShips('player2')

    const startBtn = document.getElementById('startGameBtn');
    startBtn.addEventListener('click', function() {
        display.updateStatusMessage("Let the game begin! Player 1 is placing thier ships...")
        gameFlow.initGame(); 
    })

}

