'use strict';

/////////////////////////////////////////////////
// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
      ],
      currency: 'EUR',
      locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(acc, sort = false) {
    
    containerMovements.innerHTML = "";

    const movs = sort ? acc.movements.slice().sort((a,b) => a - b):
    acc.movements;

    movs.forEach(function(move, i) {
        const type = move>0 ? "deposit" : "withdrawal";

        const date = new Date(acc.movementsDates[i]);
        const day = `${date.getDate()}`.padStart(2,0);
        const month = date.getMonth()+1;
        const year = `${date.getFullYear()}`.padStart(2,0);
        const displayDate = `${day}/${month}/${year}`;


        // .toFixed(2) = 2 tane ondalık sayı bıraktık
        const html =
            `<div class="movements__row">
              <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
                <div class="movements__date">${displayDate}</div>
              <div class="movements__value">${move.toFixed(2)}€</div>
            </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};


const calcDisplayBlance = function(acc) {
    acc.balance = acc.movements.reduce((acc, move) => acc+move, 0);
    labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
}


const calcDisplaySummary = function(acc) {
    const incomes = acc.movements
        .filter(move => move > 0)
        .reduce((acc, move) => acc+move, 0);
    labelSumIn.textContent = `${incomes.toFixed(2)}€`;

    const out = acc.movements
        .filter(move => move<0)
        .reduce((acc, move) => acc+move, 0);
    labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

    // interest = faiz
    const interest = acc.movements
        .filter(move => move > 0)
        .map(deposit => (deposit*acc.interestRate)/100)
        .filter((int, i, arr) => {
            console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const updateUI = function(acc) {
    // display movements
    displayMovements(acc);

    // display balance
    calcDisplayBlance(acc);

    // display summary
    calcDisplaySummary(acc);
};

const startLogOutTimer = function() {
    const tick = function() {
        const min = String(Math.trunc(time / 60)).padStart(2,0);
        const sec = String(time % 60).padStart(2,0);

        // in each time print the remaining time to ui
        labelTimer.textContent = `${min}:${sec}`;

        // when 0 sec, stop timer and log out user
        if(time===0) {
            clearInterval(timer);
            labelWelcome.textContent = `Log in to get started`;
            containerApp.style.opacity = 0;
        }

        // decrease 1sec
        time--;
    }
    // set time to 5 min
    let time = 120;
    // call the timer every second
    tick();
    const timer = setInterval(tick, 1000);
    return timer
};

// Event handler
let currentAccount, timer;


btnLogin.addEventListener('click', function(e) {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    if(currentAccount?.pin === Number(inputLoginPin.value)) {
        // display ui and message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
        containerApp.style.opacity = 100;

        const now1 = new Date();
        const day = `${now1.getDate()}`.padStart(2,0);
        const month = now1.getMonth()+1;
        const year = `${now1.getFullYear()}`.padStart(2,0);
        const hours = `${now1.getHours()}`.padStart(2,0);
        const min = `${now1.getMinutes()}`.padStart(2,0);
        labelDate.textContent= `${day}/${month}/${year}, ${hours}:${min}`;


        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        if(timer) clearInterval(timer);
        timer = startLogOutTimer();

        // update ui
        updateUI(currentAccount);
    }
});

const createUsernames = function(accs) {
    accs.forEach(function(acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(" ")
            .map(name => name[0])
            .join("");
    })
};
createUsernames(accounts);
console.log(accounts);

btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

    inputTransferAmount.value = inputTransferTo.value = '';

    if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
        // doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        // update ui
        updateUI(currentAccount);

        clearInterval(timer);
        timer = startLogOutTimer();
    }
});

btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);

    if (amount > 0 && currentAccount.movements.some(move => move >= amount * 0.1)) {
        setTimeout(function() {
            // add the movement
            currentAccount.movements.push(amount);

            // add loan date
            currentAccount.movementsDates.push(new Date().toISOString());

            // update ui
            updateUI(currentAccount);

            // reset timer
            clearInterval(timer);
            timer = startLogOutTimer();
        }, 2500);
    }
    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e) {
    e.preventDefault();

    if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);

        // delete account
        // at position index, remove 1 item
        accounts.splice(index, 1);

        // hide ui
        containerApp.style.opacity = 0;
    }

    inputCloseUsername.value = inputClosePin.value = '';
})

let sorted = false;
btnSort.addEventListener('click', function(e) {
    e.preventDefault();

    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});






// 1
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// const movementsUsd = movements.map(function(move) {
//     return move * eurToUsd;
// });
// console.log(movements);
// console.log(movementsUsd);

// 2
// const movementsUSDfor = [];
// for(const move of movements) movementsUSDfor.push(move*eurToUsd);

// 3
// const movementsUSDarrow = movements.map(move => move*eurToUsd);

// Bankist
const movementDescriptions = movements.map((move, i) =>
    // if(move>0) {
    //     return `Movement ${i+1}: You deposited ${Math.abs(move)}`;
    // } else {
    //     return `Movement ${i+1}: You withdrew ${Math.abs(move)}`;
    // }

    `Movement ${i+1}: You ${move>0 ? 'deposited' : 'withdrew'} ${Math.abs(move)}`
);
// console.log(movementDescriptions);




// filter

// 1
const deposits = movements.filter(function(move) {
    return move > 0;
})

// 2
const withdrawals = movements.filter(move => move<0);




// reduce

// 1
const balance = movements.reduce(function(acc, current, i, arr) {
    return acc + current;
}, 0);

// 2
const balance2 = movements.reduce((acc, cur) => acc + cur, 0);

// max value
const max = movements.reduce((acc, move) => {
    if(acc>move)
        return acc;
    else
        return move;
}, movements[0]);




// map, filter, reduce
const eurToUsd = 1.1;

// pipeline
const totalDepositsUSD = movements
    .filter(move => move > 0)
    .map(move => move*eurToUsd)
    .reduce((acc, move) => acc+move, 0);
// console.log(totalDepositsUSD);
// 5522.000000000001




// find)
const firstDrawal = movements.find(move => move < 0);
console.log(firstDrawal); //-400  negatif olan ilk sayıyı bastı

const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(account);
// {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}


// flat)
const arr = [[1,2,3], [4,5,6], 7,8];
// console.log(arr.flat()); [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1,2], 3], [4, [5,6]], 7,8];
// console.log(arrDeep.flat(2)); flat'ın içine derinlik gitilir
// [1, 2, 3, 4, 5, 6, 7, 8]

const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// bütün move'ları tek bir array'de toplamak için;
const allMovements = accountMovements.flat();
// console.log(allMovements);

// flat
const overallBalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((move, acc) => acc+move, 0);

// flatMap
const overallBalance2 = accounts
    .flatMap(acc => acc.movements) // flatmap sadece 1 level derine gider
    .reduce((move, acc) => acc+move, 0);


// sort
const owners = ["jonas", "zach", "adam", "martha"];
// console.log(owners.sort()); ['adam', 'jonas', 'martha', 'zach']


movements.sort((a,b) => a - b);
movements.sort((a,b) => {
    if(a>b) return 1;
    if(a<b) return -1;
});
// console.log(movements);[-650, -400, -130, 70, 200, 450, 1300, 3000]

movements.sort((a,b) => b - a);
movements.sort((a,b) => {
    if(a>b) return -1;
    if(a<b) return 1;
});
// console.log(movements);[3000, 1300, 450, 200, 70, -130, -400, -650]


// parsing
console.log(Number.parseInt('30px'), 10); // 30
console.log(Number.parseInt('e23'), 10); // 23
// console.log((2.7).toFixed(3)); 2.7

// remainder
labelBalance.addEventListener('click', function() {
    [...document.querySelectorAll('.movements__row')].
        forEach(function (row, i) {
            if(i%2==0) row.style.backgroundColor = 'orengered';
        });
});


// dates
console.log(Date.now());
console.log(new Date(1661430856324)); 

const now = new Date(); 
console.log(new Date(account1.movementsDates[0]));

const future = new Date(2037,10,19,15,23);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());


// future.setFullYear(2040);

// timers
//setTimeout
const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`here is your pizza with ${ing1}, ${ing2}`), 3000, ...ingredients);


if (ingredients.includes("spinach")) clearTimeout(pizzaTimerpizzaTimer);

// setInterval
setInterval(function() {
    const now =  new Date();
    console.log(now);
}, 1000);
