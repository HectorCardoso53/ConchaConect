import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDnvExXM9Or3UDeVLo8MeSu0dj_1upkbWQ",
  authDomain: "conchaorixi.firebaseapp.com",
  projectId: "conchaorixi",
  storageBucket: "conchaorixi.appspot.com",
  messagingSenderId: "255294431730",
  appId: "1:255294431730:web:6ba5473e9ddd49d0510b6b"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export default app; // Exporta o app Firebase para ser usado em outros arquivos


