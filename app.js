/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying, previousDice;

init();

//roll button action described below:
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //numberOfSixes = 0;
        var dice = Math.floor((Math.random() * 6) + 1);
        var diceDom = document.querySelector('.dice');
        if(dice === 6) previousDice++;
        
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
    
        // Update the Round Score if the dice rolls to 1
        if(/*dice !== 1 && */numberOfSixes<2){
            roundScore += dice;
            //console.log(roundScore);
            document.querySelector('#current-'+ activePlayer).textContent = roundScore;
        } else{
            nextPlayer();
        }
    }
});

//hold Button action described below:
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add current score to GLOBAL score
        score[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];

        //check if the player has won
        if(score[activePlayer] >= 100){
            gamePlaying = false;
            //alert('Player-'+activePlayer+1+'has won!!!!');
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            
        }else{
            //Change Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    //check who is active Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    numberOfSixes=0;
 
    //set current score to '0'
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    //change the player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hide the dice
    document.querySelector('.dice').style.display = 'none';
}

function init(){
    gamePlaying = true;
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousDice = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');    
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');    

    document.querySelector('.player-0-panel').classList.add('active');

}