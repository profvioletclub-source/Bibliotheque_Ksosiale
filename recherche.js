const resultsZone = document.getElementById("search-results");
const query = JSON.parse(localStorage.getItem("ksos_search")) || {};

const allTexts = [
  {
    title: "Ksos 5.0 : Meurtre en Haute-Savoie",
    author: "Copilot",
    date: "2025-09-09",
    type: "fanfiction",
    description: "Quand les Ksos font face à la mort... 🔪",
    link: "fanfics/fanfics1.html"
  },
  {
    title: "Ksos 6.0 : Le Pacte des Cendres",
    author: "Copilot",
    date: "2025-09-10",
    type: "fanfiction",
    description: "Un an après le meurtre de Jules... 🔪",
    link: "fanfics/fanfics2.html"
  },
  {
    title: "Le Voyage dans le Musée",
    author: "Collectif",
    date: "2025-10-01",
    type: "roman",
    description: "Michel se réveille et se réjouit de voir le soleil...",
    link: "romans/voyagemusee.html"
  },
  {
    title: "Programme - UnFra",
    author: "Anthony RAVE et Mewenn RODET",
    date: "2025-09-10",
    type: "essay",
    description: "Analyses et théories politiques",
    link: "essai/progunfra25mars2025.html"
  }
];

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
