import "./styles.css";
import { gameFlow } from './modules/gameFlow';
import { display } from './modules/display';

window.onload = function() {
    
    gameFlow.initPageLoad();

    const startBtn = document.getElementById('startGameBtn');
    startBtn.addEventListener('click', function() {
        /* display.updateStatusMessage("Let the game begin! Player 1 is placing thier ships...") */
        gameFlow.initGame();
        display.disableBtn(startBtn); 
        display.init
        
    })

}

