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
  // Query Ref is the current place in the firestore database that we are querying. It can be doc ref(firestore.doc('/users/:userId')) or collection ref(firestore.collections('/users)). It has no actual data, it only has properties or methods to get the Snapshot obj
  // Doc ref obj is used to perform CRUD. Since doc ref can only have methods, they have the follwing methods: .set(), .get(), .update() or .delete(). We can also add documents to collections using the collection Ref object using the .add() method on it.
  // By using the .get() method, we can pull a snapshot Obj of the ref Obj . Eg: docRef.get() or collectionRef.get(). docRef returns a doc snapshot obj and collection ref returns a collection snapshot obj. But the collection snapshot obj is called the query snapshot obj.
  const snapshot = await userRef.get(); // the doc snapshot obj has a property called "exists", which allows us to check if a document exists at this query. Basically, it tells us if there is any data or not.
  //the doc snapshot obj also has a property called ".data()", which we can use to get the actual properties on the obj present in our db, which returns a JSON obj of the doc.
  //Query snapshot or collection snapshot obj has properties such as docs, empty and size. 
  //const collectionRef = firestore.collection('users')
  //const collectionSnapshot = collectionRef.get() 
  // collectionSnapshot.docs would give us an array of docs inside of our collection but they will be doc snapshot objects. So basically an array of doc snapshot objs.
  //collectionSnapshot.empty just checks if our query is empty or not. collectionSnapshot.size gives us how many objs are inside the collection
  //
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
    // console.log('firebase userRef',userRef)
  return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => { //This util was only used once to transfer SHOP_DATA to firebase.
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); //Calling .doc() with no id inside means firestore will generate a unique id itself for this docRef.
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => { //this fn takes param of a collection Snapshot obj
  const transformedCollection = collections.docs.map(doc => { //collection snapshot obj has an array of doc snapshot objs contained inside a .doc property
    const { title, items } = doc.data(); //The data inside the doc snapshot obj can be accessed by using the .data method 
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  })
  // console.log('transformed',transformedCollection) //It is an array right now like so, [{...},{...},{...},{...},{...}]. Each obj is like: {routeName,id,title,items}
  return transformedCollection.reduce((accumulator, collection)=>{  
    //This transforms the array into an obj such as: {'hats': {title:'hats', items:[]},'jackets':{title:'jackets', items:[]} } 
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } ,{})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

firebase.initializeApp(config);

export const auth = firebase.auth();  
export const firestore = firebase.firestore(); 

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt:'select_account' })
// export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;