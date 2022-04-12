import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBC1Re4rhaHpXGROexDP4i2GGpMFXsduUQ",
    authDomain: "aera-63506.firebaseapp.com",
    databaseURL: "https://aera-63506-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "aera-63506",
    storageBucket: "aera-63506.appspot.com",
    messagingSenderId: "1010724120628",
    appId: "1:1010724120628:web:aa1e973cfcea578d0f8261",
    measurementId: "G-6SGD2SZ59W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbRef = ref(db);


export { auth, db, dbRef };