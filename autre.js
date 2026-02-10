import { ficCards } from './fic-data.js';

const zone = document.getElementById("other-zone");
const isConnected = localStorage.getItem("ksosPseudo") !== null;

const filtered = ficCards.filter(fic => fic.type === "other");

filtered.forEach(fic => {
  const card = document.createElement("div");
  card.className = "fic-card";
  card.setAttribute("data-title", fic.title);
  card.setAttribute("data-author", fic.author);
  card.setAttribute("data-date", fic.date);
  card.setAttribute("data-type", fic.type);

  card.innerHTML = `
    <h3>${fic.title}</h3>
    <p><strong>Auteur :</strong> ${fic.author}</p>
    <p><strong>Date :</strong> ${fic.date}</p>
    <p><strong>Type :</strong> Autre</p>
    <p>${fic.description}</p>
    ${isConnected ? `
      <a href="${fic.link}">Lire le Texte</a>
    ` : `<p style="color:red;">🔒 Connecte-toi pour accéder au document</p>`}
  `;

  zone.appendChild(card);
});

if (isConnected) {
  document.querySelectorAll('.rating').forEach(rating => {
    const title = rating.dataset.title;
    const saved = localStorage.getItem(`rating-${title}`);
    if (saved) highlightStars(rating, parseInt(saved));

    rating.querySelectorAll('.star').forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.dataset.star);
        localStorage.setItem(`rating-${title}`, value);
        highlightStars(rating, value);
      });
    });
  });

  function highlightStars(rating, value) {
    rating.querySelectorAll('.star').forEach(star => {
      star.classList.toggle('active', parseInt(star.dataset.star) <= value);
    });
  }
}

