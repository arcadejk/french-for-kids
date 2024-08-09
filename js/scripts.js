import $ from 'jquery';

// ou si vous utilisez require()
const $ = require('jquery');

document.addEventListener("DOMContentLoaded", function() {
    // Animation de survol pour les images des fonctionnalités
    const featureImages = document.querySelectorAll('.feature img');
    featureImages.forEach(img => {
        img.addEventListener('mouseover', function() {
            img.style.transform = 'scale(1.1)';
        });
        img.addEventListener('mouseout', function() {
            img.style.transform = 'scale(1)';
        });
    });

    // Changement de couleur des boutons au survol
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            button.style.backgroundColor = '#FF1493';
        });
        button.addEventListener('mouseout', function() {
            button.style.backgroundColor = '#FF69B4';
        });
    });

    // Afficher un message de bienvenue
    const heroSection = document.getElementById('hero');
    const welcomeMessage = document.createElement('div');
    welcomeMessage.textContent = 'Amuse-toi bien en apprenant le français !';
    welcomeMessage.style.fontSize = '1.2rem';
    welcomeMessage.style.color = '#FF1493';
    welcomeMessage.style.marginTop = '1rem';
    heroSection.appendChild(welcomeMessage);
});

// Remplacez 'YOUR_API_KEY' par votre clé API OpenAI
const apiKey = 'YOUR_API_KEY';

// Fonction pour obtenir des exemples de jeux de Scrabble
async function getScrabbleExamples() {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: 'Generate a list of 10 Scrabble game examples with images and descriptions.',
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.choices[0].text.trim().split('\n');
}

// Fonction pour afficher les exemples de Scrabble sur la page
async function displayScrabbleExamples() {
    const examples = await getScrabbleExamples();
    const container = document.querySelector('.card-container');

    examples.forEach(example => {
        const [title, imgSrc, link] = example.split('|'); // Supposons que les données sont séparées par des pipes
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${imgSrc}" alt="${title}">
            <h2>${title}</h2>
            <a href="${link}">Voir l'exemple</a>
        `;

        container.appendChild(card);
    });
}

// Appeler la fonction pour afficher les exemples au chargement de la page
document.addEventListener('DOMContentLoaded', displayScrabbleExamples);