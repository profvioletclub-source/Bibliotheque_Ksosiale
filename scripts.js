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
document.addEventListener("DOMContentLoaded", function () {
  const auth = firebase.auth();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signupBtn = document.getElementById("signup");
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logout");

  signupBtn.addEventListener("click", () => {
    auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(user => alert("Compte créé !"))
      .catch(error => alert(error.message));
  });

  loginBtn.addEventListener("click", () => {
    auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(user => alert("Connecté !"))
      .catch(error => alert(error.message));
  });

  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => alert("Déconnecté !"));
  });

  auth.onAuthStateChanged(user => {
    if (user) {
      logoutBtn.style.display = "inline-block";
      signupBtn.style.display = "none";
      loginBtn.style.display = "none";
    } else {
      logoutBtn.style.display = "none";
      signupBtn.style.display = "inline-block";
      loginBtn.style.display = "inline-block";
    }
  });
});
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

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

// 🔐 Connexion au formulaire
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");

signupBtn.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then(user => alert("Compte créé !"))
    .catch(error => alert(error.message));
});

loginBtn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then(user => alert("Connecté !"))
    .catch(error => alert(error.message));
});

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => alert("Déconnecté !"));
});

onAuthStateChanged(auth, user => {
  if (user) {
    logoutBtn.style.display = "inline-block";
    signupBtn.style.display = "none";
    loginBtn.style.display = "none";
  } else {
    logoutBtn.style.display = "none";
    signupBtn.style.display = "inline-block";
    loginBtn.style.display = "inline-block";
  }
});
