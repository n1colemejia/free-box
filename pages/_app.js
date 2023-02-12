import styles from '@/styles/globals.css'
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';
import { NextUIProvider } from '@nextui-org/react';

// const globalStyles = globalCss({
//   body: {
//     backgroundColor: '#DAC8AF',
//   }
// });

// const theme = createTheme({
//   type: 'light',
//   theme: {
//     colors: {
//       // brand colors
//       primaryLight: '#FAE7D2',
//       primaryLightHover: '#F0D2B6',
//       primaryLightActive: '#E2BA9E',
//       primaryLightContrast: '#B2735A',
//       primary: '#DAC8AF',
//       primaryBorder: '#CF997C',
//       primaryBorderHover: '#B2735A',
//       primarySolidHover: '#95513E',
//       primarySolidContrast: '#FDFAF3',
//       primaryShadow: '#CF997C',

//       // gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
//       link: '#19220F',
//     }
//   }
// })

export default function App({ Component, pageProps }) {
  const userData = useUserData();

  return (
      <UserContext.Provider value={userData} >
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </UserContext.Provider>
  );
}
