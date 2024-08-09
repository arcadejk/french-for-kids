import $ from 'jquery';

// ou si vous utilisez require()
const $ = require('jquery');

document.addEventListener("DOMContentLoaded", function() {
    const jeopardyBoard = document.getElementById('jeopardy-board');
    
    async function fetchJeopardyQuestions(category) {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: `Génère 4 questions sur le thème ${category}`,
                max_tokens: 60
            })
        });
        const data = await response.json();
        return data.choices[0].text.trim().split('\n');
    }

    const categories = ["Animaux", "Fruits", "Couleurs"];

    categories.forEach(async (category) => {
        const questions = await fetchJeopardyQuestions(category);
        const categoryColumn = document.createElement('div');
        categoryColumn.className = 'category-column';
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;
        categoryColumn.appendChild(categoryTitle);
        
        questions.forEach(question => {
            const questionBox = document.createElement('div');
            questionBox.className = 'question-box';
            questionBox.textContent = '?';
            questionBox.addEventListener('click', () => {
                alert(`Question: ${question}`);
                questionBox.textContent = question;
            });
            categoryColumn.appendChild(questionBox);
        });
        
        jeopardyBoard.appendChild(categoryColumn);
    });
});
