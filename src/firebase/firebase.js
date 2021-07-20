import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.GATSBY_API_KEY,
  authDomain: process.env.GATSBY_AUTH_DOMAIN,
  projectId: process.env.GATSBY_PROJECT_ID,
  storageBucket: process.env.GATSBY_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_APP_ID,
  measurementId: process.env.GATSBY_MEASURMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();