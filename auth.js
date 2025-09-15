import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc
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
  const identifierInput = document.getElementById("email"); // pseudo ou email
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logout");
  const signupBtn = document.getElementById("signup");
  const pseudoInput = document.getElementById("pseudo"); // champ à ajouter dans inscription.html
  const userInfo = document.getElementById("user-info");
  const goToSignup = document.getElementById("go-to-signup");

  // 🔗 Redirection vers inscription.html
  if (goToSignup) {
    goToSignup.addEventListener("click", () => {
      window.location.href = "inscription.html";
    });
  }

  // 🔐 Connexion avec pseudo ou email
  loginBtn.addEventListener("click", async () => {
    const identifier = identifierInput.value.trim();
    const password = passwordInput.value;

    let emailToUse = identifier;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    if (!isEmail) {
      try {
        const q = query(collection(db, "users"), where("pseudo", "==", identifier));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          alert("❌ Aucun utilisateur avec ce pseudo.");
          return;
        }

        const userData = snapshot.docs[0].data();
        emailToUse = userData.email;
      } catch (error) {
        alert("❌ Erreur lors de la recherche du pseudo : " + error.message);
        return;
      }
    }

    signInWithEmailAndPassword(auth, emailToUse, password)
      .then(() => alert("✅ Connecté !"))
      .catch(error => alert("❌ " + error.message));
  });

  // 🆕 Création de compte + enregistrement du pseudo
  if (signupBtn && pseudoInput) {
    signupBtn.addEventListener("click", async () => {
      const email = identifierInput.value.trim();
      const password = passwordInput.value;
      const pseudo = pseudoInput.value.trim();

      if (!pseudo) {
        alert("❌ Le pseudo est requis.");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email,
          pseudo
        });

        alert("✅ Compte créé et pseudo enregistré !");
      } catch (error) {
        alert("❌ " + error.message);
      }
    });
  }

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
