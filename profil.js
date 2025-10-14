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

// ✅ Configuration Firebase
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

// ✅ Éléments DOM
const identifierInput = document.getElementById("identifier");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const signupBtn = document.getElementById("go-to-signup");
const userInfo = document.getElementById("user-info");
const debugZone = document.getElementById("debug");

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
        debugZone.innerHTML = `<p style="color:red;">❌ Aucun utilisateur trouvé avec le pseudo : <strong>${identifier}</strong></p>`;
        return;
      }

      const userData = snapshot.docs[0].data();
      emailToUse = userData.email;
    } catch (error) {
      debugZone.innerHTML = `<p style="color:red;">❌ Erreur Firestore : ${error.message}</p>`;
      return;
    }
  }

  try {
    await signInWithEmailAndPassword(auth, emailToUse, password);
  } catch (error) {
    debugZone.innerHTML = `<p style="color:red;">❌ Erreur de connexion : ${error.message}</p>`;
  }
});

// 🔓 Déconnexion
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  userInfo.innerHTML = `<p style="color:red;">❌ Tu es maintenant déconnecté.</p>`;
  logoutBtn.style.display = "none";
  loginBtn.style.display = "inline-block";
  localStorage.removeItem("ksosPseudo");
});

signupBtn.addEventListener("click", () => {
  window.location.href = "inscription.html";
});

// 👤 État utilisateur
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // 🔒 L'utilisateur est connecté
    try {
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        userInfo.innerHTML = `<p>Connecté en tant que <strong>${data.pseudo}</strong></p>`;
        localStorage.setItem("ksosPseudo", data.pseudo);
      } else {
        userInfo.innerHTML = `<p>Connecté en tant que <strong>${user.email}</strong></p>`;
        localStorage.setItem("ksosPseudo", user.email);
      }
    } catch (error) {
      userInfo.innerHTML = `<p>Connecté (erreur lors du chargement du pseudo)</p>`;
      localStorage.setItem("ksosPseudo", user.email);
    }

    // ✅ Masquer le formulaire et le bouton "Créer un compte"
    identifierInput.style.display = "none";
    passwordInput.style.display = "none";
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";

  } else {
    // 🔓 L'utilisateur n'est pas connecté
    userInfo.innerHTML = `<p style="color:red;">❌ Tu n'es pas connecté.</p>`;
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
    identifierInput.style.display = "inline-block";
    passwordInput.style.display = "inline-block";
    localStorage.removeItem("ksosPseudo");
  }
});
