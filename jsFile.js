'use strict';

//  selecting elements
let player0 = document.querySelector(`.player--0`);
let player1 = document.querySelector(`.player--1`);
let score0 = document.getElementById('score--0');
let score1 = document.getElementById(`score--1`);
let current0 = document.getElementById(`current--0`);
let current1 = document.getElementById(`current--1`);
let dice = document.querySelector(`.dice`)
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let finalScore, currentScore, activePlayer, playing;

//  setting the game starting UI conditions
const init = function() {
    document.getElementById('name--0').textContent = 'PLAYER 1'
    document.getElementById('name--1').textContent = 'PLAYER 2'
    score0.textContent = 0
    score1.textContent = 0
    current0.textContent = 0
    current1.textContent = 0
    dice.classList.add('hidden')
    
    finalScore = [0,0]
    // setting current score
    currentScore = 0;
    activePlayer = 0
    playing = true


    player0.classList.remove('player--winner')
    player1.classList.remove('player--winner')
    player0.classList.add('player--active')
    player1.classList.remove('player--active')
}
init ()


// Adding rolling functionallity
btnRoll.addEventListener('click', function(){
     if(playing) {

    //  1. generating random number for each roll of dice
    let diceRandNo = Math.trunc(Math.random()*6)+1

    // 2. showing the dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRandNo}.png`;

    // 3. check for rolled no == 1
    if (diceRandNo !== 1){
        // if not true, add dice no to the curreny score
        currentScore += diceRandNo;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
        // change layer
    }
    else{
        // when dice is == 1

        //set previous player's score to 0
        document.getElementById(`current--${activePlayer}`).textContent = 0

        //set current score to 0 (in which dice number was being added)
        currentScore = 0
        
        // dice goes to the next player
        // by changing the active player score 0 to 1
        activePlayer = activePlayer === 0 ? 1 : 0

        // changing color of the active player
        player0.classList.toggle(`player--active`)
        player1.classList.toggle(`player--active`)
    }
    }
})


// adding event to the hold button
btnHold.addEventListener('click', function(){
    if(playing) {

    // 1. adding current score to the active layer
    finalScore[activePlayer] = finalScore[activePlayer] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = finalScore[activePlayer]


    // 2. checking player's score >= 100
    if (finalScore[activePlayer] >= 100) {

        // finish the game

        playing = false
        
        dice.classList.add('hidden');   
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')

        if (activePlayer==0) {
            document.getElementById(`name--${activePlayer}`).textContent = `PLAYER 1🎉`
        }
        else {
            document.getElementById(`name--${activePlayer}`).textContent = `PLAYER 2🎉`
        }
        

        document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
    }
    
    else {
    // switch to th next player
    //set previous player's Current score to 0
    document.getElementById(`current--${activePlayer}`).textContent = 0

    //set current score to 0 (in which dice number was being added)
    currentScore = 0
    
    // dice goes to the next player
    // by changing the active player score 0 to 1
    activePlayer = activePlayer === 0 ? 1 : 0

    // changing color of the active player
    player0.classList.toggle(`player--active`)
    player1.classList.toggle(`player--active`)
    }
}
})

// adding functionality to the new game button
btnNew.addEventListener('click', init);