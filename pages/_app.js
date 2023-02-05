import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { auth, firestore } from '../lib/firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from '@/lib/context';


export default function App({ Component, pageProps }) {

  return (
    <UserContext.Provider value={{user: 'Nicole', username: 'nicolemejia'}}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </UserContext.Provider>
  );
}
