"use client";

import PropTypes from 'prop-types';
import Head from 'next/head';
import '../styles/global.css';
import Footer from './components/footer';
import Header from './components/header';
import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { MessageProvider } from './context/MessageContext';
import { usePathname, useRouter } from 'next/navigation';


export default function RootLayout({ children, session }) {
  const pathname = usePathname();

  // Define paths where Footer should not be displayed
  const noFooterRoutes = ['/signin', '/signin/register', '/signin/register/verify', '/dashboard'];

  return (
    <html>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        <AppProvider>
          <MessageProvider>
            <Header />
            <main>{children}</main>
            {!noFooterRoutes.includes(pathname) && <Footer />}
          </MessageProvider>
        </AppProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  session: PropTypes.object,
};
