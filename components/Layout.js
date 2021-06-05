import React from 'react'
// import '../styles/jquery-jvectormap.css'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { LoginContextProvider, LoginContext } from "../contexts/loginContext"
import LoginModalComponenet from '../components/shared/LoginModalComponenet/LoginModalComponenet'
import { useContext, useEffect } from "react";
import NavbarComponent from '../components/shared/NavbarComponent/NavbarComponent'
import FooterComponent from '../components/shared/FooterComponent/FooterComponent'

const Network_diagramComponent = dynamic(() => import("../components/shared/Network_diagramComponent/Network_diagramComponent"), {
    ssr: false
})
function Layout(props) {

    const check_if_logged_in = () => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token) {
            login(storedData.token, storedData.user, storedData.expirateion_date_string, false);
        }
    }

    const { login, logout } = useContext(LoginContext);

    useEffect(() => {
        check_if_logged_in()
    }, []);


    return (
        <>
            <Head>
                <title>ZCAA</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script type='text/javascript' src='/planetary/d3.v3.min.js'></script>
                <script type='text/javascript' src='/planetary/topojson.v1.min.js'></script>
                <script type='text/javascript' src='/planetary/planetaryjs.js'></script>
            </Head>
            <main>


                {props.children}


            </main>
        </>
    )
}

export default Layout
