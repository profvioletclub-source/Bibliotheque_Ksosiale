import { ficCards } from "./fic-data.js";

const resultsZone = document.getElementById("search-results");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  const title = document.getElementById("search-bar").value;
  const author = document.getElementById("search-author").value;
  const date = document.getElementById("search-date").value;
  const type = document.getElementById("search-type").value;

  const clean = (val) => val?.toLowerCase().trim() || "";

  const filtered = ficCards.filter(fic => {
    const titleMatch = !title || fic.title.toLowerCase().includes(clean(title));
    const authorMatch = !author || fic.author.toLowerCase().includes(clean(author));
    const dateMatch = !date || fic.date === date;
    const typeMatch = !type || fic.type.toLowerCase() === clean(type);
    return titleMatch && authorMatch && dateMatch && typeMatch;
  });

  resultsZone.innerHTML = "";

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
});

