import "../styles/globals.css";
import "../styles/jquery-jvectormap.css";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import { AuthContextProvider } from "../contexts/AuthContext";
import LoginModalComponent from "components/shared/LoginModalComponent/LoginModalComponent";

const Network_diagramComponent = dynamic(
  () =>
    import(
      "../components/shared/Network_diagramComponent/Network_diagramComponent"
    ),
  {
    ssr: false,
  }
);
import FooterComponent from "../components/shared/FooterComponent/FooterComponent";
import NavbarComponent from "../components/shared/NavbarComponent/NavbarComponent";
import Layout from "../components/Layout";
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
          <LoginModalComponent />
          <NavbarComponent />
          <Network_diagramComponent />
          <Component {...pageProps} />
          <FooterComponent />
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
