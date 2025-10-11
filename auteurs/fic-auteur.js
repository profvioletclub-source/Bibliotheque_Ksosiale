import { ficCards } from "../fic-data.js";

const zone = document.getElementById("textes-auteur");

// 🔍 Récupère le nom de l'auteur depuis le nom du fichier HTML
const path = window.location.pathname;
const nomFichier = path.split("/").pop(); // ex: anthony_rave.html
const auteurNom = nomFichier.replace(".html", "").replace("_", " ").toUpperCase(); // "ANTHONY RAVE"

const textes = ficCards.filter(fic => fic.author.toUpperCase().includes(auteurNom));

textes.forEach(fic => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="../${fic.link}">${fic.title}</a>`;
  zone.appendChild(li);
});
