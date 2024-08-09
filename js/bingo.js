import $ from 'jquery';

// ou si vous utilisez require()
const $ = require('jquery');

document.addEventListener("DOMContentLoaded", function() {
    const bingoBoard = document.getElementById('bingo-board');

    async function fetchBingoWords() {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: `Génère 9 mots en français pour un jeu de Bingo`,
                max_tokens: 20
            })
        });
        const data = await response.json();
        return data.choices[0].text.trim().split('\n');
    }

    const generateBingoCard = async () => {
        bingoBoard.innerHTML = '';
        const words = await fetchBingoWords();
        
        words.forEach(word => {
            const bingoBox = document.createElement('div');
            bingoBox.className = 'bingo-box';
            bingoBox.textContent = word;
            bingoBox.addEventListener('click', () => {
                bingoBox.style.backgroundColor = 'lightgreen';
            });
            bingoBoard.appendChild(bingoBox);
        });
    };

    generateBingoCard();
});
