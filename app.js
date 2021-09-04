// VARIABLES
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');
let missed = 0;

// Arrays
const phrases = [
    'Blue in Green',
    'Body and Soul',
    'All of Me',
    'Autumn Leaves',
    'Night and Day'
];

// Event Listener
// listen for the start game button to be pressed
btnReset.addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

// Functions

// get random phrase
const getRandomPhraseAsArray = array => {
    const randomNumber = Math.floor(Math.random() * array.length);
    const phraseSplit = array[randomNumber].split('');
    return phraseSplit;
};
const randomPhrase = getRandomPhraseAsArray(phrases);

// add phrase to display
const addPhraseToDisplay = array => {
    const ul = document.querySelector('#phrase ul');
    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        const li = document.createElement('li');
        li.textContent = letter;
        if (letter === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        ul.appendChild(li);
    }
};
addPhraseToDisplay(randomPhrase);

// check if a letter is in the phrase
const checkLetter = button => {
    const isLetter = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < isLetter.length; i++) {
             let letter = isLetter[i];
             let ltr = letter.textContent;
             let btn = button.textContent;
        if (btn === ltr.toLowerCase()) {
            letter.className += ' show';
            match = btn;
        }         
    }
    return match;
};

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        button.className = 'chosen';
        let letterFound = checkLetter(button);
        if (!letterFound) {
            const heart = document.querySelectorAll('.tries img');
            heart[missed].src = 'images/lostHeart.png';
            missed++;
        }
    }
    checkWin();
});

// check if the game has been one or lost
const checkWin = () => {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    const win = document.getElementById('overlay');
    if (letter.length === show.length) {
        win.className = 'win';
        const h2 = win.firstElementChild;
        h2.textContent = 'You Won!';
        win.style.display = 'flex';
        btnReset.textContent = 'Restart Game';
        btnReset.addEventListener('click', () => {
            const button = document.querySelectorAll('.keyrow button');
            for (let i = 0; i < button.length; i++) {
                button[i].className = '';    
            }
            const list = document.querySelectorAll('#phrase li');
            for (let i = 0; i < list.length; i++) {
                list[i].style.display = 'none';
                
            }
        addPhraseToDisplay(randomPhrase);
        missed = 0;
        });

    }  else if (missed >= 5) {
        win.className = 'lose';
        const h2 = win.firstElementChild;
        h2.textContent = 'You Lost.';
        win.style.display = 'flex';
        btnReset.textContent = 'Restart Game';
        btnReset.addEventListener('click', () => {
            const button = document.querySelectorAll('.keyrow button');
            for (let i = 0; i < button.length; i++) {
                button[i].className = '';    
            }
            const list = document.querySelectorAll('#phrase li');
            for (let i = 0; i < list.length; i++) {
                list[i].style.display = 'none';
                
            }
        addPhraseToDisplay(randomPhrase);
        missed = 0;
        });
    }
}
