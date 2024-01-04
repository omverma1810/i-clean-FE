import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAzJpczlRWl3SgJfPnrYjY0g_AyH-zuqng',
  authDomain: 'madhuri-iclean.firebaseapp.com',
  projectId: 'madhuri-iclean',
  storageBucket: 'madhuri-iclean.appspot.com',
  messagingSenderId: '805256825064',
  appId: "1:805256825064:web:578c5fc66e4422f517a15d",
  measurementId: "G-GS74TXK9B0"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
