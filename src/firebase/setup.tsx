import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA_V3dtQpnGnLPRlDl1sbhL_PoERv1VxhY",
  authDomain: "olx-clone-42bb6.firebaseapp.com",
  projectId: "olx-clone-42bb6",
  storageBucket: "olx-clone-42bb6.firebasestorage.app",
  messagingSenderId: "257570361975",
  appId: "1:257570361975:web:c8af067b76fdb4223a2c72"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider =new GoogleAuthProvider()
export const db = getFirestore(app); 
export const storage = getStorage(app)