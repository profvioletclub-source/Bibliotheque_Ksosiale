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

// 🪟 Popup d’accueil
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
