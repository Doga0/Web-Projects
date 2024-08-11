'use strict';

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const newGameBtn = document.querySelector('.reset-btn');
const rollBtn = document.querySelector('.roll-btn');
const holdBtn = document.querySelector('.hold-btn');
const downBtn = document.querySelector('.btn-down');

let scores, currrentScore, activePlayer, playing;

const init = function() {
    scores = [0,0];
    currrentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    diceEL.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currrentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

if (diceEL.classList.contains('hidden')) {
    document.querySelector('.reset-btn').style.marginBottom = '13rem';
}

rollBtn.addEventListener('click', function() {
    if (playing) {
        const dice = Math.trunc(Math.random()*6)+1;
    
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;
        if (!diceEL.classList.contains('hidden')) {
            document.querySelector('.reset-btn').style.marginBottom = '6.5rem';
            document.querySelector('.btn-down').style.marginTop = '6.5rem';
        }
    
        if (dice !== 1) {
            currrentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currrentScore;
        }
        else {
            switchPlayer();
        }
    }
});

holdBtn.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currrentScore; 
        // scores[1] = scores[1] + currrentScore
        
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
        if (scores[activePlayer]>= 20) {
            playing = false;
            diceEL.classList.add('hidden');
            if (diceEL.classList.contains('hidden')) {
                document.querySelector('.reset-btn').style.marginBottom = '14rem';
            }
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }
    }
});


newGameBtn.addEventListener('click', init);
