import { ficCards } from './fic-data.js';

const zone = document.getElementById("roman-zone");
const isConnected = localStorage.getItem("ksosPseudo") !== null;

const filtered = ficCards.filter(fic => fic.type === "roman");

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
    <p><strong>Type :</strong> Roman</p>
    <p>${fic.description}</p>
    ${isConnected ? `<a href="${fic.link}">Lire le Roman</a>` : `<p style="color:red;">🔒 Connecte-toi pour accéder au Roman</p>`}
  `;

  zone.appendChild(card);
});
