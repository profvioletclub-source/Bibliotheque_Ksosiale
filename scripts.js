alert("JS chargé");

// 🔍 Recherche avancée
const searchBar = document.getElementById("search-bar");
const searchAuthor = document.getElementById("search-author");
const searchDate = document.getElementById("search-date");
const searchType = document.getElementById("search-type");
const searchButton = document.getElementById("search-button");

if (searchButton) {
  searchButton.addEventListener("click", (e) => {
    e.preventDefault(); // évite le comportement par défaut du lien

    const query = {
      title: searchBar?.value.trim() || "",
      author: searchAuthor?.value.trim() || "",
      date: searchDate?.value || "",
      type: searchType?.value || ""
    };

    // 🔍 Log pour test visuel (optionnel sur iPad)
    console.log("🔍 Requête enregistrée :", query);

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
  // 👤 Affichage du pseudo utilisateur connecté sans modifier le lien
  const userAccess = document.getElementById("user-access");
  const pseudo = localStorage.getItem("ksosPseudo");

  if (userAccess && pseudo) {
    userAccess.textContent = pseudo;
  }
});

const toggleBtn = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
  toggleBtn.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
  toggleBtn.style.display = "inline-block";
});

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

  // 👉 On ignore la valeur du select au chargement
  // On affiche TOUJOURS le premier chapitre
  const firstId = chapters[0].id;
  showChapter(firstId);

  // 👉 Quand l’utilisateur change le select, là on suit sa valeur
  chapterSelect.addEventListener("change", () => {
    showChapter(chapterSelect.value);
  });
}

// Le script est en bas du body → on peut appeler directement
initChapters();
