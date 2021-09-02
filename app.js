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
})

// Functions

// get random phrase
const getRandomPhraseAsArray = array => {
    const randomNumber = Math.floor(Math.random() * array.length);
    return array[randomNumber];
}
const randomPhrase = getRandomPhraseAsArray(phrases);
// add phrase to display
const addPhraseToDisplay = array => {
    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        const li = document.createElement('li');
        
        
    }
}