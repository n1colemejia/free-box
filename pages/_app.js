import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';

export default function App({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </UserContext.Provider>
  );
}
