const president = [
  {
    title: "1 - Le Collier d'Angela Merkel",
    author: "Anthony RAVE",
    date: "2025-09-17",
    type: "other",
    description: "Angela Merkel compte sur l'aide de son collier...",
    link: "les_president(e)s_en_force/1_le_collier_d_Angela_Merkel.html"
  },
  {
    title: "2 - La Bague d'Emmanuel Macron",
    author: "Anthony RAVE",
    date: "2025-09-17",
    type: "other",
    description: "Emmanuel Macron compte sur l'aide de sa bague...",
    link: "les_president(e)s_en_force/2_la_bague_d_emmanuel_macron.html"
  },
  {
    title: "3 - Le Pendentif d'Elizabeth II",
    author: "Anthony RAVE",
    date: "2025-09-17",
    type: "other",
    description: "Elizabeth II compte sur l'aide de son pendentif...",
    link: "les_president(e)s_en_force/3_le_pendentif_d_Elizabeth_II.html"
  }
];

const zone = document.getElementById("president-zone");

president.forEach(fic => {
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
