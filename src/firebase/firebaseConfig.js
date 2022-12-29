import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByN-eKneb5KfF0_Fk-puTmVW4LX3KkcL8",
  authDomain: "kcau-4bc01.firebaseapp.com",
  projectId: "kcau-4bc01",
  storageBucket: "kcau-4bc01.appspot.com",
  messagingSenderId: "742718437163",
  appId: "1:742718437163:web:e9f9b0f73eaec373fb776e"
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

export default storage


