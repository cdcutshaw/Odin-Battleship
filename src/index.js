import "./styles.css";
import { gameFlow } from './modules/gameFlow';
import { display } from './modules/display';

window.onload = function() {
    
    gameFlow.initPageLoad();

    const startBtn = document.getElementById('startGameBtn');
    startBtn.addEventListener('click', function() {
        gameFlow.initGame();
        display.disableBtn(startBtn); 
        
    })
    

}

