import { ficCards } from "../fic-data.js";

const zone = document.getElementById("textes-auteur");

// 🔍 Récupère le nom de l'auteur depuis le nom du fichier HTML
const path = window.location.pathname;
const nomFichier = path.split("/").pop(); // ex: anthony_rave.html
const auteurNom = nomFichier
  .replace(".html", "")
  .replace(/_/g, " ")
  .trim()
  .toUpperCase(); // "ANTHONY RAVE"

// 🔍 Filtre : l'auteur de la page doit apparaître dans la liste des auteurs du texte
const textes = ficCards.filter(fic => {
  const auteurFic = fic.author.trim().toUpperCase();
  return auteurFic.includes(auteurNom);
});

// 📝 Affichage
textes.forEach(fic => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="../${fic.link}">${fic.title}</a>`;
  zone.appendChild(li);
});
