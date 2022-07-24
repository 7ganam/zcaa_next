import React from "react";
import Head from "next/head";
import { AuthContext } from "contexts/AuthContext";
import { useContext, useEffect } from "react";

function Layout(props) {
  // ---------------| LOGIN LOGIC |--------------------------
  const { actions } = useContext(AuthContext);

  const check_if_logged_in = () => {
    const storedToken = localStorage.getItem("zcaaToken");

    if (storedToken) {
      actions.fetchUser(storedToken);
    }
  };

  useEffect(() => {
    check_if_logged_in();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>ZCAA</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script type="text/javascript" src="/planetary/d3.v3.min.js"></script>
        <script
          type="text/javascript"
          src="/planetary/topojson.v1.min.js"
        ></script>
        <script type="text/javascript" src="/planetary/planetaryjs.js"></script>
      </Head>
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
