import { ficCards } from './fic-data.js'

const zone = document.getElementById("president-zone");
const filtered = ficCards.filter(fic => fic.type === "other-president");

president.forEach(fic => {
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
    <a href="${fic.link}">Lire le Texte</a>
  `;

  zone.appendChild(card);
})
