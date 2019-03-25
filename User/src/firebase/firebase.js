import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCwbLRjuYQfYicumkgrxzMk-yemcnELx0M",
  authDomain: "saylani-project-a038e.firebaseapp.com",
  databaseURL: "https://saylani-project-a038e.firebaseio.com",
  projectId: "saylani-project-a038e",
  storageBucket: "saylani-project-a038e.appspot.com",
  messagingSenderId: "942878374941"
};





firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();


const database = firebase.database();
const firestore = firebase.firestore();

export {
  auth,
  database,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
  firestore
};