import { auth } from "./main.js";

// 📖 Bonne lecture
const links = document.querySelectorAll("main a");
links.forEach(link => {
  link.addEventListener("click", () => {
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

if (searchButton) {
  searchButton.addEventListener("click", (e) => {
    e.preventDefault(); // évite le comportement par défaut du lien

    const query = {
      title: searchBar?.value || "",
      author: searchAuthor?.value || "",
      date: searchDate?.value || "",
      type: searchType?.value || ""
    };

    localStorage.setItem("ksos_search", JSON.stringify(query));
    window.location.href = "recherche.html";
  });
}

// 🔖 Ajout ou retrait des favoris + mise à jour visuelle
let favButtons = [];
function refreshFavButtons() {
  favButtons = document.querySelectorAll(".fav-btn");
  favButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".fic-card");
      if (!card) return;

      const story = {
        title: card.getAttribute("data-title"),
        author: card.getAttribute("data-author"),
        date: card.getAttribute("data-date"),
        type: card.getAttribute("data-type"),
        link: card.querySelector("a")?.getAttribute("href")
      };

      const user = auth.currentUser;
      if (!user) {
        alert("Connecte-toi pour gérer tes favoris !");
        return;
      }

      const key = `favorites_${user.uid}`;
      let favorites = JSON.parse(localStorage.getItem(key)) || [];
      const index = favorites.findIndex(f => f.link === story.link);

      if (index === -1) {
        favorites.unshift(story);
        alert("Ajouté aux favoris !");
      } else {
        favorites.splice(index, 1);
        alert("Retiré des favoris !");
      }

      localStorage.setItem(key, JSON.stringify(favorites));
      updateFavButtonState();
    });
  });
}

function updateFavButtonState() {
  const user = auth.currentUser;
  if (!user) return;

  const key = `favorites_${user.uid}`;
  const favorites = JSON.parse(localStorage.getItem(key)) || [];

  favButtons.forEach(btn => {
    const card = btn.closest(".fic-card");
    const link = card.querySelector("a")?.getAttribute("href");
    const isFavorited = favorites.some(f => f.link === link);

    btn.classList.toggle("favorited", isFavorited);
    btn.title = isFavorited ? "Retirer des favoris" : "Ajouter aux favoris";
  });
}

// 📚 Affichage des favoris
function loadFavorites() {
  const user = auth.currentUser;
  if (!user) return;

  const key = `favorites_${user.uid}`;
  const favorites = JSON.parse(localStorage.getItem(key)) || [];

  const list = document.getElementById("favorites-list");
  if (!list) return;

  list.innerHTML = "";

  favorites.forEach(fav => {
    const card = document.createElement("div");
    card.className = "fic-card";
    card.setAttribute("data-title", fav.title);
    card.setAttribute("data-author", fav.author);
    card.setAttribute("data-date", fav.date);
    card.setAttribute("data-type", fav.type);

    card.innerHTML = `
      <h3>${fav.title}</h3>
      <button class="fav-btn" title="Retirer des favoris">🔖</button>
      <p><strong>Auteur :</strong> ${fav.author}</p>
      <p><strong>Date :</strong> ${fav.date}</p>
      <p><strong>Type :</strong> ${fav.type}</p>
      <a href="${fav.link}">Lire le texte</a>
    `;

    list.appendChild(card);
  });
  refreshFavButtons();
}

window.addEventListener("load", () => {
  const popup = document.getElementById("popup-overlay");
  const closeBtn = document.getElementById("close-popup");

  if (!sessionStorage.getItem("popupShown") && popup && closeBtn) {
    popup.style.display = "flex";
    sessionStorage.setItem("popupShown", "true");

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }
});
