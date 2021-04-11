import firebase from 'firebase'


 var firebaseConfig = {
  apiKey: "AIzaSyBUhhCHYKuNwqt64MOIAPhmVdIAH7n7ktg",
  authDomain: "decent-store-b5e33.firebaseapp.com",
  projectId: "decent-store-b5e33",
  storageBucket: "decent-store-b5e33.appspot.com",
  messagingSenderId: "410724723128",
  appId: "1:410724723128:web:96243adbb5fb4c16f6074d",
  measurementId: "G-540DS0V8VR"
  };
  // Initialize Firebase
  const fire=firebase.initializeApp(firebaseConfig);
  export default fire;