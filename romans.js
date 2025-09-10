const romans = [
  {
    title: "Programme - UnFra (Version du 25 mars 2025)",
    author: "Anthony RAVE et Mewenn RODET",
    date: "2025-09-10",
    type: "roman",
    description: "...",
    link: "roman/voyagemusee.html"
  }
];

const zone = document.getElementById("romans-zone");

romans.forEach(fic => {
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
    <p><strong>Type :</strong> Roman</p>
    <p>${fic.description}</p>
    <a href="${fic.link}">Lire le Roman</a>
  `;

  zone.appendChild(card);
});

// Tu peux réutiliser refreshFavButtons() ici si tu l’as en module
