import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {LoginContextProvider, LoginContext} from '../contexts/loginContext';
import {useContext, useEffect} from 'react';

const Network_diagramComponent = dynamic(
  () =>
    import(
      '../components/shared/Network_diagramComponent/Network_diagramComponent'
    ),
  {
    ssr: false,
  }
);
function Layout(props) {
  // ---------------| LOGIN LOGIC |--------------------------
  const {login, logout} = useContext(LoginContext);

  const check_if_logged_in = () => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (storedData && storedData.token) {
      login(storedData.token);
    }
  };

  useEffect(() => {
    check_if_logged_in();
  }, []);

  return (
    <>
      <Head>
        <title>ZCAA</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <script type='text/javascript' src='/planetary/d3.v3.min.js'></script>
        <script
          type='text/javascript'
          src='/planetary/topojson.v1.min.js'></script>
        <script type='text/javascript' src='/planetary/planetaryjs.js'></script>
      </Head>
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
