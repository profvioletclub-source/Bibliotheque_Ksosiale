document.body.insertAdjacentHTML("beforeend", "<p style='color:red;'>✅ Script exécuté</p>");

// 🔥 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// 📧 EmailJS
//import emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js";
//emailjs.init("2fXXjggeS5m1IIYFu");

// 🔧 Config
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

document.body.insertAdjacentHTML("beforeend", "<p style='color:green;'>✅ Firebase initialisé</p>");
document.body.insertAdjacentHTML("beforeend", "<p style='color:red;'>✅ main.js chargé</p>");

// 🔐 Authentification
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const userInfo = document.getElementById("user-info");

if (signupBtn && loginBtn && logoutBtn && emailInput && passwordInput) {
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
  document.body.insertAdjacentHTML("beforeend", `<p style='color:purple;'>👤 Utilisateur connecté : ${user ? user.email : "aucun"}</p>`);

  if (user) {
    logoutBtn.style.display = "inline-block";
    signupBtn.style.display = "none";
    loginBtn.style.display = "none";
    userInfo.innerHTML = `<p>Connecté en tant que <strong>${user.email}</strong></p>`;
    updateFavButtonState();
    loadFavorites();
  } else {
    logoutBtn.style.display = "none";
    signupBtn.style.display = "inline-block";
    loginBtn.style.display = "inline-block";
    userInfo.innerHTML = "";
  }
});

// 🔖 Favoris
function updateFavButtonState() {
  const user = auth.currentUser;
  if (!user) return;

  const key = `favorites_${user.uid}`;
  const favorites = JSON.parse(localStorage.getItem(key)) || [];

  document.querySelectorAll(".fav-btn").forEach(btn => {
    const card = btn.closest(".fic-card");
    const link = card.querySelector("a")?.getAttribute("href");
    const isFavorited = favorites.some(f => f.link === link);

    btn.classList.toggle("favorited", isFavorited);
    btn.title = isFavorited ? "Retirer des favoris" : "Ajouter aux favoris";
  });
}

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
      <button class="fav-btn" title="Retirer des favoris">🔖</button>
      <p><strong>Auteur :</strong> ${fav.author}</p>
      <p><strong>Date :</strong> ${fav.date}</p>
      <p><strong>Type :</strong> ${fav.type}</p>
      <a href="${fav.link}">Lire le texte</a>
    `;
    list.appendChild(card);
  });

  updateFavButtonState();
}

// 📬 Formulaire de contact
const contactForm = document.getElementById("contact-form");
const mailStatus = document.getElementById("mail-status");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) {
    mailStatus.textContent = "❌ Tu dois être connecté pour envoyer un message.";
    return;
  }

  const templateParams = {
    from_email: document.getElementById("from_email").value,
    message: document.getElementById("message").value,
    user_uid: user.uid,
    user_email: user.email
  };

  emailjs.send("TON_SERVICE_ID", "TON_TEMPLATE_ID", templateParams)
    .then(() => {
      mailStatus.textContent = "✅ Message envoyé avec succès !";
      contactForm.reset();
    })
    .catch((error) => {
      mailStatus.textContent = "❌ Échec de l'envoi : " + error.text;
    });
});


signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const pseudo = document.getElementById("pseudo").value;
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Stocker les infos dans Firestore
    await setDoc(doc(db, "users", uid), {
      nom,
      prenom,
      email,
      pseudo
    });

    alert("Compte créé !");
    window.location.href = "profil.html";
  } catch (error) {
    alert(error.message);
  }
});
