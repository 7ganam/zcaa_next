import React from 'react'

import styles from './Welcom_section.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'reactstrap';
// import zewail_image from '/home/assets/zewail_image3.png'
// import grads from '../public/home/assets/grads3.png'
import { Card, CardHeader, CardBody, CardTitle, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';



function Welcom_section() {
    return (
        <>

            <Container id="shadow_container_1" className={styles.shadow_container_1} fluid style={{ marginTop: "100px" }}>      </Container>
            <Container id="welcome_container" className={styles.welcome_container + " mx-0"} fluid style={{ position: 'relative' }}>
                {/* <img id="welcome_illustration" src={welcome_illustration} alt="oval" /> */}

                <div id="welcome_title" className={styles.welcome_title}>
                    Zewail city graduate ?
                </div>


                <Card className={styles.welcome_card} style={{}}>
                    <CardHeader id="welcome_card_header" className={styles.welcome_card_header} style={{}}>Welcome onboard</CardHeader>
                    <CardBody>
                        <CardTitle id="welcome_card_body" className={styles.welcome_card_body} tag="h5">apply for your membership in the associasion</CardTitle>

                        <Link href="/APPLICATION" >
                            <a style={{ textDecoration: 'none' }}>
                                <button className={styles.welcome_btn + " " + styles.welcome_btn2} style={{}}>APPLY</button>
                            </a>

                        </Link>
                    </CardBody>
                </Card>

                <img className={styles.wal_image} src='/waleed3.png' />

            </Container>
        </>
    )
}

export default Welcom_section
