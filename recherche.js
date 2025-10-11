import { ficCards } from "./fic-data.js";

const resultsZone = document.getElementById("search-results");
const query = JSON.parse(localStorage.getItem("ksos_search")) || {};

const clean = (val) => val?.toLowerCase().trim() || "";

const filtered = ficCards.filter(fic => {
  const titleMatch = !query.title || fic.title.toLowerCase().includes(clean(query.title));
  const authorMatch = !query.author || fic.author.toLowerCase().includes(clean(query.author));
  const dateMatch = !query.date || fic.date === query.date;
  const typeMatch = !query.type || fic.type.toLowerCase().includes(clean(query.type));
  return titleMatch && authorMatch && dateMatch && typeMatch;
});

if (filtered.length === 0) {
  resultsZone.innerHTML = `<p style="color:red;">❌ Aucun résultat trouvé pour ta recherche.</p>`;
} else {
  filtered.forEach(fic => {
    const card = document.createElement("div");
    card.className = "fic-card";
    card.innerHTML = `
      <h3>${fic.title}</h3>
      <p><strong>Auteur :</strong> ${fic.author}</p>
      <p><strong>Date :</strong> ${fic.date}</p>
      <p><strong>Type :</strong> ${fic.type}</p>
      <p>${fic.description}</p>
      <a href="${fic.link}">Lire le texte</a>
    `;
    resultsZone.appendChild(card);
  });
}
