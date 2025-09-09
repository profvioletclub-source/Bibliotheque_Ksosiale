document.addEventListener("DOMContentLoaded", function () {
  // 🔔 Alerte au clic sur les liens
  const links = document.querySelectorAll("main a");
  links.forEach(link => {
    link.addEventListener("click", function () {
      alert("Bonne lecture ! 📖");
    });
  });

  // 🔍 Recherche avancée
  const cards = document.querySelectorAll(".fic-card");
  const searchBar = document.getElementById("search-bar");
  const searchAuthor = document.getElementById("search-author");
  const searchDate = document.getElementById("search-date");
  const searchType = document.getElementById("search-type");
  const searchButton = document.getElementById("search-button");

  function filterCards() {
    const title = searchBar.value.toLowerCase();
    const author = searchAuthor.value.toLowerCase();
    const date = searchDate.value;
    const type = searchType.value;

    cards.forEach(card => {
      const cardTitle = card.dataset.title.toLowerCase();
      const cardAuthor = card.dataset.author.toLowerCase();
      const cardDate = card.dataset.date;
      const cardType = card.dataset.type;

      const match =
        (!title || cardTitle.includes(title)) &&
        (!author || cardAuthor.includes(author)) &&
        (!date || cardDate === date) &&
        (!type || cardType === type);

      card.style.display = match ? "block" : "none";
    });
  }

  searchButton.addEventListener("click", filterCards);
});
