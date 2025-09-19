import { ficCards } from '../fic-data.js';

const zone = document.getElementById("prof-zone");
const isConnected = localStorage.getItem("ksosPseudo") !== null;

const filtered = ficCards.filter(fic => fic.type === "other-profs");

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
    ${isConnected ? `<a href="${fic.link}">Lire le Texte</a>` : `<p style="color:red;">🔒 Connecte-toi pour accéder au Texte</p>`}
  `;

  zone.appendChild(card);
});
