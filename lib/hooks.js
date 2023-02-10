import { useState, useEffect } from 'react';
import { useAuthState, onAuthStateChanged } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../lib/firebase';

export function useUserData() {
  // listens to current user in firebase
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
  // used to turn off realtime subscription when no longer needed
    let unsubscribe;

    auth.onAuthStateChanged((user) =>
    {
      if (user) {
        const userRef = firestore.collection('users').doc(user.uid);
        unsubscribe = userRef.onSnapshot((doc) => {
          setUsername(doc.data()?.username);
        });
      } else {
        setUsername(null);
      }
    })

    return unsubscribe;
  }, [user]);

  return { user, username };
}