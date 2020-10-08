import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCvo_259ZzJSNktWGE7nQeZ9ah6YC8JO0I",
    authDomain: "e-store-9c4e7.firebaseapp.com",
    databaseURL: "https://e-store-9c4e7.firebaseio.com",
    projectId: "e-store-9c4e7",
    storageBucket: "e-store-9c4e7.appspot.com",
    messagingSenderId: "646772633973",
    appId: "1:646772633973:web:4230c0520b406bc914e33c",
    measurementId: "G-KH81ZN1GLY"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;
      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapshot = await userRef.get();

      if(!snapshot.exists){
          const { email, displayName } = userAuth;
          const createdAt = new Date();
          try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
          }  catch(error){
                console.log('error creating user', error.message)
          }
        }
        return userRef;
    }

  firebase.initializeApp(config);

  export const auth = firebase.auth();  
  export const firestore = firebase.firestore(); 

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt:'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;