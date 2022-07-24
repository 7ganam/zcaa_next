import React from "react";
import { Col, Container, Row } from "reactstrap";
import styles from "./FooterComponent.module.css";
export default function FooterComponent() {
  return (
    <div>
      <Container
        id="footer_container"
        className={styles.footer_container}
        fluid
      >
        <Container>
          <Row>
            <Col md="3">
              <img
                style={{
                  width: "110px",
                  height: "auto",
                  filter: "grayscale(40%)",
                  filter: "drop-shadow(0 0 0.75rem )",
                }}
                src="/logo.png"
                alt="oval"
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
