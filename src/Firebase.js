import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA7JLC43MJ1tidOX5WEq_9gGEbprdQdxeM",
  authDomain: "tribute-db.firebaseapp.com",
  databaseURL: "https://tribute-db.firebaseio.com",
  projectId: "tribute-db",
  storageBucket: "tribute-db.appspot.com",
  messagingSenderId: "810349477326",
  appId: "1:810349477326:web:e40309e54212b4fcfdbf9f",
  measurementId: "G-FX07892020",
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebase;
