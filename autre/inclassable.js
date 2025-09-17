const inclassable = [
  {
    title: "a",
    author: "Anthony RAVE",
    date: "2025-09-18",
    type: "other",
    description: "a",
    link: "?.html"
  },
  {
    title: "w",
    author: "Anthony RAVE",
    date: "2025-09-18",
    type: "other",
    description: "w",
    link: "la_lignee_des_profs/w.html"
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
