// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDE19QISs3qu1LtalwRbPbILDcB_ZTa_xU",
    authDomain: "video-queuing.firebaseapp.com",
    databaseURL: "https://video-queuing-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "video-queuing",
    storageBucket: "video-queuing.appspot.com",
    messagingSenderId: "2880770714",
    appId: "1:2880770714:web:3b31997d2c860a3ab6c523",
    measurementId: "G-5ZYY6GQQS0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
