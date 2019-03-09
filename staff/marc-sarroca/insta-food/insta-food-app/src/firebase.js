import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyD-7BHxtwjHO7nuwj_t5Omfo2BQuw8ggV0",
  authDomain: "insta-food-cfe9d.firebaseapp.com",
  databaseURL: "https://insta-food-cfe9d.firebaseio.com",
  projectId: "insta-food-cfe9d",
  storageBucket: "insta-food-cfe9d.appspot.com",
  messagingSenderId: "824883959779"
});

const storage = firebase.storage();

export default storage;
