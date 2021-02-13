const overlay = document.querySelector('#overlay');
const h2 = document.querySelector('h2');
const a = document.querySelector('a');
const btnReset = document.querySelector('.btn__reset');
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const button = document.querySelectorAll('button');
const ul = document.querySelector('ul');
const letter = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const img = document.querySelectorAll('img');
let missed = 0;

btnReset.addEventListener('click', () => {
    overlay.style.display = 'none';
});

const phrases = [
    'Tintin in the Congo',
    'Tintin in America',
    'Cigars of the Pharaoh',
    'The Blue Lotus',
    'The Broken Ear'
];

function getRandomPhraseAsArray(arr) {
    let randomPhrase = arr[Math.floor(Math.random()*arr.length)];
    return randomPhrase.toString().split('');
}

const randomPhraseArr = getRandomPhraseAsArray(phrases).map(phrase => phrase.toLowerCase());

function addPhraseToDisplay(arr) {
     for (let i = 0; i < arr.length; i++) {
         const li = document.createElement('li');
         li.textContent = arr[i];
         ul.appendChild(li);
         if (arr[i] !== ' ') {
            li.className = 'letter';
         } else {
            li.className = 'space';
         }
     }
}

addPhraseToDisplay(randomPhraseArr);

function checkLetter(clickedBtn) {
    let result = null;
    for (let i = 0; i < letter.length; i++) {
        if (letter[i].textContent === clickedBtn) {
            letter[i].classList.add('show');
            result = clickedBtn;
        }
    }
    return result;
}

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;
        const letterFound = checkLetter(e.target.textContent);
        if (letterFound === null) {
            img[missed].setAttribute('src', 'images/lostHeart.png');
            missed++;
        }
    }
    checkWin();
});

function checkWin() {
    if (letter.length === show.length) {
        overlay.classList.add('win');
        h2.textContent = 'You won!';
        overlay.style.display = 'flex';
        a.style.display = 'none';
        const p = document.createElement('p');
        p.textContent = 'Please refresh the browser to reset.'
        overlay.appendChild(p);
    } else if (missed > 4) {
        overlay.classList.add('lose');
        h2.textContent = 'You lost';
        overlay.style.display = 'flex';
        a.style.display = 'none';
        const p = document.createElement('p');
        p.textContent = 'Please refresh the browser to reset.'
        overlay.appendChild(p);
    }
}