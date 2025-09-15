import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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

window.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logout");
  const userInfo = document.getElementById("user-info");
  const goToSignup = document.getElementById("go-to-signup");

  // 🔗 Redirection vers inscription.html
  if (goToSignup) {
    goToSignup.addEventListener("click", () => {
      window.location.href = "inscription.html";
    });
  }

  // 🔐 Connexion
  loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => alert("✅ Connecté !"))
      .catch(error => alert("❌ " + error.message));
  });

  // 🔓 Déconnexion
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => alert("✅ Déconnecté !"))
      .catch(error => alert("❌ " + error.message));
  });

  // 👤 État utilisateur
  onAuthStateChanged(auth, (user) => {
    if (user) {
      logoutBtn.style.display = "inline-block";
      loginBtn.style.display = "none";
      userInfo.innerHTML = `<p>Connecté en tant que <strong>${user.email}</strong></p>`;
    } else {
      logoutBtn.style.display = "none";
      loginBtn.style.display = "inline-block";
      userInfo.innerHTML = "<p>Tu n'es pas connecté.</p>";
    }
  });
});
