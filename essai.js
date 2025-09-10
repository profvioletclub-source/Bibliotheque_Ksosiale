const essay = [
  {
    title: "Programme - UnFra (Version du 25 mars 2025)",
    author: "Anthony RAVE et Mewenn RODET",
    date: "2025-09-10",
    type: "essay",
    description: "Analyses et théories politiques",
    link: "essai/progunfra25mars2025.html"
  }
];

const zone = document.getElementById("essay-zone");

essay.forEach(fic => {
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
    <p><strong>Type :</strong> Essai</p>
    <p>${fic.description}</p>
    <a href="${fic.link}">Lire l'Essai</a>
  `;

  zone.appendChild(card);
});

if (typeof refreshFavButtons === "function") {
  refreshFavButtons();
}
// Tu peux réutiliser refreshFavButtons() ici si tu l’as en module
