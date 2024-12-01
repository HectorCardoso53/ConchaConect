// Importando as dependências corretas do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDnvExXM9Or3UDeVLo8MeSu0dj_1upkbWQ",
  authDomain: "conchaorixi.firebaseapp.com",
  projectId: "conchaorixi",
  storageBucket: "conchaorixi.appspot.com",
  messagingSenderId: "255294431730",
  appId: "1:255294431730:web:6ba5473e9ddd49d0510b6b"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig); // Inicializa o Firebase apenas uma vez
const auth = getAuth(app);  // Instância de autenticação
const db = getFirestore(app); // Instância do Firestore

// Função de Login
export async function signIn(email, password) {
  try {
    console.log("Tentando fazer login com:", email, password);  // Para verificar os dados

    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Confirma se o login foi realizado com sucesso
    console.log("Login realizado com sucesso:", userCredential);
    alert("Login realizado com sucesso!");

    // Redireciona para a página de conteúdo
    window.location.href = "conteudo.html";  
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    
    // Exibe mensagens de erro mais específicas
    if (error.code === "auth/invalid-email") {
      alert("O email fornecido é inválido.");
    } else if (error.code === "auth/wrong-password") {
      alert("A senha fornecida está incorreta.");
    } else if (error.code === "auth/user-not-found") {
      alert("Nenhum usuário encontrado com esse email.");
    } else {
      alert("Erro ao fazer login: " + error.message);  // Exibe o erro genérico
    }

    console.log("Erro de código:", error.code);  // Exibe o código do erro
    console.log("Mensagem de erro:", error.message);  // Exibe a mensagem detalhada
  }
}

// Função de Cadastro
export async function signUp(name, email, password) {
  try {
    console.log("Tentando criar conta com:", name, email);  // Para verificar os dados que estão sendo enviados

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
  
    console.log("Usuário criado:", userCredential.user);
    console.log("Email do usuário:", userCredential.user.email);
    console.log("ID do usuário:", userCredential.user.uid);

    // Cria o documento do usuário no Firestore
    await setDoc(doc(db, "users", userId), {
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
    });

    console.log("Documento do usuário criado no Firestore com sucesso!");  // Para garantir que o documento foi criado

    alert("Conta criada com sucesso!");
    window.location.href = "login.html";  // Redireciona para a página de login
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    
    // Exibe mensagens de erro específicas ao criar conta
    if (error.code === "auth/email-already-in-use") {
      alert("Este email já está em uso. Tente outro.");
    } else if (error.code === "auth/weak-password") {
      alert("A senha deve ter pelo menos 6 caracteres.");
    } else {
      alert("Erro ao criar conta: " + error.message);  // Exibe o erro genérico
    }
  }
}
