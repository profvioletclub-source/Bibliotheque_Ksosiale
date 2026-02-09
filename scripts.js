// 🔍 Recherche avancée
const searchBar = document.getElementById("search-bar");
const searchAuthor = document.getElementById("search-author");
const searchDate = document.getElementById("search-date");
const searchType = document.getElementById("search-type");
const searchButton = document.getElementById("search-button");

if (searchButton) {
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();

    const query = {
      title: searchBar?.value.trim() || "",
      author: searchAuthor?.value.trim() || "",
      date: searchDate?.value || "",
      type: searchType?.value || ""
    };

    localStorage.setItem("ksos_search", JSON.stringify(query));
    window.location.href = "recherche.html";
  });
}

// 🪟 Popup d’accueil + pseudo
window.addEventListener("load", () => {
  const popup = document.getElementById("popup-overlay");
  const closePopup = document.getElementById("close-popup");

  if (!sessionStorage.getItem("popupShown") && popup && closePopup) {
    popup.style.display = "flex";
    sessionStorage.setItem("popupShown", "true");

    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  const userAccess = document.getElementById("user-access");
  const pseudo = localStorage.getItem("ksosPseudo");
  if (userAccess && pseudo) {
    userAccess.textContent = pseudo;
  }
});

// 🧭 Sidebar (sécurisé)
const toggleBtn = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-sidebar");

if (toggleBtn && sidebar && closeBtn) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    toggleBtn.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
    toggleBtn.style.display = "inline-block";
  });
}

// 📖 Affiche un chapitre donné
function showChapter(id) {
  const chapters = document.querySelectorAll("main section[id]");
  chapters.forEach(ch => ch.classList.remove("active"));

  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
  }
}

// 📖 Initialise le système de chapitres
function initChapters() {
  const chapterSelect = document.getElementById("chapter-select");
  if (!chapterSelect) return;

  const chapters = Array.from(document.querySelectorAll("main section[id]"));
  if (chapters.length === 0) return;

  // Affiche le premier chapitre
  showChapter(chapters[0].id);

  // Change de chapitre quand on sélectionne dans le menu
  chapterSelect.addEventListener("change", () => {
    showChapter(chapterSelect.value);
  });
}

// 👉 Quand le DOM est prêt, on lance les chapitres
document.addEventListener("DOMContentLoaded", initChapters);
