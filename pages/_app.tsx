// pages/_app.tsx
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {createTheme, NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {Layout} from '../components/layout/layout';

// Temalar
const lightTheme = createTheme({
   type: 'light',
   theme: { colors: {} },
});

const darkTheme = createTheme({
   type: 'dark',
   theme: { colors: {} },
});

function MyApp({Component, pageProps}: AppProps & { Component: any }) {
   const useLayout = !Component.noLayout;  // noLayout varsa Layout'u gösterme

   return (
      <NextThemesProvider
         defaultTheme="system"
         attribute="class"
         value={{
            light: lightTheme.className,
            dark: darkTheme.className,
         }}
      >
         <NextUIProvider>
            {useLayout ? (
               <Layout>
                  <Component {...pageProps} />
               </Layout>
            ) : (
               <Component {...pageProps} />
            )}
         </NextUIProvider>
      </NextThemesProvider>
   );
}

export default MyApp;
