import React from "react";

import styles from "./Welcom_section.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardHeader, CardBody, CardTitle, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Welcom_section() {
  return (
    <>
      <Container id="shadow_container_1" className={styles.shadow_container_1} fluid>
        {" "}
      </Container>
      <Container
        id="welcome_container"
        className={styles.welcome_container + " mx-0 px-0"}
        fluid
      >
        <div className={styles.eyebrow}>Membership</div>
        <div id="welcome_title" className={styles.welcome_title}>
          Zewail city graduate ?
        </div>

        <Card className={styles.welcome_card} style={{}}>
          <CardHeader
            id="welcome_card_header"
            className={styles.welcome_card_header}
            style={{}}
          >
            Welcome onboard
          </CardHeader>
          <CardBody>
            <CardTitle
              id="welcome_card_body"
              className={styles.welcome_card_body}
              tag="h5"
            >
              apply for your membership in the associasion
            </CardTitle>

            <Link href="/APPLICATION" style={{ textDecoration: "none" }}>
              <button
                className={styles.welcome_btn + " " + styles.welcome_btn2}
                style={{}}
              >
                Apply now
                <FontAwesomeIcon
                  icon={faLongArrowAltRight}
                  className={styles.welcome_btn_icon}
                />
              </button>
            </Link>
          </CardBody>
        </Card>

        <img
          className={styles.wal_image}
          src="/waleed3.png"
          alt="Zewail City graduate"
        />
      </Container>
    </>
  );
}

export default Welcom_section;
