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

onAuthStateChanged(auth, async (user) => {
  const userInfo = document.getElementById("user-info");
  const logoutBtn = document.getElementById("logout");
  const loginBtn = document.getElementById("login");

  if (user) {
    // 🔍 Récupérer le pseudo depuis Firestore
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        userInfo.innerHTML = `<p>✅ Connecté en tant que <strong>${data.pseudo}</strong></p>`;
      } else {
        userInfo.innerHTML = `<p>✅ Connecté en tant que <strong>${user.email}</strong></p>`;
      }
    } catch (error) {
      userInfo.innerHTML = `<p>✅ Connecté (erreur lors du chargement du pseudo)</p>`;
    }

    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
  } else {
    userInfo.innerHTML = `<p style="color:red;">❌ Tu n'es pas connecté.</p>`;
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
  }
});

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

