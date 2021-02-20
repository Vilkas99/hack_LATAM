  
import firebase from "firebase/app";
import "firebase/auth";
import "@firebase/firestore";

const app = firebase.initializeApp({    
        apiKey: "AIzaSyB-V386IWyniZoFnWfkJTk_PtshdvsSc7I",
        authDomain: "treehacks-b13b9.firebaseapp.com",
        projectId: "treehacks-b13b9",
        storageBucket: "treehacks-b13b9.appspot.com",
        messagingSenderId: "941776148694",
        appId: "1:941776148694:web:5f1c6c0483d8b632881177",
        measurementId: "G-N7NQ053VTF"
})

export const auth = app.auth();
export const db = firebase.firestore();
export default app;