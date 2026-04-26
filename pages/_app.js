import "../styles/globals.css";
import "../styles/jquery-jvectormap.css";
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
import { AuthContextProvider } from "../contexts/AuthContext";
import FooterComponent from "components/shared/FooterComponent/FooterComponent";
import NavbarComponent from "components/shared/NavbarComponent/NavbarComponent";
import Layout from "components/Layout";
import { useEffect, useState } from "react";

const LoginModalComponent = dynamic(
  () => import("components/shared/LoginModalComponent/LoginModalComponent"),
  {
    ssr: false,
  }
);

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
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const FetchUsers = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        const response = await fetch(`${backendUrl}/api/users`);
        const fetchedUsers = await response.json();
        const fetchedUsersData = fetchedUsers.data || [];
        setUsers(fetchedUsersData);
        setImages(
          fetchedUsersData.map((user) => {
            return user.g_picture;
          })
        );
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    FetchUsers();
  }, []);

  return (
    <>
      <Head>
        <title>ZCAA</title>
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Script src="/planetary/d3.v3.min.js" strategy="beforeInteractive" />
      <Script src="/planetary/topojson.v1.min.js" strategy="beforeInteractive" />
      <Script src="/planetary/planetaryjs.js" strategy="beforeInteractive" />
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
