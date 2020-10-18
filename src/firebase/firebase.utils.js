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

  export const createUserProfileDocument = async (userAuth, additionalData) => { //userAuth is the Google User object
      if(!userAuth) return;
      const userRef = firestore.doc(`users/${userAuth.uid}`); // This is a doc ref object. Even if there is no existing doc in the firestore, it will always return either a query ref object or query snapshot obj.
      // Query Ref is the current place in the firestore database that we are querying. It can be doc ref or collection ref. It has no actual data, it only has properties or methods to get the Snapshot obj
      // Doc ref obj is used to perform CRUD. Since doc ref can only have methods, they have the follwing methods: .set(), .get(), .update() or .delete(). We can also add documents to collections using the collection Ref object using the .add() method on it.
      // By using the .get() method, we can pull a snapshot Obj of the ref Obj . Eg: docRef.get() or collectionRef.get(). docRef returns a doc snapshot obj and collection ref returns a query snapshot obj
      const snapshot = await userRef.get(); // the doc snapshot obj has a property called "exists". It tells us if there is any data or not.
      //the doc snapshot obj also has a property called ".data()", which we can use to get the actual properties on the obj present in our db, which returns a JSON obj of the doc.
      if(!snapshot.exists){ //If snapshot.exists is true, it means there is data and we have already stored the user object. If not, then we create the data in the doc. That's all this code is doing.
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