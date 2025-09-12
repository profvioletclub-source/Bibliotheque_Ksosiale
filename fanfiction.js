const fanfics = [
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
    date: "2025-09-12",
    type: "fanfiction",
    description: "Un an après le meurtre de Jules... 🔪",
    link: "fanfics/fanfics2.html"
  }
];

const zone = document.getElementById("fanfiction-zone");

fanfics.forEach(fic => {
  const card = document.createElement("div");
  card.className = "fic-card";
  card.setAttribute("data-title", fic.title);
  card.setAttribute("data-author", fic.author);
  card.setAttribute("data-date", fic.date);
  card.setAttribute("data-type", fic.type);

  card.innerHTML = `
    <h3>${fic.title}</h3>
    <button class="fav-btn" title="Ajouter aux favoris">🔖</button>
    <p><strong>Auteur :</strong> ${fic.author}</p>
    <p><strong>Date :</strong> ${fic.date}</p>
    <p><strong>Type :</strong> Fan Fiction</p>
    <p>${fic.description}</p>
    <a href="${fic.link}">Lire la Fan fiction</a>
  `;

  zone.appendChild(card);
});

// Tu peux réutiliser refreshFavButtons() ici si tu l’as en module
