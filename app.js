// VARIABLES
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');
let missed = 0;

// Arrays
const phrases = [
    'blue in green',
    'honeysuckle rose',
    'on green dolphin street',
    'how high the moon',
    'take the a train'

];

// Event Listener

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
}
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
}
addPhraseToDisplay(randomPhrase);

// check if a letter is in the phrase
const checkLetter = button => {
    const isLetter = document.getElementsByClassName('letter');
    let match;
    for (let i = 0; i < isLetter.length; i++) {
        const letter = isLetter[i];
        const ltr = letter.textContent;
        const btn = button.textContent;
        if (btn === ltr) {
            letter.className = 'letter show';
            match = btn;
        } 
        return match;
    }
}

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        button.className = 'chosen';
        let letterFound = checkLetter(button);
        if (!letterFound) {
            missed++;
        }
        return letterFound;
    }
})