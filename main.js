import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

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
const db = getFirestore(app);

window.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signupBtn = document.getElementById("signup");
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logout");
  const userInfo = document.getElementById("user-info");
  const goToSignup = document.getElementById("go-to-signup");

  if (goToSignup) {
    goToSignup.addEventListener("click", () => {
      window.location.href = "inscription.html";
    });
  }

  if (signupBtn && loginBtn && logoutBtn && emailInput && passwordInput) {
    signupBtn.addEventListener("click", () => {
      createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(() => alert("✅ Compte créé !"))
        .catch(error => alert("❌ " + error.message));
    });

    loginBtn.addEventListener("click", () => {
      signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(() => alert("✅ Connecté !"))
        .catch(error => alert("❌ " + error.message));
    });

    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          alert("✅ Déconnecté !");
          location.reload();
        })
        .catch(error => alert("❌ Erreur : " + error.message));
    });
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      logoutBtn.style.display = "inline-block";
      signupBtn.style.display = "none";
      loginBtn.style.display = "none";

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const data = userDoc.data();

        userInfo.innerHTML = `
          <p>👋 Bonjour <strong>${data?.prenom || ""} ${data?.nom || ""}</strong> !</p>
          <p>Pseudo : ${data?.pseudo || "—"}</p>
          <p>Email : ${user.email}</p>
        `;
      } catch (e) {
        userInfo.innerHTML = `<p>Connecté en tant que <strong>${user.email}</strong></p>`;
      }
    } else {
      logoutBtn.style.display = "none";
      signupBtn.style.display = "inline-block";
      loginBtn.style.display = "inline-block";
      userInfo.innerHTML = "<p>Tu n'es pas connecté.</p>";
    }
  });
});
