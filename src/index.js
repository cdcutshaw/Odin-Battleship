import "./styles.css";
import { gameFlow } from './modules/gameFlow';
import { display } from './modules/display';

window.onload = function() {
    
    gameFlow.initPageLoad();
    

    const startBtn = document.getElementById('startGameBtn');
    const restartBtn = document.getElementById('restartGameBtn');
    display.disableBtn(restartBtn)
    
    startBtn.addEventListener('click', function() {
        gameFlow.initGame();
        display.disableBtn(startBtn);
        display.enableBtn(restartBtn);
        document.getElementById('restartGameBtn').addEventListener ('click', () => {
            gameFlow.initPageLoad()
            display.enableBtn(startBtn)
            display.disableBtn(restartBtn)

        })
        
        
        
    })
    

}

