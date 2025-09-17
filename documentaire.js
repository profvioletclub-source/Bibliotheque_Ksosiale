const docu = [
  {
    title: "Or jaune, noir, bleu, quelle différence ?",
    author: "Anthony RAVE",
    date: "2025-09-18",
    type: "docu",
    description: "Quelle est la différence entre les différents types d'or ?",
    link: "document/or_jaune_noir_bleu_quelle_difference_?.html"
  },  
  {
    title: "y",
    author: "Anthony RAVE",
    date: "2025-09-18",
    type: "docu",
    description: "y",
    link: "document/y.html"
  }
];

const zone = document.getElementById("docu-zone");

docu.forEach(fic => {
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
    <p><strong>Type :</strong> Documentaire</p>
    <p>${fic.description}</p>
    <a href="${fic.link}">Lire le Documentaire</a>
  `;

  zone.appendChild(card);
})
