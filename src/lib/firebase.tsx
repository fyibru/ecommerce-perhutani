import { initializeApp, getApps } from 'firebase/app'
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCx_cd2OoQPZ2PMY7h_VI5GmDQ5CKzBDF0",
  authDomain: "kphshop-b3dd9.firebaseapp.com",
  projectId: "kphshop-b3dd9",
  storageBucket: "kphshop-b3dd9.firebasestorage.app",
  messagingSenderId: "831106445810",
  appId: "1:831106445810:web:f1daadf26c5c38cca8bb6b",
  measurementId: "G-DZ38S1Y7HH"
}

// initialize cfg
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

export { auth, db, googleProvider, signInWithPopup }