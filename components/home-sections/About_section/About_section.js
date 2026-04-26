import React from "react";
import styles from "./About_section.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function About_section() {
  return (
    <Container fluid className={styles.about_section}>
      <div>
        <img
          className={styles.decorative_bg}
          src={"/about/bg2.png"}
          alt="oval"
        />
      </div>

      <Container
        id="aboutus_container"
        className={`p-0 ${styles.aboutus_container} px-2`}
      >
        <Row
          id="vision_row"
          className={` m-t-5 justify-content-center ${styles.vision_row}`}
          style={{ marginTop: "30px" }}
        >
          <Col
            xs={{ size: 10, order: 2 }}
            md={{ size: 6, order: 0 }}
            className={styles.copy_panel}
          >
            <span className={styles.eyebrow}>Our north star</span>
            <h2 className={styles.section_title}>
              The association vision
            </h2>
            <div id="mission_text" className={`p- ${styles.mission_text}`}>
              This vision aims to utilize the energy and spirit dr Ahmed Zewail
              inspired to us and ensure a well- connected powerful ZC community.
            </div>
            <Link
              href="/ABOUTUS#vision_header"
              className={styles.story_link}
            >
              read our full vision
              <FontAwesomeIcon
                icon={faEye}
                className="ml-1 pt-1"
              />
            </Link>
          </Col>

          <Col
            xs={{ size: 12, order: 0 }}
            md={{ size: 6, order: 2 }}
            className="d-flex"
          >
            <div className={`${styles.zewail_image_wrapper}`}>
              <img
                className={`${styles.zewail_image}  ${styles.zewail_image_gold} mb-5 ml-md-auto ml-auto mr-auto mr-md-0`}
                src={"/home/assets/zewail_image8.png"}
                alt="oval"
              />

              <img
                className={`${styles.zewail_image}  ${styles.zewail_image_fader} mb-5 ml-md-auto ml-auto mr-auto mr-md-0`}
                src={"/home/assets/zewail_image9.png"}
                alt="oval"
              />
            </div>
          </Col>
        </Row>

        <Row
          id="mission_row"
          className={`${styles.mission_row} justify-content-between`}
          style={{}}
        >
          <Col xs="11" md="6" className={styles.media_panel}>
            <img
              className={styles.mission_image}
              src={"/home/assets/grads3.png"}
              alt="oval"
            />
          </Col>
          <Col
            xs="10"
            md="6"
            className={styles.copy_panel}
          >
            <span className={styles.eyebrow}>How we gather</span>
            <h2 className={styles.section_title}>
              The association Mission
            </h2>
            <div id="mission_text" className={`${styles.mission_text} `}>
              Our mission is supporting Zewail City in its pursuit of excellence
              and building a place for the Alumni to keep ties with their alma
              mater by supporting their needs, elevating their connections, and
              assisting their career’s development.
            </div>
            <Link
              href="/ABOUTUS#mission_header"
              className={styles.story_link}
            >
              read our full mission
              <FontAwesomeIcon
                icon={faBullseye}
                className="ml-1 pt-1"
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About_section;
