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

  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const FetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`
        );
        const fetchedUsers = await response.json();
        setUsers(fetchedUsers.data);
        setImages(
          fetchedUsers.data.map((user) => {
            return user.g_picture;
          })
        );
      } catch (error) {
        let err = error;
      }
    };

    FetchUsers();
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
              <Network_diagramComponent images={images} />
              <Component {...pageProps} users={users} />
            </div>
            <FooterComponent />
          </div>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
