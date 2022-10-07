import { initializeApp } from "firebase/app"
// import "firebase/firebase-storage"
import { getFirestore, serverTimestamp } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(
    {
        apiKey: "AIzaSyBt7OBxloR5msnBLguu_ismttaIz4OL_wo",
  authDomain: "ora-web-14023.firebaseapp.com",
  projectId: "ora-web-14023",
  storageBucket: "ora-web-14023.appspot.com",
  messagingSenderId: "1057140990013",
  appId: "1:1057140990013:web:596ef7112d9afc39b24a54"
    }
);

 export const firestore = getFirestore(firebaseApp)
 export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)
 export const db={
    pizzas:'pizzas',
    
    formatedDoc:doc=>{
      return{id:doc.id,...doc.data()}
    },
    getCurrentTimeStamp:serverTimestamp,
  }