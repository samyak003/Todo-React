import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
  // firebase config
  });
  
const db = firebaseApp.firestore();

export default db;