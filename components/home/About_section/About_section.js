import React from 'react'
import styles from './About_section.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'next/link';


function About_section() {
    return (

        <Container id="aboutus_container" className={`p-0 ${styles.aboutus_container}`}>
            <Row id="vision_row" className={` m-t-5 justify-content-center ${styles.vision_row}`} style={{ marginTop: "30px" }}>
                <Col xs={{ size: 10, order: 2 }} md={{ size: 6, order: 0 }} className="" style={{ display: "flex", textAlign: "left", justifyContent: "center", flexDirection: "column" }}>
                    <span className="section_title " style={{ marginTop: "-30px", marginBottom: "10px" }}>The association vision</span>
                    <div id="mission_text" className={`p- ${styles.mission_text}`}>
                        This vision aims to utilize the energy and spirit dr Ahmed Zewail inspired to us and ensure a well-
                        connected powerful ZC community.
                     </div>
                    <a className="zcaa_link mt-lg-3 mt-4" style={{ marginTop: "10px", cursor: "pointer" }}>
                        read our full vision
            <FontAwesomeIcon icon={faLongArrowAltRight} className="ml-1 pt-1" />
                    </a>
                </Col>

                <Col xs={{ size: 11, order: 0 }} md={{ size: 6, order: 2 }} className="d-flex">
                    <img className={`${styles.zewail_image} mb-5 ml-md-auto ml-auto mr-auto mr-md-0`} style={{ width: "70%", height: "auto" }} src={'/home/assets/zewail_image3.png'} id="zewail_image" alt="oval" />

                </Col>


            </Row>

            <Row id="mission_row" className={`${styles.mission_row} justify-content-between`} style={{}}>


                <Col xs="11" md="6" className="">
                    <img className="mb-5" style={{ width: "100%", height: "auto" }} src={'/home/assets/grads3.png'} id="c" alt="oval" />
                </Col>
                <Col xs="10" md="6" className="" style={{ display: "flex", textAlign: "left", justifyContent: "center", flexDirection: "column" }}>
                    <span className="section_title" style={{ marginTop: "-30px", marginBottom: "10px" }}>The association Mission</span>
                    <div id="mission_text" className={`${styles.mission_text} `}>
                        Our mission is supporting Zewail City in its pursuit of excellence and building a place for
                        the Alumni to keep ties with their alma mater by supporting their needs, elevating their
                        connections, and assisting their career’s development.
                    </div>
                    <a className="zcaa_link mt-lg-3 mt-4" style={{ marginTop: "10px", cursor: "pointer" }}>
                        read our full mission
                        <FontAwesomeIcon icon={faLongArrowAltRight} className="ml-1 pt-1" />
                    </a>

                </Col>


            </Row>


        </Container>


    )
}

export default About_section
