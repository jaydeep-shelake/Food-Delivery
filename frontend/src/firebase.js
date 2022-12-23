import { initializeApp } from "firebase/app"
// import "firebase/firebase-storage"
import { getFirestore, serverTimestamp } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(
    {
      apiKey: "AIzaSyCpm-D0Qi5--F5LAeYhAbA7ySTodniEQZk",
      authDomain: "riocafe-d1983.firebaseapp.com",
      projectId: "riocafe-d1983",
      storageBucket: "riocafe-d1983.appspot.com",
      messagingSenderId: "753576064002",
      appId: "1:753576064002:web:cc28b4d82b5cf20ae4231b"
    }
);

 export const firestore = getFirestore(firebaseApp)
 export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)
 export const db={
    pizzas:'allProducts',
    
    formatedDoc:doc=>{
      return{id:doc.id,...doc.data()}
    },
    getCurrentTimeStamp:serverTimestamp,
  }