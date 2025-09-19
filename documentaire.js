import { ficCards } from './fic-data.js'

const zone = document.getElementById("docu-zone");
const filtered = ficCards.filter(fic => fic.type === "docu");

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
    <p><strong>Type :</strong> Documentaire</p>
    <p>${fic.description}</p>
    <a href="${fic.link}" class="protected-link">Lire le Documentaire</a>
  `;

  zone.appendChild(card);
});

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const auth = getAuth();
let isConnected = false;

onAuthStateChanged(auth, user => {
  isConnected = !!user;
});

document.addEventListener("click", e => {
  const link = e.target.closest(".protected-link");
  if (link && !isConnected) {
    e.preventDefault();
    showPopup("Veuillez vous connecter pour accéder à ce Documentaire.");
  }
});

function showPopup(message) {
  const overlay = document.getElementById("popup-overlay");
  const msg = document.getElementById("popup-message");
  const closeBtn = document.getElementById("close-popup");

  msg.textContent = message;
  overlay.style.display = "flex";

  closeBtn.onclick = () => {
    overlay.style.display = "none";
  };
}
