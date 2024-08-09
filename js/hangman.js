document.addEventListener('DOMContentLoaded', () => {
    const words = ['chat', 'chien', 'maison', 'pomme', 'arbre'];
    let chosenWord = '';
    let guessedLetters = [];
    let wrongGuesses = 0;

    function chooseRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        chosenWord = words[randomIndex];
        displayWord();
    }

    function displayWord() {
        const wordDisplay = chosenWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
        document.getElementById('wordDisplay').innerText = wordDisplay;

        if (!wordDisplay.includes('_')) {
            document.getElementById('message').innerText = 'Congratulations! You guessed the word!';
        }
    }

    function handleGuess(event) {
        const guess = event.target.value.toLowerCase();
        event.target.value = '';
        if (guess && !guessedLetters.includes(guess)) {
            guessedLetters.push(guess);
            if (!chosenWord.includes(guess)) {
                wrongGuesses++;
                document.getElementById('hangmanImage').src = `../images/hangman${wrongGuesses}.png`;
                if (wrongGuesses >= 6) {
                    document.getElementById('message').innerText = 'Game over! The word was ' + chosenWord;
                }
            }
            displayWord();
        }
    }

    document.getElementById('guessButton').addEventListener('click', handleGuess);

    chooseRandomWord();
});
