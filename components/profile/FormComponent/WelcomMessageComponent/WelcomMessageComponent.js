import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useContext } from "react";

import { LoginContext } from "../../../../contexts/loginContext"
import styles from './WelcomMessageComponent.module.css'

function WelcomMessageComponent(props) {
    const { login, IsLoggedIn, Token } = useContext(LoginContext);



    return (
        <>

            <div id="application_sucess" style={{}}>
                <div style={{ marginBottom: "30px" }}>
                    {
                        <Container fluid className={styles.wel_container}>
                            <div id="login_card" className={styles.wel_card}>
                                <div className={styles.wel_card_inner}>
                                    <img className={styles.user_image}
                                        src={Token.g_picture ? Token.g_picture : '/user.png'} alt="logo"
                                    // {/* if this is displayed without fetch_success this means its from a login and a token exist */}
                                    />

                                    <img className={styles.logo_image} src={"/logo.png"} alt="logo" />
                                </div>

                                <div className={styles.text_div}>
                                    <div style={{ color: "gray", marginTop: "30px", }}>
                                        Welocme
                                    </div>
                                    <div>
                                        to the family
                                    </div>
                                </div>
                            </div>
                        </Container>}
                </div>
            </div>

        </>
    )
}

export default WelcomMessageComponent
