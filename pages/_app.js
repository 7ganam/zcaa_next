import "../styles/globals.css";
import "../styles/jquery-jvectormap.css";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import { AuthContextProvider } from "../contexts/AuthContext";
import LoginModalComponent from "components/shared/LoginModalComponent/LoginModalComponent";
import FooterComponent from "components/shared/FooterComponent/FooterComponent";
import NavbarComponent from "components/shared/NavbarComponent/NavbarComponent";
import Layout from "components/Layout";
import { useEffect, useState } from "react";

const Network_diagramComponent = dynamic(
  () =>
    import(
      "components/shared/Network_diagramComponent/Network_diagramComponent"
    ),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

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
      <AuthContextProvider>
        <Layout>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <LoginModalComponent />
            <NavbarComponent />
            <div style={{ flexGrow: "1" }}>
              <Network_diagramComponent />
              <Component {...pageProps} />
            </div>
            <FooterComponent />
          </div>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
