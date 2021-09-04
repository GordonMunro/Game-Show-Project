// VARIABLES
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const letter = document.getElementsByClassName('letter');
let missed = 0;

// ARRAYS
const phrases = [
    'Blue in Green',
    'Body and Soul',
    'All of Me',
    'Caravan',
    'Night and Day',
    'Mood Indigo',
    'Misty',
    'Milestones',
    'Rose Room',
    'Tea for Two'
];

// FUNCTIONS

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
    let match = null;
    for (let i = 0; i < letter.length; i++) {
             let isLetter = letter[i];
             let ltr = isLetter.textContent;
             let btn = button.textContent;
        if (btn === ltr.toLowerCase()) {
            isLetter.className += ' show';
            match = btn;
        }         
    }
    return match;
};

// check if the game has been one or lost
const reset = (result, message) => {
    overlay.className = result;
    const h2 = overlay.firstElementChild;
    h2.textContent = message;
    overlay.style.display = 'flex';
    btnReset.textContent = 'Restart Game';
    btnReset.addEventListener('click', () => {
        const button = document.querySelectorAll('.keyrow button');
        for (let i = 0; i < button.length; i++) {
            button[i].className = '';
            button[i].disabled = false;    
        }
        const list = document.querySelectorAll('#phrase li');
        for (let i = 0; i < list.length; i++) {
            list[i].remove();  
        }
        const heart = document.querySelectorAll('.tries img');
        for (let i = 0; i < heart.length; i++) {
            heart[i].src = 'images/liveHeart.png';  
        }
    const randomPhrase = getRandomPhraseAsArray(phrases);  
    addPhraseToDisplay(randomPhrase);
    missed = 0;
  });
}

const checkWin = () => {
    const show = document.getElementsByClassName('show');
    if (letter.length === show.length) {
        reset('win', 'You Won!');

    }  else if (missed >= 5) {
        reset('lose', 'You Lost.');
    }
}
// EVENT LISTENERS

// listen for the start game button to be pressed
btnReset.addEventListener('click', () => {
    overlay.style.display = 'none';
});
// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        button.className = 'chosen';
        button.disabled = true;
        let letterFound = checkLetter(button);
        if (!letterFound) {
            const heart = document.querySelectorAll('.tries img');
            heart[missed].src = 'images/lostHeart.png';
            missed++;
        }
    }
    checkWin();
});