'use strict';

/* 
console.log(document.querySelector('.message').
textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!'

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
 */

// 1 ile 20 arasında random sayı olacak.
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; // const değil çünkü sayı değişecek constta değişkenler değişmez.
// secretNumber ? olan yerde yazacak
let highscore = 0;

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check-btn').addEventListener
('click', function() {
    // click'e basınca konsola inputtaki yazıyı basacak.
    const guess = Number(document.querySelector('.guess').value);
    //sayıları karşılaştırabilmemiz için number olması lazım
    console.log(typeof guess); // o/ string 

    // check'e basınca correct number yazısı çıkacak.
    //document.querySelector('.message').textContent = '🎉 Correct Number!';

    if (!guess) { // guess yoksa print no number.
       /*  document.querySelector('.message').textContent = '⛔ No number!'; */
       displayMessage('⛔ No number!');
    } 
    else if (guess === secretNumber) {
        /* document.querySelector('.message').textContent = '🎉 Correct Number!'; */
        displayMessage('🎉 Correct Number!');

        document.querySelector('.number').textContent = secretNumber;

        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.guess').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    }

    else if (guess !== secretNumber) {
        if (score > 1) {
          // document.querySelector('.message').textContent =
          // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
          score--;
          displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
          
          document.querySelector('.score').textContent = score;
        } else {
          // document.querySelector('.message').textContent = '💥 You lost the game!';
          displayMessage('💥 You lost the game!');
          document.querySelector('.score').textContent = 0;
        }
      }
});

document.querySelector('.reset-btn').addEventListener
('click', function() {
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.guess').style.backgroundColor = '#222';
    document.querySelector('.score').textContent = 20;
    /* document.querySelector('.message').textContent = 'Start guessing...'; */
    displayMessage('Start guessing...');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').value = '';
});