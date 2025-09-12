import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
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

document.body.insertAdjacentHTML("beforeend", `<p style='color:green;'>✅ Firebase initialisé dans profil.js</p>`);
document.body.insertAdjacentHTML("beforeend", "<p style='color:red;'>✅ profil.js chargé</p>");
document.body.insertAdjacentHTML("beforeend", `<p style='color:blue;'>🔐 Auth reçu : ${auth ? "oui" : "non"}</p>`);

// 🔐 Authentification
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const userInfo = document.getElementById("user-info");

if (logoutBtn) {
  document.body.insertAdjacentHTML("beforeend", "<p style='color:green;'>✅ Bouton logout détecté</p>");
}

if (signupBtn && loginBtn && logoutBtn && emailInput && passwordInput) {
  signupBtn.insertAdjacentHTML("afterend", "<p style='color:orange;'>🧪 Bouton 'Créer un compte' actif</p>");
  signupBtn.addEventListener("click", () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then(() => alert("Compte créé !"))
      .catch(error => alert(error.message));
  });

  loginBtn.insertAdjacentHTML("afterend", "<p style='color:orange;'>🧪 Bouton 'Se connecter' actif</p>");
  loginBtn.addEventListener("click", () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then(() => alert("Connecté !"))
      .catch(error => alert(error.message));
  });

  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => alert("Déconnecté !"))
      .catch(error => alert("Erreur de déconnexion : " + error.message));
  });
}

// 🔄 État de connexion
onAuthStateChanged(auth, user => {
  document.body.insertAdjacentHTML("beforeend", `<p style='color:purple;'>👤 Utilisateur connecté : ${user ? user.email : "aucun"}</p>`);

  if (user) {
    logoutBtn.style.display = "inline-block";
    signupBtn.style.display = "none";
    loginBtn.style.display = "none";
    userInfo.innerHTML = `<p>Connecté en tant que <strong>${user.email}</strong></p>`;
  } else {
    logoutBtn.style.display = "none";
    signupBtn.style.display = "inline-block";
    loginBtn.style.display = "inline-block";
    userInfo.innerHTML = "<p>Tu n'es pas connecté.</p>";
  }
});
