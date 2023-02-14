import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAjpomw5TAdS2TtOWQMvv5RIEvmSFQHY2w",
  authDomain: "free-box-pwa.firebaseapp.com",
  projectId: "free-box-pwa",
  storageBucket: "free-box-pwa.appspot.com",
  messagingSenderId: "848118871944",
  appId: "1:848118871944:web:07c326b3b7bae1a0bd2c3d"
};


const app = firebase.initializeApp(firebaseConfig)

// auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// storage exports
export const storage = getStorage(app);
// export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

// helper functions 

/**
 * converts a firestore document to JSON
 * @param {DocumentSnapshot} doc 
 */

export function itemToJSON(doc) {
  const data = doc.data();
  return {
      ...data,
      createdAt: data?.createdAt.toMillis() || 0,
      updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

/**
 * get user doc with username from /[username]
 * @param {string} username 
 */

export async function getUserWithUsername(username) {
  // reference users collection
  const userRef = firestore.collection('users');

  // use username to find match in users collection
  const query = userRef.where('username', '==', username).limit(1);

  // get match
  const userDoc = (await query.get()).docs[0];

  // return user doc 
  return userDoc;
};