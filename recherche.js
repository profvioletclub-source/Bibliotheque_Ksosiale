const resultsZone = document.getElementById("search-results");
const query = JSON.parse(localStorage.getItem("ksos_search")) || {};

const allTexts = [/* tableau complet des textes */];

const filtered = allTexts.filter(fic => {
  return (
    (!query.title || fic.title.toLowerCase().includes(query.title.toLowerCase())) &&
    (!query.author || fic.author.toLowerCase().includes(query.author.toLowerCase())) &&
    (!query.date || fic.date === query.date) &&
    (!query.type || fic.type === query.type)
  );
});

filtered.forEach(fic => {
  const card = document.createElement("div");
  card.className = "fic-card";
  card.innerHTML = `
    <h3>${fic.title}</h3>
    <button class="fav-btn" title="Ajouter aux favoris">🔖</button>
    <p><strong>Auteur :</strong> ${fic.author}</p>
    <p><strong>Date :</strong> ${fic.date}</p>
    <p><strong>Type :</strong> ${fic.type}</p>
    <p>${fic.description}</p>
    <a href="${fic.link}">Lire le texte</a>
  `;
  resultsZone.appendChild(card);
});
