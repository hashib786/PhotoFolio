// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  setDoc,
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3tnBfdt7ZOS64xOw8CkFF8vmDg4DQaF8",
  authDomain: "photofolio-6631b.firebaseapp.com",
  projectId: "photofolio-6631b",
  storageBucket: "photofolio-6631b.appspot.com",
  messagingSenderId: "143128331581",
  appId: "1:143128331581:web:893250ab13aa27fc09b154",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const init = async () => {
  // Setting Data
  // const data = await setDoc(doc(db, "albums", "Infinite Dreams"), {
  //   "Infinite Dreams": "Infinite Dreams",
  // });
  // Getting Data
  // const data = await getDocs(collection(db, "albums"));
  // data.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });
  // Setting Images
  // Add a new document with a generated id.
  // const docRef = await addDoc(collection(db, "images"), {
  //   imageName: "Tokyo2",
  //   imageUrl: "https://stalwart-wisp-382f3c.netlify.app/assets/logo.png",
  //   album: "Infinite Dreams",
  // });
  // console.log("Document written with ID: ", docRef.id);
  // get images
  // const q = query(
  //   collection(db, "images"),
  //   where("album", "==", "Infinite Dreams")
  // );
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  // update Data
  // const washingtonRef = doc(db, "images", "bw5W1kenxDGRKUkE1hSY");
  // // Set the "capital" field of the city 'DC'
  // await updateDoc(washingtonRef, {
  //   imageName: "true",
  // });
  // await deleteDoc(doc(db, "images", "dxyvp4VxAumrWjt0EdyX"));
};
init();
