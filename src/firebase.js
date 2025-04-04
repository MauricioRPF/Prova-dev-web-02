  // src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc 
} from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDIoN4nmIDGWTh83a3fLIlEdggsGlSZqTA", 
  authDomain: "mercadinho-6212a.firebaseapp.com",  
  projectId: "mercadinho-6212a",  
  storageBucket: "mercadinho-6212a.firebasestorage.app",
  messagingSenderId: "962343823023",  
  appId: "1:962343823023:web:9c6612668864b6fbe1565a"

};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar tudo necessário
export { 
  db,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc 
};