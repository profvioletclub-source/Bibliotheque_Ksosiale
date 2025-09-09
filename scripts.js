// 🔥 Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// 🔧 Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAimK0CJsMXb1EqBtfqB36hrEunO4Ybk3c",
  authDomain: "bibliothequekassossiale.firebaseapp.com",
  projectId: "bibliothequekassossiale",
  storageBucket: "bibliothequekassossiale.firebasestorage.app",
  messagingSenderId: "1029476191647",
  appId: "1:1029476191647:web:4da50f87d9aacc635b81aa",
  measurementId: "G-83CKLXJJHD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 Authentification
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const userInfo = document.getElementById("user-info");

if (signupBtn && loginBtn && logoutBtn) {
  signupBtn.addEventListener("click", () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then(() => alert("Compte créé !"))
      .catch(error => alert(error.message));
  });

  loginBtn.addEventListener("click", () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then(() => alert("Connecté !"))
      .catch(error => alert(error.message));
  });

  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => alert("Déconnecté !"));
  });
}

// 🔄 État de connexion + chargement des favoris
onAuthStateChanged(auth, user => {
  if (user) {
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (signupBtn) signupBtn.style.display = "none";
    if (loginBtn) loginBtn.style.display = "none";
    if (userInfo) {
      userInfo.innerHTML = `<p>Connecté en tant que <strong>${user.email}</strong></p>`;
    }

    // ✅ Charge les favoris uniquement si la zone existe
    if (document.getElementById("favorites-list")) {
      loadFavorites();
    }
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "inline-block";
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (userInfo) {
      userInfo.innerHTML = "";
    }
  }
});

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
  searchButton.addEventListener("click", () => {
    const title = searchBar?.value.toLowerCase() || "";
    const author = searchAuthor?.value.toLowerCase() || "";
    const date = searchDate?.value || "";
    const type = searchType?.value || "";

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
  });
}

// 🔖 Ajout aux favoris
const favButtons = document.querySelectorAll(".fav-btn");

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
      alert("Connecte-toi pour ajouter aux favoris !");
      return;
    }

    const key = `favorites_${user.uid}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];

    if (!existing.some(f => f.link === story.link)) {
      existing.unshift(story);
      localStorage.setItem(key, JSON.stringify(existing));
      alert("Ajouté aux favoris !");
    } else {
      alert("Déjà dans tes favoris !");
    }
  });
});

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

    card.innerHTML = `
      <h3>${fav.title}</h3>
      <p><strong>Auteur :</strong> ${fav.author}</p>
      <p><strong>Date :</strong> ${fav.date}</p>
      <p><strong>Type :</strong> ${fav.type}</p>
      <a href="${fav.link}">Lire le texte</a>
    `;

    list.appendChild(card);
  });
}
