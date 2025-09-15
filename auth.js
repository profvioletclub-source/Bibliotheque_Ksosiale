import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
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
  const identifierInput = document.getElementById("identifier");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("login");
  const debugZone = document.getElementById("debug");

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
          debugZone.innerHTML = `<p style="color:red;">❌ Aucun utilisateur trouvé avec le pseudo : <strong>${identifier}</strong></p>`;
          return;
        }

        const userData = snapshot.docs[0].data();
        emailToUse = userData.email;

        debugZone.innerHTML = `<p style="color:green;">✅ Pseudo reconnu : <strong>${userData.pseudo}</strong><br>Email associé : ${emailToUse}</p>`;
      } catch (error) {
        debugZone.innerHTML = `<p style="color:red;">❌ Erreur Firestore : ${error.message}</p>`;
        return;
      }
    }

    try {
      await signInWithEmailAndPassword(auth, emailToUse, password);
      debugZone.innerHTML += `<p style="color:blue;">🔐 Connexion réussie !</p>`;
    } catch (error) {
      debugZone.innerHTML += `<p style="color:red;">❌ Erreur de connexion : ${error.message}</p>`;
    }
  });
});

