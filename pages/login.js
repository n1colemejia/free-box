import 'reactjs-popup/dist/index.css';

import NavBar from '@/components/NavBar';
import { Input, Button, Text } from '@nextui-org/react';
import Popup from 'reactjs-popup';

import { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/lib/context';

import { auth, firestore, googleAuthProvider } from 'lib/firebase';
import debounce from 'lodash.debounce';

export default function LoginPage(props) {
  // state
  const [openPopup, setOpenPopup] = useState(false);
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // router 
  const router = useRouter();

  // context
  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // reference user & username docs
    const userRef = firestore.doc(`users/${user.uid}`);
    const usernameRef = firestore.doc(`usernames/${formValue}`);

    // commit both together as batch write
    const batch = firestore.batch();
    batch.set(userRef, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameRef, { uid: user.uid });

    await batch.commit();
  };
  
  // check formValue is in correct format
  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }

  };

  // handle user log in 
  const handleLogInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
    .then(() => {
      username ? setOpenPopup(false) : setOpenPopup(true);
    })
    .then(() => {
      router.push('/');
    })
  }

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // check firestore for username match/availability
  // debounce waits until user stops typing
  // useCallback required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const usernameRef = firestore.doc(`usernames/${username}`);
        const { exists } = await usernameRef.get();
        console.log('firestore read executed');

        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []);

    // open username form pop up event handler
    const handlePopup = () => {
      setOpenPopup(!openPopup);
    }

  // feedback for username availability/validity
  const usernameMessage = () => {
    if (loading) {
      return `Hmm...lets see...`;
    } else if (isValid) {
      return `How unique. ${formValue} is all yours.`;
    } else if (formValue && !isValid) {
      return 'SHES TAKEN TRY AGAIN';
    } else {
      return '';
    }
  };

  return (
    <main>
      <NavBar 
        handleLogInWithGoogle={handleLogInWithGoogle}
      />
      <Popup 
        open={openPopup}
        closeOnDocumentClick onClose={() => handlePopup()}
        >
          <form onSubmit={onSubmit}>
            <input 
              name='username'
              placeholder='username'
              value={formValue}
              onChange={onChange}
            />
            <br />
            {usernameMessage()}
            <Button type='submit' disabled={!isValid}>I want it!</Button>
          </form>
      </Popup>
    </main>
  );
}