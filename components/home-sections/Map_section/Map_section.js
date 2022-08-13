import React from "react";

import styles from "./Map_section.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Col, Row } from "reactstrap";
import MapComponent from "./MapComponent/MapComponent";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "next/link";

function Map_section() {
  return (
    <>
      <Container id="map_container" className={styles.map_container} fluid>
        <div id="map_wrapper" className={styles.map_wrapper}>
          <MapComponent />
        </div>
      </Container>
    </>
  );
}

export default Map_section;
