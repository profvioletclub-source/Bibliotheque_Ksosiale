const inclassable = [
  {
    title: "Programme - UnFra (Version du 25 mars 2025)",
    author: "Anthony RAVE et Mewenn RODET",
    date: "2025-09-10",
    type: "other",
    description: "Analyses et théories politiques",
    link: "progunfra25mars2025.html"
  },
  {
    title: "Haïku",
    author: "Anthony RAVE",
    date: "2025-09-10",
    type: "other",
    description: "Poèmes courts",
    link: "haiku.html"
  }
];

const zone = document.getElementById("inclassable-zone");

inclassable.forEach(fic => {
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
    <p><strong>Type :</strong> Autre</p>
    <p>${fic.description}</p>
    <a href="${fic.link}">Lire le Texte</a>
  `;

  zone.appendChild(card);
})
