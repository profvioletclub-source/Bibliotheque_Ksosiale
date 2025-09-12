const romans_liste = [
  {
    title: "Le Voyage dans le Musée",
    author: "Collectif",
    date: "2025-10-01",
    type: "roman",
    description: "En ce dimanche de janvier, Michel se réveille et se réjouit de voir le soleil dont les rayons passent à travers les volets. Mais il va vite déchanter. Il a neigé toute la nuit. Ce qui ne l'arrange pas car il doit aller à Lyon voir son amie, mais il n'a pas monté les pneus neige. Il va devoir s'y atteler, mais rien ne va se passer comme il le souhaite et il n'aura pas le temps de tout faire. Il décide alors de rester à Cran Gevrier et d'aller se promener au bord du lac d'Annecy. Mais en traversant la place Chorus, un événement va totalement bouleverser son après-midi...",
    link: "romans/voyagemusee.html"
  } 
];

const zone = document.getElementById("roman-zone");

romans_liste.forEach(fic => {
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
    <p><strong>Type :</strong> Roman</p>
    <p>${fic.description}</p>
    <a href="${fic.link}">Lire le Roman</a>
  `;

  zone.appendChild(card);
});
